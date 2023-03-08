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

import { NativeModules } from 'react-native';
import type { KRTCoreNativeModule, JSONObject } from './types';

const nativeModule: KRTCoreNativeModule = NativeModules.RNKRTCoreModule;

/** KARTE SDKのエントリポイントクラスです。 */
export class KarteApp {
  private constructor() {}
  /**
   * ビジターIDを返します。
   *
   * @remarks
   * ユーザーを一意に識別するためのID（ビジターID）を返します。
   *
   * なお初期化が行われていない場合は空文字列を返します。
   */
  public static get visitorId(): string {
    return nativeModule.getVisitorId();
  }

  /**
   * オプトアウトの設定有無を返します。
   *
   * @remarks
   * オプトアウトされている場合は、`true` を返し、されていない場合は `false` を返します。
   *
   * また初期化が行われていない場合は `false` を返します。
   */
  public static get isOptOut(): boolean {
    return nativeModule.isOptOut();
  }

  /**
   * オプトインします。
   *
   * @remarks
   * 初期化が行われていない状態で呼び出した場合はオプトインは行われません。
   */
  public static optIn(): void {
    nativeModule.optIn();
  }

  /**
   * オプトアウトします。
   *
   * @remarks
   * 初期化が行われていない状態で呼び出した場合はオプトアウトは行われません。
   */
  public static optOut(): void {
    nativeModule.optOut();
  }

  /**
   * ビジターIDを再生成します。
   *
   * @remarks
   * ビジターIDの再生成は、現在のユーザーとは異なるユーザーとして計測したい場合などに行います。
   * 例えば、アプリケーションでログアウトを行った場合などがこれに該当します。
   *
   * なお初期化が行われていない状態で呼び出した場合は再生成は行われません。
   */
  public static renewVisitorId(): void {
    nativeModule.renewVisitorId();
  }
}

/** イベントトラッキングを行うためのクラスです。 */
export class Tracker {
  private constructor() {}
  /**
   * イベントの送信を行います。
   * @param name イベント名
   * @param values イベントに紐付けるカスタムオブジェクト
   */

  public static track(name: string, values: JSONObject = {}) {
    nativeModule.track(name, this.normalize(values));
  }

  /**
   * Identifyイベントの送信を行います。
   *
   * @param values Identifyイベントに紐付けるカスタムオブジェクト
   */
  public static identify(values: JSONObject): void;
  /**
   * Identifyイベントの送信を行います。
   *
   * @param userId ユーザーを識別する一意なID
   * @param values Identifyイベントに紐付けるカスタムオブジェクト
   */
  public static identify(userId: string, values?: JSONObject): void;

  public static identify(
    value: string | JSONObject,
    values?: JSONObject
  ): void {
    if (typeof value === 'string') {
      nativeModule.identifyWithUserId(value, this.normalize(values ?? {}));
    } else {
      nativeModule.identify(this.normalize(value));
    }
  }

  /**
   * Attributeイベントの送信を行います。
   *
   * @param values Attributeイベントにっっxz紐付けるカスタムオブジェクト
   */
  public static attribute(values: JSONObject) {
    nativeModule.attribute(this.normalize(values));
  }

  /**
   * Viewイベントの送信を行います。
   * @param viewName 画面名
   * @param title タイトル
   * @param values Viewイベントに紐付けるカスタムオブジェクト
   */
  public static view(
    viewName: string,
    title?: string,
    values: JSONObject = {}
  ) {
    nativeModule.view(viewName, title, this.normalize(values));
  }

  private static normalize(values: unknown): any {
    if (Array.isArray(values) || values instanceof Set) {
      return Array.from(values).map(this.normalize);
    } else if (values instanceof Map) {
      const newValues: JSONObject = {};
      for (const [k, v] of values) {
        newValues[k] = this.normalize(v);
      }
      return newValues;
    } else if (values !== null && typeof values === 'object') {
      if (values instanceof Date) {
        const time = Math.round(values.getTime() / 1000);
        return !Number.isNaN(time) ? time : values;
      } else if (Object.prototype.toString.call(values) === '[object String]') {
        return values;
      }
      for (const k in values) {
        if (values.hasOwnProperty(k)) {
          // @ts-ignore
          values[k] = this.normalize(values[k]);
        }
      }
    }
    return values;
  }
}
/**
 * WebView 連携するためのクラスです。
 *
 * @remarks
 * WebページURLに連携用のクエリパラメータを付与した状態で、URLをWebViewで開くことでWebとAppのユーザーの紐付けが行われます。
 * なお連携を行うためにはWebページに、KARTEのタグが埋め込まれている必要があります。
 */
export class UserSync {
  private constructor() {}
  /**
   * @deprecated User sync function using query parameters is deprecated. It will be removed in the future. Use {@link getUserSyncScript} instead.
   *
   * 指定されたURL文字列にWebView連携用のクエリパラメータを付与します。
   *
   * @remarks
   * 連携用のクエリパラメータを付与したURL文字列を返します。
   * 指定されたURL文字列の形式が正しくない場合、またはSDKの初期化が行われていない場合は、引数に指定したURL文字列を返します。
   *
   * @param url 連携するページのURL文字列
   */
  public static appendingQueryParameter(url: string): string {
    return nativeModule.appendingUserSyncQueryParameter(url);
  }

  /**
   * WebView 連携用のスクリプト(javascript)を返却します。
   *
   * @remarks
   * ユーザースクリプトとしてWebViewに設定することで、WebView内のタグと連携されます。
   * なおSDKの初期化が行われていない場合はnullを返却します。
   */
  public static getUserSyncScript(): string {
    return nativeModule.getUserSyncScript();
  }
}
