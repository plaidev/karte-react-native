package io.karte.react

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import io.karte.android.KarteApp
import io.karte.android.core.usersync.UserSync
import io.karte.android.tracking.Tracker

class KarteCoreModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNKRTCoreModule"
  }

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
