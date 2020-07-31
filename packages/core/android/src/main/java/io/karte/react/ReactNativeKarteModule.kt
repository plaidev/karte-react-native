package io.karte.react

import io.karte.android.KarteApp
import io.karte.android.core.library.Library

class ReactNativeKarteModule : Library {
  override val name: String = "react-native"
  override val version: String = ReactNativeKarteVersion.VERSION
  override val isPublic: Boolean = true

  override fun configure(app: KarteApp) {}
  override fun unconfigure(app: KarteApp) {}
}
