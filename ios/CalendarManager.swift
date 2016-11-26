//  CalendarManager.swift
//  Medizure

import Foundation
import CoreBluetooth

@objc(CalendarManager)
class CalendarManager:
  NSObject,
  CBCentralManagerDelegate,
  CBPeripheralDelegate {
  
  var centralManager : CBCentralManager!
  var deviceName = "Polar H7 BFC08211"
  var device:CBPeripheral?
  
  @objc(addEvent:location:date:)
  func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    print("This is a test!!!!", name, location, date)
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
      
            if peripheralName == deviceName {
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
    }
  }
  
  private(set) var heartRate = 0
  private(set) var sensorDetected = false
  private(set) var energyExpended:Int?
  private(set) var rrIntervals = [Float]()
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
