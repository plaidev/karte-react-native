# Native SDK バージョン更新手順

このプロンプトは、KARTE React Native SDKの各モジュールで依存しているネイティブSDK（iOS/Android）のバージョンを最新版に更新する手順を示します。

## 前提条件

- CocoaPods と Maven/Gradle がインストールされていること
- Android SDK のリリースノートURL: https://developers.karte.io/docs/release-notes-android-sdk-v2

## 手順

### 1. 最新のネイティブSDKバージョンを調査

#### iOS (CocoaPods)
以下のコマンドで各ライブラリの最新バージョンを確認:

```bash
pod search KarteCore --simple | head -5
pod search KarteInAppMessaging --simple | head -5
pod search KarteRemoteNotification --simple | head -5
pod search KarteVariables --simple | head -5
pod search KarteVisualTracking --simple | head -5
```

#### Android (Maven/Release Notes)
Android SDKのリリースノートページから最新バージョンを確認:
- URL: https://developers.karte.io/docs/release-notes-android-sdk-v2
- WebFetchツールを使用して以下のモジュールの最新バージョンを取得:
  - `core`
  - `inappmessaging`
  - `notifications`
  - `variables`
  - `visualtracking`

### 2. 各モジュールのネイティブSDKバージョンを更新

以下のモジュールごとにiOSとAndroidのSDKバージョンを更新します:

#### core モジュール
- **iOS**: `packages/core/RNKRTCore.podspec` の `KarteCore` バージョン
- **Android**: `packages/core/android/build.gradle` の `io.karte.android:core` バージョン

#### in-app-messaging モジュール
- **iOS**: `packages/in-app-messaging/RNKRTInAppMessaging.podspec` の `KarteInAppMessaging` バージョン
- **Android**: `packages/in-app-messaging/android/build.gradle` の `io.karte.android:inappmessaging` バージョン

#### notification モジュール
- **iOS**: `packages/notification/RNKRTNotification.podspec` の `KarteRemoteNotification` バージョン（必要に応じて）
- **Android**: `packages/notification/android/build.gradle` の以下のバージョン:
  - `io.karte.android:core`
  - `io.karte.android:notifications`

#### variables モジュール
- **iOS**: `packages/variables/RNKRTVariables.podspec` の `KarteVariables` バージョン（必要に応じて）
- **Android**: `packages/variables/android/build.gradle` の以下のバージョン:
  - `io.karte.android:core`
  - `io.karte.android:variables`

#### visual-tracking モジュール
- **iOS**: `packages/visual-tracking/RNKRTVisualTracking.podspec` の `KarteVisualTracking` バージョン（必要に応じて）
- **Android**: `packages/visual-tracking/android/build.gradle` の以下のバージョン:
  - `io.karte.android:core`
  - `io.karte.android:visualtracking`

### 3. CHANGELOGを更新

各モジュールの `CHANGELOG.md` ファイルを更新:
- 最新のバージョンセクション（通常は `## x.x.x` というプレースホルダー）に以下の情報を追加:

```markdown
- Updated native SDK versions to latest releases:
  - iOS: [ライブラリ名] [バージョン]
  - Android: [ライブラリ名] [バージョン]
```

**注意**:
- iOSのライブラリで変更がない場合は `(no change for [ライブラリ名] [バージョン])` と記載
- 各モジュールの依存関係に応じて、記載するライブラリ名とバージョンを調整

### 4. パッケージバージョンを更新（必要に応じて）

リリースを行う場合、以下のファイルを更新:

#### 各モジュールの package.json
- `version` フィールドを更新
- `peerDependencies` の `@react-native-karte/core` バージョンを更新（core以外のモジュール）

#### 各モジュールの CHANGELOG.md
- バージョン番号のプレースホルダー（`## x.x.x`）を実際のバージョン番号に置き換え

**バージョニングルール**:
- core, in-app-messaging, notification, variables: メジャー・マイナーバージョンを揃える（例: 2.1.0）
- visual-tracking: 独自のバージョニング（マイナーバージョンのみ更新する場合あり）

### 5. 変更内容のレビュー

```bash
git diff
git status
```

以下の点を確認:
- [ ] 全モジュールでネイティブSDKバージョンが最新版に更新されているか
- [ ] CHANGELOGに更新内容が記載されているか
- [ ] package.jsonのバージョンとpeerDependenciesが適切に更新されているか（リリース時）
- [ ] 変更が一貫性を持っているか

## チェックリスト

更新完了後、以下を確認してください:

- [ ] iOS: 全モジュールのpodspecファイルでネイティブSDKバージョンが更新されている
- [ ] Android: 全モジュールのbuild.gradleファイルでネイティブSDKバージョンが更新されている
- [ ] 全モジュールのCHANGELOGに更新内容が記載されている
- [ ] （リリース時）全モジュールのpackage.jsonのバージョンが更新されている
- [ ] （リリース時）全モジュールのpeerDependenciesが新しいcoreバージョンを参照している
- [ ] git diffで不要な変更が含まれていない

## 参考情報

### ファイルパス一覧

```
packages/core/
  - RNKRTCore.podspec
  - android/build.gradle
  - package.json
  - CHANGELOG.md

packages/in-app-messaging/
  - RNKRTInAppMessaging.podspec
  - android/build.gradle
  - package.json
  - CHANGELOG.md

packages/notification/
  - RNKRTNotification.podspec
  - android/build.gradle
  - package.json
  - CHANGELOG.md

packages/variables/
  - RNKRTVariables.podspec
  - android/build.gradle
  - package.json
  - CHANGELOG.md

packages/visual-tracking/
  - RNKRTVisualTracking.podspec
  - android/build.gradle
  - package.json
  - CHANGELOG.md
```

### 依存関係マッピング

| React Nativeモジュール | iOS SDK | Android SDK |
|---|---|---|
| core | KarteCore | io.karte.android:core |
| in-app-messaging | KarteInAppMessaging | io.karte.android:inappmessaging |
| notification | KarteCore, KarteRemoteNotification | io.karte.android:core, io.karte.android:notifications |
| variables | KarteCore, KarteVariables | io.karte.android:core, io.karte.android:variables |
| visual-tracking | KarteCore, KarteVisualTracking | io.karte.android:core, io.karte.android:visualtracking |

## 使用例

このプロンプトを使用する際は、以下のように指示してください:

```
Native SDKのバージョンを最新版に更新してください。
.claude/prompts/update-native-sdk-versions.md の手順に従ってください。
```

または、パッケージバージョンも更新する場合:

```
Native SDKのバージョンを最新版に更新して、各モジュールのマイナーバージョンを上げてください。
.claude/prompts/update-native-sdk-versions.md の手順に従ってください。
```
