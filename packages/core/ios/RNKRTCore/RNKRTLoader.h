//
//  RNKRTLoader.h
//  react-native-karte
//
//  Created by Tomoki Koga on 2020/07/16.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNKRTLoaderInternal : NSObject
+ (void)handleLoad;
@end

@interface RNKRTLoader: RNKRTLoaderInternal
@end

NS_ASSUME_NONNULL_END
