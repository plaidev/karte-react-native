import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isPresenting(): boolean;
  dismiss(): Promise<void>;
  suppress(): Promise<void>;
  unsuppress(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNKRTInAppMessagingModule'
);
