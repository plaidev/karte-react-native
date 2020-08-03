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

@import KarteInAppMessaging;

@interface RNKRTInAppMessagingModule ()

@end

@implementation RNKRTInAppMessagingModule

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

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


@end
