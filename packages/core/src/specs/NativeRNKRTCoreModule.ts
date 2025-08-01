import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVisitorId(): string | null;
  isOptOut(): boolean;
  optIn(): void;
  optOut(): void;
  renewVisitorId(): void;
  track(eventName: string, values?: Object): void;
  identify(values: Object): void;
  identifyWithUserId(userId: string, values?: Object): void;
  attribute(values: Object): void;
  view(viewName: string, title?: string, values?: Object): void;
  appendingUserSyncQueryParameter(url: string): string;
  getUserSyncScript(): string | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNKRTCoreModule');
