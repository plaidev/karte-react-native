//
//  Copyright 2020 PLAID, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

#import "RNKRTVisualTrackingModule.h"

#if __has_include("RNKRTVisualTracking-Swift.h")
#import "RNKRTVisualTracking-Swift.h"
#else
#import <RNKRTVisualTracking/RNKRTVisualTracking-Swift.h>
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#import <React/RCTUtils.h>
#endif

@implementation RNKRTVisualTrackingModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNKRTVisualTrackingModuleSpecJSI>(params);
}
#endif

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)view:(NSString *)action actionId:(NSString *)actionId targetText:(NSString *)targetText resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [KRTVisualTrackingWrapper view:action actionId:actionId targetText:targetText];
    resolve(nil);
}

#else
// Old Architecture implementation

RCT_EXPORT_METHOD(view:(NSString *)action actionId:(nullable NSString *)actionId targetText:(nullable NSString *)targetText)
{
    [KRTVisualTrackingWrapper view:action actionId:actionId targetText:targetText];
}

#endif

@end