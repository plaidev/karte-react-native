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

import android.app.Activity
import android.content.Intent
import android.util.Log
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import io.karte.android.inappmessaging.InAppMessaging

private fun log(msg: String) {
  if (BuildConfig.DEBUG) {
    Log.d("KarteInAppMessaging", msg)
  }
}

private const val FRAGMENT_TAG = "Karte.FileChooserFragment"

class KarteInAppMessagingModule(reactContext: ReactApplicationContext) : NativeRNKRTInAppMessagingModuleSpec(reactContext) {
  companion object {
    const val NAME = "RNKRTInAppMessagingModule"
  }

  init {
    reactContext.addActivityEventListener(object : BaseActivityEventListener() {
      override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        log("onActivityResult $activity, $requestCode, $resultCode, $data")
        if (activity is FragmentActivity) {
          val fragment = activity.supportFragmentManager.findFragmentByTag(FRAGMENT_TAG)
          try {
            fragment?.onActivityResult(requestCode and 0xffff, resultCode, data)
          } catch (e: IllegalStateException) {
          }
        } else if (activity != null) {
          val fragment = activity.fragmentManager.findFragmentByTag(FRAGMENT_TAG)
          try {
            fragment?.onActivityResult(requestCode and 0xffff, resultCode, data)
          } catch (e: IllegalStateException) {
          }
        }
      }
    })
  }

  override fun getName(): String {
    return NAME
  }

  override fun isPresenting(): Boolean {
    return InAppMessaging.isPresenting
  }

  override fun dismiss() {
    InAppMessaging.dismiss()
  }

  override fun suppress() {
    InAppMessaging.suppress()
  }

  override fun unsuppress() {
    InAppMessaging.unsuppress()
  }
}