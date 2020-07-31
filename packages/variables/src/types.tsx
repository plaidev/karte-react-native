export interface KRTVariablesNativeModule {
  fetch(): Promise<void>;
  getVariable(key: string): string;
  trackOpen(keys: Array<string>, values?: object): void;
  trackClick(keys: Array<string>, values?: object): void;
  getString(key: string, defaultValue: string): string;
  getInteger(key: string, defaultValue: number): number;
  getDouble(key: string, defaultValue: number): number;
  getBoolean(key: string, defaultValue: boolean): boolean;
  getArray(key: string, defaultValue: Array<any>): Array<any>;
  getObject(key: string, defaultValue: object): object;
}
