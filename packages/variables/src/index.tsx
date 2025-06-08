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
import { normalize } from '@react-native-karte/utilities';
import type { KRTVariablesNativeModule } from './types';

// TurboModule support with backward compatibility
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const nativeModule: KRTVariablesNativeModule = isTurboModuleEnabled
  ? require('./NativeRNKRTVariablesModule').default
  : NativeModules.RNKRTVariablesModule;

/** 設定値の取得・管理を司るクラスです。 */
export class Variables {
  private constructor() {}

  /**
   * 設定値を取得し、端末上にキャッシュします。
   * @returns 取得完了Promise
   */
  public static fetch(): Promise<void> {
    return nativeModule.fetch();
  }

  /**
   * 指定されたキーに関連付けられた設定値にアクセスします。
   *
   * @remarks
   * なお設定値にアクセスするには事前に Variables.fetch(completion:) を呼び出しておく必要があります。
   * @param key 検索するためのキー
   */
  public static getVariable(key: string): Variable {
    const name = nativeModule.getVariable(key);
    return new VariableImpl(name);
  }

  /**
   * 指定された設定値に関連するキャンペーン情報を元に効果測定用のイベント（message_open）を発火します。
   * @param variables 設定値の配列
   * @param values イベントに紐付けるカスタムオブジェクト
   */
  public static trackOpen(variables: Array<Variable>, values?: object): void {
    const keys = variables.map((variable) => variable.name);
    nativeModule.trackOpen(keys, normalize(values));
  }

  /**
   * 指定された設定値に関連するキャンペーン情報を元に効果測定用のイベント（message_click）を発火します。
   * @param variables 設定値の配列
   * @param values イベントに紐付けるカスタムオブジェクト
   */
  public static trackClick(variables: Array<Variable>, values?: object): void {
    const keys = variables.map((variable) => variable.name);
    nativeModule.trackClick(keys, normalize(values));
  }
}

/**
 * 設定値とそれに付随する情報を保持するためのクラスです。
 *
 * @remarks
 * 設定値の他に、接客サービスIDやアクションIDを保持しています。
 */
export interface Variable {
  name: string;
  /**
   * 設定値（文字列）を返します。
   *
   * @remarks
   * なお設定値が未定義の場合は、デフォルト値を返します。
   * @param defaultValue デフォルト値
   */
  getString(defaultValue: string): string;
  /**
   * 設定値（整数）を返します。
   *
   * @remarks
   * なお設定値が数値でない場合は、デフォルト値を返します。
   * @param defaultValue デフォルト値
   */
  getInteger(defaultValue: number): number;
  /**
   * 設定値（浮動小数点数）を返します。
   *
   * @remarks
   * なお設定値が数値でない場合は、デフォルト値を返します。
   * @param defaultValue デフォルト値
   */
  getDouble(defaultValue: number): number;
  /**
   * 設定値（ブール値）を返します。
   *
   * @remarks
   * なおブール値への変換ルールについては下記を参照してください。
   * - [iOS](https://developer.apple.com/documentation/foundation/nsstring/1409420-boolvalue)
   * - [Android](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/to-boolean.html)
   *
   * 設定値が未定義の場合は、デフォルト値を返します。
   *
   * @param defaultValue デフォルト値
   */
  getBoolean(defaultValue: boolean): boolean;
  /**
   * 設定値（配列）を返します。
   *
   * @remarks
   * 以下の場合においてデフォルト値を返します。
   * - 設定値が未定義の場合
   * - 設定値（JSON文字列）のパースができない場合
   *
   * @param defaultValue デフォルト値
   */
  getArray(defaultValue: Array<any>): Array<any>;
  /**
   * 設定値（辞書）を返します。
   *
   * @remarks
   * 以下の場合においてデフォルト値を返します。
   * - 設定値が未定義の場合
   * - 設定値（JSON文字列）のパースができない場合
   *
   * @param defaultValue デフォルト値
   */
  getObject(defaultValue: object): object;
}

class VariableImpl implements Variable {
  constructor(public name: string) {}
  public getString(defaultValue: string): string {
    return nativeModule.getString(this.name, defaultValue);
  }
  public getInteger(defaultValue: number): number {
    return nativeModule.getInteger(this.name, defaultValue);
  }
  public getDouble(defaultValue: number): number {
    return nativeModule.getDouble(this.name, defaultValue);
  }
  public getBoolean(defaultValue: boolean): boolean {
    return nativeModule.getBoolean(this.name, defaultValue);
  }
  public getArray(defaultValue: Array<any>): Array<any> {
    return nativeModule.getArray(this.name, defaultValue);
  }
  public getObject(defaultValue: object): object {
    return nativeModule.getObject(this.name, defaultValue);
  }
}
