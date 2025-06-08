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
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.fabric.FabricUIManager
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.common.UIManagerType
import com.facebook.react.uimanager.events.TouchEventType
import io.karte.android.core.logger.Logger
import io.karte.android.visualtracking.BasicAction
import io.karte.android.visualtracking.ImageProvider
import io.karte.android.visualtracking.VisualTracking

private const val LOG_TAG = "Karte.VT.RN"

@ReactModule(name = KarteVisualTrackingModule.NAME)
class KarteVisualTrackingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
  companion object {
    const val NAME = "RNKRTVisualTrackingModule"
  }

  private var isRegistered = false

  init {
    reactContext.addLifecycleEventListener(this)
  }

  override fun getName(): String {
    return NAME
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

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // https://github.com/reactwg/react-native-new-architecture/discussions/201
      val uiManager = UIManagerHelper.getUIManager(reactApplicationContext, UIManagerType.FABRIC) as? FabricUIManager
      uiManager?.eventDispatcher?.addListener { event ->
        if (event.eventName == TouchEventType.getJSEventName(TouchEventType.END)) {
          UiThreadUtil.runOnUiThread {
            runCatching {
              uiManager.resolveView(event.viewTag)?.let { v ->
                Logger.d(LOG_TAG, "onEventDispatch touchEnd, ${v.javaClass.simpleName}, ${event.viewTag} ${v.tag}")
                handleViewAction("RN.touchEnd", v)
              }
            }
          }
        }
      }
    } else {
      val uiManagerModule: UIManagerModule? = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
      uiManagerModule?.eventDispatcher?.addListener { event ->
        if (event.eventName == TouchEventType.getJSEventName(TouchEventType.END)) {
          UiThreadUtil.runOnUiThread {
            runCatching {
              uiManagerModule.resolveView(event.viewTag)?.let { v ->
                Logger.d(LOG_TAG, "onEventDispatch touchEnd, ${v.javaClass.simpleName}, ${event.viewTag} ${v.tag}")
                handleViewAction("RN.touchEnd", v)
              }
            }
          }
        }
      }
    }
  }

  private fun handleViewAction(action: String, view: View) {
    VisualTracking.handle(BasicAction(action, view.actionId, view.targetText, ImageProvider { view.bitmap }))
  }

  private fun handleLifecycleAction(activity: Activity, action: String, actionId: String?, targetText: String?) {
    val contentView = activity.contentView
    contentView.postDelayed({
      VisualTracking.handle(BasicAction(action, actionId, targetText, ImageProvider { contentView.bitmap }))
    }, 200)
  }

  @ReactMethod
  fun view(action: String, actionId: String?, targetText: String?) {
    currentActivity?.let { handleLifecycleAction(it, action, actionId, targetText) }
  }

}
