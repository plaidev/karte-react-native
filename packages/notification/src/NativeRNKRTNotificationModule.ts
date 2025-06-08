import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  registerFCMToken(fcmToken?: string): Promise<void>;
  canHandle(userInfo: Object): boolean;
  handle(userInfo: Object): boolean;
  show(userInfo: Object): Promise<void>;
  track(userInfo: Object): Promise<void>;
  retrieveURL(userInfo: Object): string | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNKRTNotificationModule'
);
