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

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#import <React/RCTUtils.h>
#endif

@interface RNKRTNotificationModule ()
@end

@implementation RNKRTNotificationModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNKRTNotificationModuleSpecJSI>(params);
}
#endif

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)registerFCMToken:(NSString *)fcmToken resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [KRTApp registerFCMToken:fcmToken];
    resolve(nil);
}

- (BOOL)canHandle:(NSDictionary *)userInfo {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    return notification != nil;
}

- (BOOL)handle:(NSDictionary *)userInfo {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    if (notification) {
        __block BOOL ret;
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        dispatch_async(dispatch_get_main_queue(), ^{
            ret = [notification handle];
            dispatch_semaphore_signal(semaphore);
        });
        dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
        return ret;
    } else {
        return NO;
    }
}

- (void)show:(NSDictionary *)userInfo resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    // NOP (Android only)
    resolve(nil);
}

- (void)track:(NSDictionary *)userInfo resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    [notification track];
    resolve(nil);
}

- (NSString *)retrieveURL:(NSDictionary *)userInfo {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    if (notification) {
        return notification.url.absoluteString;
    } else {
        return nil;
    }
}

#else
// Old Architecture implementation

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

RCT_REMAP_METHOD(track, trackWithUserInfo:(NSDictionary *)userInfo) {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    [notification track];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(retrieveURL, NSString *, retrieveURLWithUserInfo:(NSDictionary *)userInfo) {
    KRTRemoteNotification *notification = [[KRTRemoteNotification alloc] initWithUserInfo:userInfo];
    if (notification) {
        return notification.url.absoluteString;
    } else {
        return nil;
    }
}

#endif

@end