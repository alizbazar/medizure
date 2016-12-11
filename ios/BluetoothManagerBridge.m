//
//  BluetoothManagerBridge.m
//  Medizure
//
//  Created by Albert Nazander on 25/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(BluetoothManager, NSObject)

RCT_EXTERN_METHOD(scanForDevices)
RCT_EXTERN_METHOD(connectDevice:(NSString *)name uuid:(NSString *)uuid)

@end
