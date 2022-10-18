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
package io.karte.react

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import io.karte.android.KarteApp
import io.karte.android.core.usersync.UserSync
import io.karte.android.tracking.Tracker

class KarteCoreModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
  init {
      reactContext.addActivityEventListener(this)
  }

  //region NativeModule
  override fun getName(): String {
    return "RNKRTCoreModule"
  }
  //endregion

  //region ActivityEventListener
  override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {
  }

  override fun onNewIntent(intent: Intent?) {
    KarteApp.onNewIntent(intent)
  }
  //endregion

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getVisitorId(): String {
    return KarteApp.visitorId
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun isOptOut(): Boolean {
    return KarteApp.isOptOut
  }

  @ReactMethod
  fun optIn() {
    KarteApp.optIn()
  }

  @ReactMethod
  fun optOut() {
    KarteApp.optOut()
  }

  @ReactMethod
  fun renewVisitorId() {
    KarteApp.renewVisitorId()
  }

  @ReactMethod
  fun track(name: String, values: ReadableMap?) {
    Tracker.track(name, values?.toHashMap())
  }

  @ReactMethod
  fun identify(values: ReadableMap) {
    Tracker.identify(values.toHashMap())
  }

  @ReactMethod
  fun view(viewName: String, title: String?, values: ReadableMap?) {
    Tracker.view(viewName, title, values?.toHashMap())
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun appendingUserSyncQueryParameter(url: String): String {
    return UserSync.appendUserSyncQueryParameter(url)
  }
}
