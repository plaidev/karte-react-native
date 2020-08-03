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

import { NativeModules } from 'react-native';
import type { KRTNotificationNativeModule, RemoteMessage } from './types';

class NotificationBridge {
  private constructor(
    private readonly nativeModule: KRTNotificationNativeModule,
    private readonly remoteMessage: RemoteMessage
  ) {}

  public static registerFCMToken(
    nativeModule: KRTNotificationNativeModule,
    fcmToken?: string
  ): void {
    nativeModule.registerFCMToken(fcmToken);
  }

  public static create(
    nativeModule: KRTNotificationNativeModule,
    remoteMessage: RemoteMessage
  ): NotificationBridge | null {
    if (nativeModule.canHandle(remoteMessage.data ?? {})) {
      return new NotificationBridge(nativeModule, remoteMessage);
    } else {
      return null;
    }
  }

  public get url(): string | null {
    return this.nativeModule.retrieveURL(this.remoteMessage.data ?? {});
  }

  public show(): void {
    return this.nativeModule.show(this.remoteMessage.data ?? {});
  }

  public handle(): boolean {
    return this.nativeModule.handle(this.remoteMessage.data ?? {});
  }
}

export const Notification = {
  registerFCMToken(fcmToken?: string): void {
    NotificationBridge.registerFCMToken(
      NativeModules.RNKRTNotificationModule,
      fcmToken
    );
  },
  create(remoteMessage: RemoteMessage): NotificationBridge | null {
    return NotificationBridge.create(
      NativeModules.RNKRTNotificationModule,
      remoteMessage
    );
  },
};
