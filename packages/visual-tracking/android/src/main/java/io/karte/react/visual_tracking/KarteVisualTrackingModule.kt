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
package io.karte.react.visual_tracking

import android.app.Activity
import android.view.View
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.events.TouchEventType
import io.karte.android.core.logger.Logger
import io.karte.android.visualtracking.BasicAction
import io.karte.android.visualtracking.ImageProvider
import io.karte.android.visualtracking.VisualTracking

private const val LOG_TAG = "Karte.VT.RN"

class KarteVisualTrackingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
  private var isRegistered = false

  init {
    reactContext.addLifecycleEventListener(this)
  }

  override fun getName(): String {
    return "RNKRTVisualTrackingModule"
  }

  override fun onHostResume() {
    addListenerIfNeed()
  }

  override fun onHostPause() {
  }

  override fun onHostDestroy() {
  }

  private fun addListenerIfNeed() {
    if (isRegistered) return
    isRegistered = true
    val uiManagerModule: UIManagerModule? = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
    uiManagerModule?.eventDispatcher?.addListener { event ->
      if (event.eventName == TouchEventType.getJSEventName(TouchEventType.END)) {
        UiThreadUtil.runOnUiThread {
          runCatching {
            val v = uiManagerModule.resolveView(event.viewTag)
            Logger.d(LOG_TAG, "onEventDispatch touchEnd, ${v.javaClass.simpleName}, ${event.viewTag} ${v.tag}")
            handleViewAction("RN.touchEnd", v)
          }
        }
      }
    }
  }

  private fun handleViewAction(action: String, view: View) {
    VisualTracking.handle(BasicAction(action, view.actionId, view.targetText, ImageProvider { view.bitmap }))
  }

  private fun handleLifecycleAction(action: String, activity: Activity) {
    val contentView = activity.contentView
    contentView.postDelayed({
      VisualTracking.handle(BasicAction(action, null, null, ImageProvider { contentView.bitmap }))
    }, 200)
  }

  @ReactMethod
  fun view(action: String, actionId: String?, targetText: String?) {
    currentActivity?.let { handleLifecycleAction(action, it) }
  }

}
