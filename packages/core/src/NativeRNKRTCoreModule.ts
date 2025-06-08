import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVisitorId(): string | null;
  isOptOut(): boolean;
  optIn(): Promise<void>;
  optOut(): Promise<void>;
  renewVisitorId(): Promise<void>;
  track(eventName: string, values?: Object): Promise<void>;
  identify(values?: Object): Promise<void>;
  identifyWithUserId(userId: string, values?: Object): Promise<void>;
  attribute(values?: Object): Promise<void>;
  view(viewName: string, title?: string, values?: Object): Promise<void>;
  appendingUserSyncQueryParameter(url: string): string;
  getUserSyncScript(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNKRTCoreModule');
