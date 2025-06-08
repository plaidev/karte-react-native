import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  registerFCMToken(fcmToken?: string): void;
  canHandle(userInfo: Object): boolean;
  handle(userInfo: Object): boolean;
  show(userInfo: Object): void;
  track(userInfo: Object): void;
  retrieveURL(userInfo: Object): string | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNKRTNotificationModule'
);
