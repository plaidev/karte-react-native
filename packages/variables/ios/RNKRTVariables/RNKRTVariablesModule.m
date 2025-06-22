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

#import "RNKRTVariablesModule.h"

@import KarteCore;
@import KarteVariables;

@interface RNKRTVariablesModule ()
@property (nonatomic, strong) NSMutableDictionary<NSString *, id> *variables;
@end

@implementation RNKRTVariablesModule

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.variables = [NSMutableDictionary dictionary];
    }
    return self;
}

- (NSArray<KRTVariable *> *)variablesFromKeys:(NSArray<NSString *> *)keys {
    NSMutableArray *variables = [NSMutableArray array];
    for (NSString *key in keys) {
        KRTVariable *variable = self.variables[key];
        if (variable) {
            [variables addObject:variable];
        }
    }
    return [NSArray arrayWithArray:variables];
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(fetch, fetchWithResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject) {
    [KRTVariables fetchWithCompletion:^(BOOL isSuccessful) {
        if (isSuccessful) {
            [self.variables removeAllObjects];
            resolve(nil);
        } else {
            reject(@"ERR_VAR", @"Failed to fetch variables.", nil);
        }
    }];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getVariable, NSString *, variableForKey:(NSString *)key) {
    KRTVariable *variable = [KRTVariables variableForKey:key];
    [self.variables setObject:variable forKey:key];
    
    return variable.name;
}

RCT_REMAP_METHOD(trackOpen, trackOpenWithKeys:(NSArray *)keys values:(NSDictionary *)values) {
    NSArray<KRTVariable *> *variables = [self variablesFromKeys:keys];
    [KRTTracker trackOpenWithVariables:variables values:values];
}

RCT_REMAP_METHOD(trackClick, trackClickWithKeys:(NSArray *)keys values:(NSDictionary *)values) {
    NSArray<KRTVariable *> *variables = [self variablesFromKeys:keys];
    [KRTTracker trackClickWithVariables:variables values:values];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getString, NSString *, stringForKey:(NSString *)key withDefaultValue:(NSString *)value) {
    KRTVariable *variable = self.variables[key];
    if (!variable) {
        return value;
    }
    
    return [variable stringWithDefaultValue:value];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getInteger, NSNumber *, integerForKey:(NSString *)key withDefaultValue:(NSInteger)value) {
    KRTVariable *variable = self.variables[key];
    if (!variable) {
        return @(value);
    }
    
    return @([variable integerWithDefaultValue:value]);
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getDouble, NSNumber *, doubleForKey:(NSString *)key withDefaultValue:(double)value) {
    KRTVariable *variable = self.variables[key];
    if (!variable) {
        return @(value);
    }
    
    return @([variable doubleWithDefaultValue:value]);
}
RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getBoolean, NSNumber *, boolForKey:(NSString *)key withDefaultValue:(BOOL)value) {
    KRTVariable *variable = self.variables[key];
    if (!variable) {
        return @(value);
    }
    
    return @([variable boolWithDefaultValue:value]);
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getArray, NSArray *, arrayForKey:(NSString *)key withDefaultValue:(NSArray *)value) {
    KRTVariable *variable = self.variables[key];
    if (!variable) {
        return value;
    }
    
    return [variable arrayWithDefaultValue:value];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getObject, NSDictionary *, objectForKey:(NSString *)key withDefaultValue:(NSDictionary *)value) {
    KRTVariable *variable = self.variables[key];
    if (!variable) {
        return value;
    }
    
    return [variable dictionaryWithDefaultValue:value];
}

RCT_REMAP_METHOD(clearCacheByKey, clearCacheByKey:(NSString *)key) {
    [KRTVariables clearCacheForKey:key];
    [self.variables removeObjectForKey:key];
}

RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(getAllKeys, NSArray *, getAllKeys) {
    return [KRTVariables getAllKeys];
}

@end
