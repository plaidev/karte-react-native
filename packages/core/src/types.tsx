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

export interface KRTCoreNativeModule {
  getVisitorId(): string;
  isOptOut(): boolean;
  optIn(): void;
  optOut(): void;
  renewVisitorId(): void;
  track(name: string, values?: JSONObject): void;
  identify(values: JSONObject): void;
  identifyWithUserId(userId: string, values?: JSONObject): void;
  attribute(values: JSONObject): void;
  view(viewName: string, title?: string, values?: JSONObject): void;
  appendingUserSyncQueryParameter(url: string): string;
  getUserSyncScript(): string;
}

export type JSONValue =
  | string
  | number
  | boolean
  | Date
  | JSONArray
  | JSONObject;

export interface JSONArray extends Array<JSONValue> {}

export interface JSONObject {
  [key: string]: JSONValue;
}
