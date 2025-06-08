import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  fetch(): Promise<void>;
  getVariable(key: string): any;
  trackOpen(keys: string[], values?: Object): Promise<void>;
  trackClick(keys: string[], values?: Object): Promise<void>;
  getString(key: string, defaultValue?: string): string | null;
  getInteger(key: string, defaultValue?: number): number | null;
  getDouble(key: string, defaultValue?: number): number | null;
  getBoolean(key: string, defaultValue?: boolean): boolean | null;
  getArray(key: string, defaultValue?: any[]): any[] | null;
  getObject(key: string, defaultValue?: Object): Object | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNKRTVariablesModule');
