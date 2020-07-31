//
//  RNKRTInAppMessagingModule.m
//  react-native-karte
//
//  Created by Tomoki Koga on 2020/07/16.
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
