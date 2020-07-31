//
//  RNKRTCoreModule.m
//  react-native-karte
//
//  Created by Tomoki Koga on 2020/07/16.
//

#import "RNKRTCoreModule.h"

@import KarteCore;

@interface RNKRTCoreModule ()

@end

@implementation RNKRTCoreModule

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

// KarteApp
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

RCT_EXPORT_METHOD(view:(NSString *)viewName title:(NSString *)title values:(NSDictionary *)values) {
    [KRTTracker view:viewName title:title values:values];
}

//// UserSync
RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, appendingUserSyncQueryParameter:(NSString *)url) {
    return [KRTUserSync appendingQueryParameterWithURLString:url];
}


@end
