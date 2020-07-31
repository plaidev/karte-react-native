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
package io.karte.react.in_app_messaging

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import io.karte.android.inappmessaging.InAppMessaging

class KarteInAppMessagingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNKRTInAppMessagingModule"
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun isPresenting(): Boolean {
    return InAppMessaging.isPresenting
  }

  @ReactMethod
  fun dismiss() {
    InAppMessaging.dismiss()
  }

  @ReactMethod
  fun suppress() {
    InAppMessaging.suppress()
  }

  @ReactMethod
  fun unsuppress() {
    InAppMessaging.unsuppress()
  }
}
