//
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
  
  @objc(addEvent:location:date:)
  func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    print("This is a test!!!!", name, location, date)
    centralManager = CBCentralManager(delegate :self, queue: nil)
  }
  
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    centralManager.scanForPeripherals(withServices: nil, options: nil)
    print("Hello world!")
  }
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    print("centralManager didDiscoverPeripheral - CBAdvertisementDataLocalNameKey is \"\(CBAdvertisementDataLocalNameKey)\"")
    
    // Retrieve the peripheral name from the advertisement data using the "kCBAdvDataLocalName" key
    if let peripheralName = advertisementData[CBAdvertisementDataLocalNameKey] as? String {
      print("NEXT PERIPHERAL NAME: \(peripheralName)")
      print("NEXT PERIPHERAL UUID: \(peripheral.identifier.uuidString)")
      
      //      if peripheralName == sensorTagName {
      //        print("SENSOR TAG FOUND! ADDING NOW!!!")
      //        // to save power, stop scanning for other devices
      //        keepScanning = false
      //        disconnectButton.isEnabled = true
      //
      //        // save a reference to the sensor tag
      //        sensorTag = peripheral
      //        sensorTag!.delegate = self
      //
      //        // Request a connection to the peripheral
      //        centralManager.connect(sensorTag!, options: nil)
      //      }
    }
  }
}
