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
