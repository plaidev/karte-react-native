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
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import io.karte.android.KarteApp
import io.karte.android.core.usersync.UserSync
import io.karte.android.tracking.Tracker

@ReactModule(name = KarteCoreModule.NAME, isTurboModule = true)
class KarteCoreModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener, TurboModule {
  companion object {
    const val NAME = "RNKRTCoreModule"
  }

  init {
      reactContext.addActivityEventListener(this)
  }

  //region NativeModule
  override fun getName(): String {
    return NAME
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
  fun optIn(promise: Promise) {
    KarteApp.optIn()
    promise.resolve(null)
  }

  @ReactMethod
  fun optOut(promise: Promise) {
    KarteApp.optOut()
    promise.resolve(null)
  }

  @ReactMethod
  fun renewVisitorId(promise: Promise) {
    KarteApp.renewVisitorId()
    promise.resolve(null)
  }

  @ReactMethod
  fun track(name: String, values: ReadableMap?, promise: Promise) {
    Tracker.track(name, values?.toHashMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun identify(values: ReadableMap?, promise: Promise) {
    Tracker.identify(values?.toHashMap() ?: emptyMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun identifyWithUserId(userId: String, values: ReadableMap?, promise: Promise) {
    Tracker.identify(userId, values?.toHashMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun attribute(values: ReadableMap?, promise: Promise) {
    Tracker.attribute(values?.toHashMap() ?: emptyMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun view(viewName: String, title: String?, values: ReadableMap?, promise: Promise) {
    Tracker.view(viewName, title, values?.toHashMap())
    promise.resolve(null)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun appendingUserSyncQueryParameter(url: String): String {
    return UserSync.appendUserSyncQueryParameter(url)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getUserSyncScript(): String {
    return UserSync.getUserSyncScript() ?: ""
  }
}