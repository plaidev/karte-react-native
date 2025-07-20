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

import { TurboModuleRegistry, NativeModules } from 'react-native';
import type { Spec } from './NativeRNKRTNotificationModule';
import type { RemoteMessage } from './types';

// TurboModule/Bridge fallback with public API
const TurboImpl = TurboModuleRegistry.get<Spec>('RNKRTNotificationModule');
const BridgeImpl = (NativeModules as any).RNKRTNotificationModule;

const nativeModule: Spec = (TurboImpl ?? BridgeImpl) as Spec;

/** リモート通知メッセージのパースおよびメッセージ中に含まれるディープリンクのハンドリングを行うためのクラスです。 */
export class Notification {
  private constructor(private readonly remoteMessage: RemoteMessage) {}
  /**
   * FCM（Firebase Cloud Messaging）トークンを登録します。
   *
   * @remarks
   * なお初期化が行われていない状態で呼び出した場合は登録処理は行われません。
   *
   * @param fcmToken FCMトークン
   */
  public static registerFCMToken(fcmToken?: string): void {
    nativeModule.registerFCMToken(fcmToken);
  }

  /**
   * インスタンスを初期化します。
   *
   * @remarks
   * なおリモート通知メッセージが KARTE から送信されたメッセージでない場合は、nullを返します。
   *
   * @param remoteMessage リモート通知メッセージ
   */
  public static create(remoteMessage: RemoteMessage): Notification | null {
    if (nativeModule.canHandle(remoteMessage.data ?? {})) {
      return new Notification(remoteMessage);
    } else {
      return null;
    }
  }

  /**
   * 通知メッセージ中に含まれる URL を返します。
   *
   * @remarks
   * 以下の場合は、nil を返します。
   * - KARTE以外から送信されたメッセージ
   * - メッセージ中に URL が含まれていない場合
   * - 不正なURL
   */
  public get url(): string | null {
    return nativeModule.retrieveURL(this.remoteMessage.data ?? {});
  }

  /**
   * (Androidのみ) KARTE経由で送信された通知メッセージから、通知を作成・表示します。
   */
  public show(): void {
    nativeModule.show(this.remoteMessage.data ?? {});
  }

  /**
   * (iOSのみ) リモート通知メッセージに含まれるディープリンクを処理します。
   *
   * @remarks
   * 内部では、メッセージ中に含まれるURLを `UIApplication.open(_:options:completionHandler:)` に渡す処理を行っています。
   * `UIApplication.open(_:options:completionHandler:)`の呼び出しが行われた場合は true を返し、メッセージ中にURLが含まれない場合は false を返します。
   */
  public handle(): boolean {
    return nativeModule.handle(this.remoteMessage.data ?? {});
  }

  /**
   * (iOSのみ) 通知のクリック計測を行います。
   *
   * @remarks
   * 通常は自動でクリック計測が行われるため本メソッドを呼び出す必要はありませんが、 `isEnabledAutoMeasurement` が false の場合は自動での計測が行われないため、 本メソッドを呼び出す必要があります。
   */
  public track(): void {
    nativeModule.track(this.remoteMessage.data ?? {});
  }
}
