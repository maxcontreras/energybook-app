//
//  Orientation.h
//  Ienergybook
//
//  Created by Anaid ortega on 07/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef Orientation_h
#define Orientation_h

//
//  Orientation.h
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface Orientation : NSObject <RCTBridgeModule>
+ (void)setOrientation: (UIInterfaceOrientationMask)orientation;
+ (UIInterfaceOrientationMask)getOrientation;
@end

#endif /* Orientation_h */
