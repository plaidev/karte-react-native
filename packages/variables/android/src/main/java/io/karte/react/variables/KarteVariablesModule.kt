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
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import io.karte.android.utilities.toList
import io.karte.android.utilities.toMap
import io.karte.android.variables.Variable
import io.karte.android.variables.Variables
import org.json.JSONArray
import org.json.JSONObject

@ReactModule(name = KarteVariablesModule.NAME)
class KarteVariablesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), TurboModule {
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
  fun trackOpen(keys: ReadableArray, values: ReadableMap?, promise: Promise) {
    val vars = (0 until keys.size()).mapNotNull {
      keys.getString(it)
    }.mapNotNull {
      variables[it]
    }

    Variables.trackOpen(vars, values?.toHashMap())
    promise.resolve(null)
  }

  @ReactMethod
  fun trackClick(keys: ReadableArray, values: ReadableMap?, promise: Promise) {
    val vars = (0 until keys.size()).mapNotNull {
      keys.getString(it)
    }.mapNotNull {
      variables[it]
    }

    Variables.trackClick(vars, values?.toHashMap())
    promise.resolve(null)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getString(key: String, defaultValue: String?): String? {
    val variable = variables[key] ?: return defaultValue
    return variable.string(defaultValue)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getInteger(key: String, defaultValue: Int?): Int? {
    val variable = variables[key] ?: return defaultValue
    return defaultValue?.let { variable.long(it.toLong()).toInt() }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getDouble(key: String, defaultValue: Double?): Double? {
    val variable = variables[key] ?: return defaultValue
    return defaultValue?.let { variable.double(it) }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getBoolean(key: String, defaultValue: Boolean?): Boolean? {
    val variable = variables[key] ?: return defaultValue
    return defaultValue?.let { variable.boolean(it) }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getArray(key: String, defaultValue: ReadableArray?): WritableArray? {
    val variable = variables[key] ?: return defaultValue?.let { Arguments.makeNativeArray(it.toArrayList()) }
    val array = variable.jsonArray(defaultValue?.let { JSONArray(it.toArrayList()) })
    return array?.let { Arguments.makeNativeArray(it.toList()) }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getObject(key: String, defaultValue: ReadableMap?): WritableMap? {
    val variable = variables[key] ?: return defaultValue?.let { Arguments.makeNativeMap(it.toHashMap()) }
    val map = variable.jsonObject(defaultValue?.let { JSONObject(it.toHashMap() as HashMap<*, *>) })
    return map?.let { Arguments.makeNativeMap(it.toMap()) }
  }
}