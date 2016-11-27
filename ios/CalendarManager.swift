//  CalendarManager.swift
//  Medizure

import Foundation
import CoreBluetooth

@objc(CalendarManager)
class CalendarManager:
  NSObject,
  CBCentralManagerDelegate,
  CBPeripheralDelegate {
  
  var rr_mock_data = [Float](arrayLiteral: 0.85, 0.80, 0.78, 0.9, 0.77, 0.83, 0.85, 0.80, 0.78, 0.9, 0.77, 0.83, 0.85, 0.80, 0.78, 0.9, 0.77, 0.83, 0.85, 0.80, 0.78, 0.9, 0.77, 0.83, 0.85, 0.80, 0.78, 0.9, 0.77, 0.83, 0.85, 0.80, 0.3, 0.78, 0.9, 0.77, 0.83)

  var centralManager : CBCentralManager!
  var acceptedDevices = ["Suunto Smart Sensor", "Polar H7 BFC08211"]
  var deviceName:String?
  var device:CBPeripheral?
  var bridge: RCTBridge!

  var heartRate = 0
  var rMSSD: Double = 0.0
  var sensorDetected = false
  var energyExpended:Int?
  var rrIntervals = [Float]()
  var lastTick: Int = 0

  func calcrMSSD(rrList: [Float], samples: Int) -> Double {

    var rMSSD: Double = 0.0
    var n: Int = samples

    // ASSUME THAT INTERVALS ARE IN SECONDS -> CONVERT TO MS
    let rr = rrList.map{ $0 * 1000.0 }

    // Iterate the last samples RR intervals in reverse
    var prev = rr.last!
    for interval in rr.suffix(samples).reversed() {

      // Discard values that differ more than 20% from the previous value
      if (abs(prev - interval) > (prev * 0.2)) {
        n -= 1
        continue
      }

      // Sum of squares
      rMSSD += Double((interval - prev) * (interval - prev))
      prev = interval
    }

    // Return the averaged and squared rMSSD
    return sqrt(rMSSD * (1.0 / Double(n)))
  }
  
  @objc(scanForDevices)
  func scanForDevices() -> Void {
    centralManager = CBCentralManager(delegate :self, queue: nil)
  }
  
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    centralManager.scanForPeripherals(withServices: nil, options: nil)
  }
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    print("centralManager didDiscoverPeripheral - CBAdvertisementDataLocalNameKey is \"\(CBAdvertisementDataLocalNameKey)\"")
    
    if let peripheralName = advertisementData[CBAdvertisementDataLocalNameKey] as? String {
      print("NEXT PERIPHERAL NAME: \(peripheralName)")
      print("NEXT PERIPHERAL UUID: \(peripheral.identifier.uuidString)")
      
            if acceptedDevices.contains(peripheralName) {
              deviceName = peripheralName
              print("Device found")
              centralManager.stopScan()
              device = peripheral
              device!.delegate = self
              centralManager.connect(device!, options: nil)
            }
    }
  }
  
  func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
    print("**** SUCCESSFULLY CONNECTED TO \(deviceName) !!!")
    peripheral.discoverServices(nil)
    //    // - NOTE:  we pass nil here to request ALL services be discovered.
    //    //          If there was a subset of services we were interested in, we could pass the UUIDs here.
    //    //          Doing so saves battery life and saves time.
  }
  
  func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
    if error != nil {
      print("ERROR DISCOVERING SERVICES: \(error?.localizedDescription)")
      return
    }
    print("Services found")
    
    // Core Bluetooth creates an array of CBService objects —- one for each service that is discovered on the peripheral.
    if let services = peripheral.services {
      for service in services {
        print("Discovered service \(service)")
        peripheral.discoverCharacteristics(nil, for: service)
      }
    }
  }
  func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
    if error != nil {
      print("ERROR DISCOVERING CHARACTERISTICS: \(error?.localizedDescription)")
      return
    }
    
    if let characteristics = service.characteristics {
      for characteristic in characteristics {
        print(characteristic)
//        peripheral.setNotifyValue(true, for: characteristic)
//        peripheral.readValue(for: characteristic)
        if (characteristic.uuid == CBUUID(string: "2A37")) {
          peripheral.setNotifyValue(true, for: characteristic)
        }
      }
    }
  }
  func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
    if error != nil {
      print("ERROR ON UPDATING VALUE FOR CHARACTERISTIC: \(characteristic) - \(error?.localizedDescription)")
      return
    }
    if (characteristic.uuid == CBUUID(string: "2A37")) {
      print(characteristic)
      print(characteristic.value!)
      print(characteristic.properties)
      print(characteristic.uuid)
      getHeartRateMeasurementData(hrmData: characteristic.value! as NSData)
      bridge.eventDispatcher().sendAppEvent(withName: "HeartRateTick", body: [ "rate": heartRate ])
      if (rrIntervals.count > (lastTick + 30)) {
        lastTick = rrIntervals.count
        rMSSD = calcrMSSD(rrList: rrIntervals, samples: 30)
        bridge.eventDispatcher().sendAppEvent(withName: "rMSSDTick", body: [ "rMSSD": rMSSD ])
      }
    }
  }
  
  private func getHeartRateMeasurementData(hrmData: NSData)
  {
    print(hrmData)
    // Maintain an index into the measurement data of the next byte to read.
    var byteIndex = 0
    
    var hrmFlags: UInt8 = 0
    hrmData.getBytes(&hrmFlags, length: MemoryLayout<UInt8>.size)
    byteIndex += MemoryLayout<UInt8>.size
    
    if HeartRateMeasurement.HeartRateValueFormatUInt16.flagIsSet(flagData: hrmFlags) {
      var value: UInt16 = 0
      hrmData.getBytes(&value, range: NSMakeRange(byteIndex, MemoryLayout<UInt16>.size))
      byteIndex += MemoryLayout<UInt16>.size
      heartRate = Int(value)
      print("Täällä, flag 16")
    }
    else {
      print("Täällä flag 8")
      var value: UInt8 = 0
      hrmData.getBytes(&value, range: NSMakeRange(byteIndex, MemoryLayout<UInt8>.size))
      byteIndex += MemoryLayout<UInt8>.size
      heartRate = Int(value)
    }
    
    if HeartRateMeasurement.SensorContactIsSupported.flagIsSet(flagData: hrmFlags) {
      sensorDetected = HeartRateMeasurement.SensorContactDetected.flagIsSet(flagData: hrmFlags)
    }
    
    if HeartRateMeasurement.EnergyExpended.flagIsSet(flagData: hrmFlags) {
      var value: UInt16 = 0
      hrmData.getBytes(&value, range: NSMakeRange(byteIndex, MemoryLayout<UInt16>.size))
      byteIndex += MemoryLayout<UInt16>.size
      energyExpended = Int(value)
    }
    
    if HeartRateMeasurement.RRInterval.flagIsSet(flagData: hrmFlags) {
      while byteIndex < hrmData.length {
        var value: UInt16 = 0
        hrmData.getBytes(&value, range: NSMakeRange(byteIndex, MemoryLayout<UInt16>.size))
        byteIndex += MemoryLayout<UInt16>.size
        rrIntervals.append(Float(value) / 1024.0)
      }
    }
    
    NSLog("Heart rate: \(heartRate)")
    NSLog("Sensor detected: \(sensorDetected)")
    if let energyExpended = energyExpended {
      NSLog("Energy expended: \(energyExpended)")
    }
    NSLog("RR Intervals: \(rrIntervals)")
  }
  
  private enum HeartRateMeasurement: UInt8 {
    case HeartRateValueFormatUInt8  = 0b00000000
    case HeartRateValueFormatUInt16 = 0b00000001
    case SensorContactIsSupported   = 0b00000100
    case SensorContactDetected      = 0b00000110
    case EnergyExpended             = 0b00001000
    case RRInterval                 = 0b00010000
    
    func flagIsSet(flagData: UInt8) -> Bool {
      return (flagData & self.rawValue) != 0
    }
  }
}
