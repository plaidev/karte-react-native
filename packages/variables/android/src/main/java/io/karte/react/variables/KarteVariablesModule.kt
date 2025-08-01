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
package io.karte.react.variables

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import io.karte.android.utilities.toList
import io.karte.android.utilities.toMap
import io.karte.android.variables.Variable
import io.karte.android.variables.Variables
import org.json.JSONArray
import org.json.JSONObject

@ReactModule(name = KarteVariablesModule.NAME)
class KarteVariablesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "RNKRTVariablesModule"
  }

  private val variables: MutableMap<String, Variable> = mutableMapOf()

  override fun getName(): String {
    return NAME
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
    val map = variable.jsonObject(JSONObject(defaultValue.toHashMap() as HashMap<*, *>))
    return Arguments.makeNativeMap(map.toMap())
  }

  @ReactMethod
  fun clearCacheByKey(key: String) {
    Variables.clearCacheByKey(key)
    variables.remove(key)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getAllKeys(): WritableArray {
    val keys = Variables.getAllKeys()
    return Arguments.createArray().apply {
      keys.forEach { pushString(it) }
    }
  }

  @ReactMethod
  fun clearCacheAll() {
    Variables.clearCacheAll()
    variables.clear()
  }
}
