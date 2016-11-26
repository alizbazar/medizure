//
//  CalendarManager.swift
//  Medizure
//
//  Created by Albert Nazander on 25/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import CoreBluetooth
// CalendarManager.swift

@objc(CalendarManager)
class CalendarManager:
  NSObject {
  
  @objc(addEvent:location:date:)
  func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    print("This is a test!!!!", name, location, date)
    BluetoothConnector()
  }
  
}

class BluetoothConnector:
  NSObject,
  CBCentralManagerDelegate,
  CBPeripheralDelegate {
  
  var centralManager : CBCentralManager!
  
  override init() {
    super.init()
    print("Täähän toimii!")
    centralManager = CBCentralManager(delegate :self, queue: nil)
  }
 
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    centralManager.scanForPeripherals(withServices: nil, options: nil)
    print("Hello world!")
  }
}
