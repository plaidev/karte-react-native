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
import type { KRTInAppMessagingNativeModule } from './types';

class InAppMessagingBridge {
  constructor(private readonly nativeModule: KRTInAppMessagingNativeModule) {
    this.nativeModule = nativeModule;
  }

  /**
   * アプリ内メッセージの表示有無を返します。
   *
   * @remarks
   * アプリ内メッセージが表示中の場合は true を返し、表示されていない場合は false を返します。
   */
  public get isPresenting(): boolean {
    return this.nativeModule.isPresenting();
  }

  /** 現在表示中の全てのアプリ内メッセージを非表示にします。 */
  public dismiss(): void {
    this.nativeModule.dismiss();
  }

  /**
   * アプリ内メッセージの表示を抑制します。
   *
   * @remarks
   * なお既に表示されているアプリ内メッセージは、メソッドの呼び出しと同時に非表示となります。
   */
  public suppress(): void {
    this.nativeModule.suppress();
  }

  /** アプリ内メッセージの表示抑制状態を解除します。 */
  public unsuppress(): void {
    this.nativeModule.unsuppress();
  }
}

/** アプリ内メッセージの管理を行うクラスです。 */
export const InAppMessaging = new InAppMessagingBridge(
  NativeModules.RNKRTInAppMessagingModule
);
