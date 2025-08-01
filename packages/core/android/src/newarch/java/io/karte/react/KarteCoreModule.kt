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
import com.facebook.react.bridge.ReadableMap
import io.karte.android.KarteApp
import io.karte.android.core.usersync.UserSync
import io.karte.android.tracking.Tracker

class KarteCoreModule(reactContext: ReactApplicationContext) : NativeRNKRTCoreModuleSpec(reactContext), ActivityEventListener {
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

  override fun getVisitorId(): String {
    return KarteApp.visitorId
  }

  override fun isOptOut(): Boolean {
    return KarteApp.isOptOut
  }

  override fun optIn() {
    KarteApp.optIn()
  }

  override fun optOut() {
    KarteApp.optOut()
  }

  override fun renewVisitorId() {
    KarteApp.renewVisitorId()
  }

  override fun track(eventName: String, values: ReadableMap?) {
    Tracker.track(eventName, values?.toHashMap())
  }

  override fun identify(values: ReadableMap) {
    Tracker.identify(values.toHashMap())
  }

  override fun identifyWithUserId(userId: String, values: ReadableMap?) {
    Tracker.identify(userId, values?.toHashMap())
  }

  override fun attribute(values: ReadableMap) {
    Tracker.attribute(values.toHashMap())
  }

  override fun view(viewName: String, title: String?, values: ReadableMap?) {
    Tracker.view(viewName, title, values?.toHashMap())
  }

  override fun appendingUserSyncQueryParameter(url: String): String {
    return UserSync.appendUserSyncQueryParameter(url)
  }

  override fun getUserSyncScript(): String? {
    return UserSync.getUserSyncScript()
  }
}
