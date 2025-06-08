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

#import "RNKRTCoreModule.h"

#import <AppTrackingTransparency/ATTrackingManager.h>
#import <KarteCore/KarteCore-Swift.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#import <React/RCTUtils.h>
#endif

@interface RNKRTCoreModule ()
@end

@implementation RNKRTCoreModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNKRTCoreModuleSpecJSI>(params);
}
#endif

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

// KarteApp
#ifdef RCT_NEW_ARCH_ENABLED
- (NSString *)getVisitorId {
    return [KRTApp visitorId];
}

- (NSNumber *)isOptOut {
    return @([KRTApp isOptOut]);
}

- (void)optIn {
    [KRTApp optIn];
}

- (void)optOut {
    [KRTApp optOut];
}

- (void)renewVisitorId {
    [KRTApp renewVisitorId];
}

// Tracking
- (void)track:(NSString *)eventName values:(NSDictionary *)values {
    [KRTTracker track:eventName values:values ?: @{}];
}

- (void)identify:(NSDictionary *)values {
    [KRTTracker identify:values ?: @{}];
}

- (void)identifyWithUserId:(NSString *)userId values:(NSDictionary *)values {
    [KRTTracker identify:userId :values ?: @{}];
}

- (void)attribute:(NSDictionary *)values {
    [KRTTracker attribute:values ?: @{}];
}

- (void)view:(NSString *)viewName title:(NSString *)title values:(NSDictionary *)values {
    [KRTTracker view:viewName title:title values:values ?: @{}];
}

// UserSync
- (NSString *)appendingUserSyncQueryParameter:(NSString *)url {
    return [KRTUserSync appendingQueryParameterWithURLString:url];
}

- (NSString *)getUserSyncScript {
    return [KRTUserSync getUserSyncScript];
}

#else
// Old Architecture implementation

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getVisitorId) {
    return [KRTApp visitorId];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isOptOut) {
    return @([KRTApp isOptOut]);
}

RCT_EXPORT_METHOD(optIn) {
    [KRTApp optIn];
}

RCT_EXPORT_METHOD(optOut) {
    [KRTApp optOut];
}

RCT_EXPORT_METHOD(renewVisitorId) {
    [KRTApp renewVisitorId];
}

// Tracking
RCT_EXPORT_METHOD(track:(NSString *)eventName values:(NSDictionary *)values) {
    [KRTTracker track:eventName values:values];
}

RCT_EXPORT_METHOD(identify:(NSDictionary *)values) {
    [KRTTracker identify:values];
}

RCT_EXPORT_METHOD(identifyWithUserId:(NSString *)userId values:(NSDictionary *)values) {
    [KRTTracker identify:userId :values];
}

RCT_EXPORT_METHOD(attribute:(NSDictionary *)values) {
    [KRTTracker attribute:values];
}

RCT_EXPORT_METHOD(view:(NSString *)viewName title:(NSString *)title values:(NSDictionary *)values) {
    [KRTTracker view:viewName title:title values:values];
}

// UserSync
RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, appendingUserSyncQueryParameter:(NSString *)url) {
    return [KRTUserSync appendingQueryParameterWithURLString:url];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getUserSyncScript) {
    return [KRTUserSync getUserSyncScript];
}

#endif

@end
