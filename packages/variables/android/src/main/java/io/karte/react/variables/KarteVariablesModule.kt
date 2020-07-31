package io.karte.react.variables

import com.facebook.react.bridge.*
import io.karte.android.utilities.toList
import io.karte.android.utilities.toMap
import io.karte.android.variables.Variable
import io.karte.android.variables.Variables
import org.json.JSONArray
import org.json.JSONObject

class KarteVariablesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private val variables: MutableMap<String, Variable> = mutableMapOf()

  override fun getName(): String {
    return "RNKRTVariablesModule"
  }

  @ReactMethod
  fun fetch(promise: Promise) {
    Variables.fetch {
      if (it) {
        variables.clear()
        promise.resolve(null)
      } else {
        promise.reject("ERR_VAR", "Failed to fetch variables.")
      }
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getVariable(key: String): String {
    val variable = Variables.get(key)
    variables[key] = variable
    return variable.name
  }

  @ReactMethod
  fun trackOpen(keys: ReadableArray, values: ReadableMap?) {
    val vars = (0 until keys.size()).mapNotNull {
      keys.getString(it)
    }.mapNotNull {
      variables[it]
    }

    Variables.trackOpen(vars, values?.toHashMap())
  }

  @ReactMethod
  fun trackClick(keys: ReadableArray, values: ReadableMap?) {
    val vars = (0 until keys.size()).mapNotNull {
      keys.getString(it)
    }.mapNotNull {
      variables[it]
    }

    Variables.trackClick(vars, values?.toHashMap())
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getString(key: String, defaultValue: String): String? {
    val variable = variables[key] ?: return defaultValue
    return variable.string(defaultValue)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getInteger(key: String, defaultValue: Int): Int {
    val variable = variables[key] ?: return defaultValue
    return variable.long(defaultValue.toLong()).toInt()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getDouble(key: String, defaultValue: Double): Double {
    val variable = variables[key] ?: return defaultValue
    return variable.double(defaultValue)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getBoolean(key: String, defaultValue: Boolean): Boolean {
    val variable = variables[key] ?: return defaultValue
    return variable.boolean(defaultValue)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getArray(key: String, defaultValue: ReadableArray): WritableArray? {
    val variable = variables[key] ?: return Arguments.makeNativeArray(defaultValue.toArrayList())
    val array = variable.jsonArray(JSONArray(defaultValue.toArrayList()))
    return Arguments.makeNativeArray(array.toList())
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getObject(key: String, defaultValue: ReadableMap): WritableMap? {
    val variable = variables[key] ?: return Arguments.makeNativeMap(defaultValue.toHashMap())
    val map = variable.jsonObject(JSONObject(defaultValue.toHashMap()))
    return Arguments.makeNativeMap(map.toMap())
  }
}
