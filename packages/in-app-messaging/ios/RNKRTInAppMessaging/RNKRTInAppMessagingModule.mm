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

#import "RNKRTInAppMessagingModule.h"

#import <AppTrackingTransparency/ATTrackingManager.h>
#import <KarteCore/KarteCore-Swift.h>
#import <KarteInAppMessaging/KarteInAppMessaging-Swift.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#import <React/RCTUtils.h>
#endif

@interface RNKRTInAppMessagingModule ()
@end

@implementation RNKRTInAppMessagingModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNKRTInAppMessagingModuleSpecJSI>(params);
}
#endif

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

#ifdef RCT_NEW_ARCH_ENABLED
- (NSNumber *)isPresenting {
    return @([[KRTInAppMessaging shared] isPresenting]);
}

- (void)dismiss {
    [[KRTInAppMessaging shared] dismiss];
}

- (void)suppress {
    [[KRTInAppMessaging shared] suppress];
}

- (void)unsuppress {
    [[KRTInAppMessaging shared] unsuppress];
}

#else
// Old Architecture implementation

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isPresenting) {
    return @([[KRTInAppMessaging shared] isPresenting]);
}

RCT_EXPORT_METHOD(dismiss) {
    [[KRTInAppMessaging shared] dismiss];
}

RCT_EXPORT_METHOD(suppress) {
    [[KRTInAppMessaging shared] suppress];
}

RCT_EXPORT_METHOD(unsuppress) {
    [[KRTInAppMessaging shared] unsuppress];
}

#endif

@end
