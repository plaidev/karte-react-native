import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  fetch(): Promise<void>;
  getVariable(key: string): string;
  trackOpen(keys: string[], values?: Object): void;
  trackClick(keys: string[], values?: Object): void;
  getString(key: string, defaultValue?: string): string;
  getInteger(key: string, defaultValue?: number): number;
  getDouble(key: string, defaultValue?: number): number;
  getBoolean(key: string, defaultValue?: boolean): boolean;
  getArray(key: string, defaultValue?: Array<Object>): Array<Object>;
  getObject(key: string, defaultValue?: Object): Object;
  clearCacheByKey(key: string): void;
  getAllKeys(): Array<string>;
  clearCacheAll(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNKRTVariablesModule');
