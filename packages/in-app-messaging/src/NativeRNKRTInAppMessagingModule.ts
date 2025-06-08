import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isPresenting(): boolean;
  dismiss(): void;
  suppress(): void;
  unsuppress(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNKRTInAppMessagingModule'
);
