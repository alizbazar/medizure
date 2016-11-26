//
//  CalendarManager.swift
//  Medizure
//
//  Created by Albert Nazander on 25/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

// CalendarManager.swift

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @objc(addEvent:location:date:)
  func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    print("This is a test!!!!", name, location, date)
  }
  
}
