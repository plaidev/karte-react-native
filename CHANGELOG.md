# Release - 2026.01.21
### notification 2.1.0

**🔨 CHANGED**

#### 変更詳細

* 非推奨の `metro-react-native-babel-preset` を `@react-native/babel-preset` に置き換えました。
* ネイティブ SDK のバージョンを最新版に更新しました:
  * iOS: KarteCore 2.35.0 (KarteRemoteNotification 2.13.0 は変更なし)
  * Android: core 2.33.0, notifications 2.17.0

### in-app-messaging 2.1.0

**🔨CHANGED**

* 非推奨の `metro-react-native-babel-preset` を `@react-native/babel-preset` に置き換えました。
* ネイティブ SDK のバージョンを最新版に更新しました:
  * iOS: KarteInAppMessaging 2.25.0
  * Android: inappmessaging 2.26.0

### core 2.1.0

**🔨CHANGED**

* 非推奨の `metro-react-native-babel-preset` を `@react-native/babel-preset` に置き換えました。
* ネイティブ SDK のバージョンを最新版に更新しました:
  * iOS: KarteCore 2.35.0
  * Android: core 2.33.0

### variables 2.1.0

**🔨CHANGED**

* 非推奨の `metro-react-native-babel-preset` を `@react-native/babel-preset` に置き換えました。
* ネイティブ SDK のバージョンを最新版に更新しました:
  * iOS: KarteCore 2.35.0 (KarteVariables 2.13.0 は変更なし)
  * Android: core 2.33.0, variables 2.12.0

### visual-tracking 0.4.0

**🔨CHANGED**

* 非推奨の `metro-react-native-babel-preset` を `@react-native/babel-preset` に置き換えました。
* ネイティブ SDK のバージョンを最新版に更新しました:
  * iOS: KarteCore 2.35.0 (KarteVisualTracking 2.14.0 は変更なし)
  * Android: core 2.33.0, visualtracking 2.14.0

# Release - 2025.10.23

### core 2.0.0

**💊FIXED**

* ブリッジモジュール (`KarteCoreModule`) を React Native 0.80 以降をサポートするように更新しました。
* React Native 0.82 以降をサポートするため、`jcenter()` を `mavenCentral()` に置き換えました。

**🔨CHANGED**

* 安定性向上のため、ネイティブ SDK のバージョンを特定のリリースに固定しました:
  * iOS: KarteCore 2.32.0
  * Android: core 2.31.1
* iOS の最小サポートバージョンを 10.0 から 15.0 に更新しました。
* Android Gradle Plugin (AGP) 7 以降に対応するため、`build.gradle` に `namespace` を追加しました。

### in-app-messaging 2.0.0

**💊FIXED**

* ブリッジモジュール (`KarteInAppMessagingModule`) を React Native 0.80 以降をサポートするように更新しました。
* React Native 0.82 以降をサポートするため、`jcenter()` を `mavenCentral()` に置き換えました。

**🔨CHANGED**

* 安定性向上のため、ネイティブ SDK のバージョンを特定のリリースに固定しました:
  * iOS: KarteInAppMessaging 2.22.0
  * Android: inappmessaging 2.24.0
* iOS の最小サポートバージョンを 10.0 から 15.0 に更新しました。
* Android Gradle Plugin (AGP) 7 以降に対応するため、`build.gradle` に `namespace` を追加しました。

### notification 2.0.0

**💊FIXED**

* ブリッジモジュール (`KarteNotificationModule.show`) を React Native 0.80 以降をサポートするように更新しました。
* React Native 0.82 以降をサポートするため、`jcenter()` を `mavenCentral()` に置き換えました。

**🔨CHANGED**

* 安定性向上のため、ネイティブ SDK のバージョンを特定のリリースに固定しました:
  * iOS: KarteCore 2.32.0, KarteRemoteNotification 2.13.0
  * Android: core 2.31.1, notifications 2.15.0
* iOS の最小サポートバージョンを 10.0 から 15.0 に更新しました。
* Android Gradle Plugin (AGP) 7 以降に対応するため、`build.gradle` に `namespace` を追加しました。

### variables 2.0.0

**💊FIXED**

* React Native 0.82 以降をサポートするため、`jcenter()` を `mavenCentral()` に置き換えました。

**🔨CHANGED**

* 安定性向上のため、ネイティブ SDK のバージョンを特定のリリースに固定しました:
  * iOS: KarteCore 2.32.0, KarteVariables 2.13.0
  * Android: core 2.31.1, variables 2.10.0
* iOS の最小サポートバージョンを 10.0 から 15.0 に更新しました。
* Android Gradle Plugin (AGP) 7 以降に対応するため、`build.gradle` に `namespace` を追加しました。

### visual-tracking 0.3.0

**💊FIXED**

* ブリッジモジュール (`KarteVisualTrackingModule.view`) を React Native 0.81 以降をサポートするように更新しました。
* React Native 0.82 以降をサポートするため、`jcenter()` を `mavenCentral()` に置き換えました。

**🔨CHANGED**

* 安定性向上のため、ネイティブ SDK のバージョンを特定のリリースに固定しました:
  * iOS: KarteCore 2.32.0, KarteVisualTracking 2.14.0
  * Android: core 2.31.1, visualtracking 2.12.0
* iOS の最小サポートバージョンを 10.0 から 15.0 に更新しました。
* Android Gradle Plugin (AGP) 7 以降に対応するため、`build.gradle` に `namespace` を追加しました。

# Release - 2025.07.08

### **variables 1.4.0**

* 設定値のKeyをすべて取得するgetAllKeysを追加しました
* 設定値のキャッシュを削除するcacheClearAll, cacheClearByKeyを追加しました

# Release - 2025.03.17

### **notification 1.3.1**

**💊 FIXED**

* Android において React Native 0.75 以上で発生していた `variables` のビルドエラーを修正しました。

### **visual-tracking 0.2.2**

**💊 FIXED**

* 新しいアーキテクチャにおける `UIManager` の処理に条件を追加し、適切に対応しました。

# Release - 2024.02.20

### notification 1.3.0

**💊 FIXED**

* `@react-native-firebase/messaging: 18.5.0`で修正された `RemoteMessage.data`の型変更に対応しました

# Release - 2023.03.14

### visual-tracking 0.2.1

**💊 FIXED**

* iOSにおいてRNKRTVisualTrackingのビルドができない問題を修正しました。

# Release - 2023.03.13

### core 1.4.0

**🔨CHANGED**

* イベントに紐付けるカスタムオブジェクトに日付型（Date）オブジェクトを含めることが可能になりました。

### variables 1.3.0

**🔨CHANGED**

* イベントに紐付けるカスタムオブジェクトに日付型（Date）オブジェクトを含めることが可能になりました。



# Release - 2023.03.10

### core 1.3.0

**🔨CHANGED**

* イベントに紐付けるカスタムオブジェクトに日付型（Date）オブジェクトを含めることが可能になりました。



# Release - 2022.10.20

### core 1.2.0

**🎉FEATURE**

* 再開時のDeepLink処理等に対応しました。
  * これにより[再開されるActivityに対応する](https://app.developers.karte.io/android-sdk-appendix/appendix-relaunch-activity-android-sdk)の対応が不要になります。
* attributeイベントを送信するためのAPIを追加しました。
* `identify(userId)` APIを追加しました。
* WebView連携のための補助APIとして `UserSync.getUserSyncScript` を追加しました。
  * 返されるスクリプトをWebViewで実行することで、`android.webkit.WebView以外のWebView`に対してもユーザー連携が可能になります。
  * これに伴い、クエリパラメータ連携API `UserSync.appendUserSyncQueryParameter` は非推奨になります。

**💊 FIXED**

* Android/iOSの依存関係を修正しました。

**🔨CHANGED**

* 開発時に依存しているReact / React Nativeのバージョンをアップデートしました。

### in-app-messaging 1.2.0

**💊 FIXED**

* Android/iOSの依存関係を修正しました。
* coreモジュールへの依存の不具合を修正しました。

### notification 1.2.0

**💊 FIXED**

* Android/iOSの依存関係を修正しました。
* coreモジュールへの依存の不具合を修正しました。

### variables 1.2.0

**💊 FIXED**

* Android/iOSの依存関係を修正しました。
* coreモジュールへの依存の不具合を修正しました。

### visual-tracking 0.2.0　

**💊 FIXED**

* Android/iOSの依存関係を修正しました。
* coreモジュールへの依存の不具合を修正しました。
* React Native 0.64.0以降を使用しているとき、Androidでビルドができない不具合を修正しました。
* Androidにおいて、ペアリング中にクラッシュすることがある不具合を修正しました。
* Androidにおいて、画面遷移ハンドルにactionId等を指定しても送信されない不具合を修正しました。

**🔨CHANGED**

* 開発時に依存しているReact / React Nativeのバージョンをアップデートしました。

# Release - 2022.08.23

### core 1.1.0

**🔨CHANGED**

* Deployment Targetの変更 iOS9 → iOS10

### in-app-messaging 1.1.0

**🔨CHANGED**

* Deployment Targetの変更 iOS9 → iOS10

### notification 1.1.0

**🔨CHANGED**

* Deployment Targetの変更 iOS9 → iOS10

### variables 1.1.0

**🔨CHANGED**

* Deployment Targetの変更 iOS9 → iOS10

### visual-tracking 0.1.1

**🔨CHANGED**

* Deployment Targetの変更 iOS9 → iOS10

# Release - 2021.07.01

### visual-tracking 0.1.0

**🎉FEATURE**

* 初回リリース

# Release - 2021.03.30

### in-app-messaging 1.0.0

**💊 FIXED**

* Androidにおいて、チャット接客内で画像アップロードが動作しない不具合を修正しました。

# Release - 2020.11.18

### core 1.0.0

**🎉FEATURE**

* 正式版をリリースしました。

### in-app-messaging 1.0.0

**🎉FEATURE**

* 正式版をリリースしました。

### notification 1.0.0

**🎉FEATURE**

* 正式版をリリースしました。

### variables 1.0.0

**🎉FEATURE**

* 正式版をリリースしました。

# Release - 2020.09.10

### notification 0.2.0

**🎉FEATURE**

* 手動で通知の開封イベントを送信するためのメソッドを追加しました。  
  これを利用するためには RemoteNotification iOS SDK v2.4.0 以上をインストールする必要があります。

# Release - 2020.08.03

### core 0.1.0

**🔨CHANGED**

* インターフェースを全面的に見直しました。

### in-app-messaging 0.1.0

**🔨CHANGED**

* インターフェースを全面的に見直しました。

### notification 0.1.0

**🔨CHANGED**

* インターフェースを全面的に見直しました。

### variables 0.1.0

**🔨CHANGED**

* インターフェースを全面的に見直しました。
