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
package io.karte.react.notification

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import io.karte.android.KarteApp
import io.karte.android.notifications.MessageHandler
import io.karte.android.notifications.registerFCMToken

@ReactModule(name = KarteNotificationModule.NAME)
class KarteNotificationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "RNKRTNotificationModule"
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun registerFCMToken(fcmToken: String?) {
    fcmToken?.let {
      KarteApp.registerFCMToken(it)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun canHandle(message: ReadableMap): Boolean {
    return MessageHandler.canHandleMessage(toData(message))
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun handle(message: ReadableMap): Boolean {
    // NOP (iOS only)
    return true
  }

  @ReactMethod
  fun show(message: ReadableMap) {
    MessageHandler.handleMessage(reactApplicationContext, toData(message))
  }

  @ReactMethod
  fun track(message: ReadableMap) {
    // NOP (iOS only)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun retrieveURL(message: ReadableMap): String? {
    val attributes = MessageHandler.extractKarteAttributes(toData(message))
    return attributes?.link
  }

  private fun toData(message: ReadableMap): Map<String, String> {
    @Suppress("UNCHECKED_CAST")
    return message.toHashMap().filterKeys {
      it != null
    }.filterValues {
      (it as? String) != null
    } as Map<String, String>
  }
}
