//
//  Copyright 2020 PLAID, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

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
  clearCacheByKey(key: string): void;
  getAllKeys(): Array<string>;
}
