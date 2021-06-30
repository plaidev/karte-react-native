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
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.view.ViewParent
import android.widget.TextView

internal val View.actionId: String
  get() {
    var target: View? = this
    val sb = StringBuilder()
    while (target != null) {
      sb.append(target.javaClass.name)
      val parent = target.parent

      if (parent is ViewGroup) {
        var i = 0
        while (i < parent.childCount) {
          val v = parent.getChildAt(i)
          if (v === target)
            sb.append(i)
          i++
        }
      }

      target = when (parent) {
        is View -> parent
        is ViewParent -> {
          sb.append(parent.javaClass.name)
          null
        }
        else -> null
      }
    }
    return sb.toString()
  }

internal val View.targetText: String?
  get() {
    if (this is ViewGroup) {
      for (i in 0 until this.childCount) {
        val text = this.getChildAt(i).targetText
        if (text != null) return text
      }
    }
    if (this is TextView) {
      val text = this.text
      if (text != null) {
        return text.toString()
      }
    }
    return null
  }

internal val View.bitmap: Bitmap
  get() {
    var backgroundColor = Color.TRANSPARENT
    var activity: Activity? = null
    if (context is Activity) {
      activity = context as Activity
    }
    if (activity != null) {
      val array =
        activity.theme.obtainStyledAttributes(intArrayOf(android.R.attr.colorBackground))
      backgroundColor = array.getColor(0, Color.TRANSPARENT)
      array.recycle()
    }
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    canvas.drawColor(backgroundColor)
    draw(canvas)
    return bitmap
  }

internal val Activity.contentView: View
  get() {
    return findViewById(android.R.id.content)
  }
