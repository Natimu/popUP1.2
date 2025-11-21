//
//  SharedStorageModule.m
//  popUP
//
//  Created by natnael awoke on 11/21/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SharedStorageModule, NSObject)

RCT_EXTERN_METHOD(saveWidgetQuotes:(NSString *)quotesJSON
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(saveWidgetSettings:(NSString *)json
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end

