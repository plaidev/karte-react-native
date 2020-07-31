package io.karte.react.notification

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import io.karte.android.KarteApp
import io.karte.android.notifications.MessageHandler
import io.karte.android.notifications.registerFCMToken

class KarteNotificationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNKRTNotificationModule"
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
  fun show(message: ReadableMap): Boolean {
    return MessageHandler.handleMessage(reactApplicationContext, toData(message))
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
