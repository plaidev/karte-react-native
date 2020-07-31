export interface KRTNotificationNativeModule {
  registerFCMToken(fcmToken?: string): void;
  canHandle(userInfo: object): boolean;
  handle(userInfo: object): boolean;
  show(userInfo: object): void;
  retrieveURL(userInfo: object): string | null;
}

export interface RemoteMessage {
  data?: { [key: string]: string };
}
