import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  view(action: string, actionId?: string, targetText?: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNKRTVisualTrackingModule'
);
