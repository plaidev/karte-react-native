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
