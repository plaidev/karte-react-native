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

#import "RNKRTNotificationModule.h"

@import KarteCore;
@import KarteRemoteNotification;

@interface RNKRTNotificationModule ()

@end

@implementation RNKRTNotificationModule

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(registerFCMToken:(NSString *)fcmToken) {
    [KRTApp registerFCMToken:fcmToken];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(canHandle, NSNumber *, canHandleWithUserInfo:(NSDictionary *)userInfo) {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    return @(notification != nil);
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(handle, NSNumber *, handleWithUserInfo:(NSDictionary *)userInfo) {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    if (notification) {
        __block BOOL ret;
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        dispatch_async(dispatch_get_main_queue(), ^{
            ret = [notification handle];
            dispatch_semaphore_signal(semaphore);
        });
        dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
        return @(ret);
    } else {
        return @NO;
    }
}

RCT_REMAP_METHOD(show, showWithUserInfo:(NSDictionary *)userInfo) {
    // NOP (Android only)
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(retrieveURL, NSString *, retrieveURLWithUserInfo:(NSDictionary *)userInfo) {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    if (notification) {
        return notification.url.absoluteString;
    } else {
        return nil;
    }
}

@end
