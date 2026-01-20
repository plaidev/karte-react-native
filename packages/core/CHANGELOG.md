# Change Log

All notable changes to this project will be documented in this file.

## 2.1.0

- Replaced deprecated `metro-react-native-babel-preset` with `@react-native/babel-preset`.
- Updated native SDK versions to latest releases:
  - iOS: KarteCore 2.35.0
  - Android: core 2.33.0

## 2.0.0

**💊FIXED**

- Updated bridging module (`KarteCoreModule`) to support React Native 0.80 and later.
- Replaced `jcenter()` with `mavenCentral()` to support React Native 0.82 and later.

**🔨CHANGED**

- Fixed native SDK versions to specific releases for better stability:
  - iOS: KarteCore 2.32.0
  - Android: core 2.31.1
- Updated minimum iOS platform target from 10.0 to 15.0.
- Add namespace to `build.gradle` for Android Gradle Plugin (AGP) version 7 and later.

## [1.4.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/core@1.3.0...@react-native-karte/core@1.4.0) (2023-03-13)


### Features

* convert date in values to unixtime ([#52](https://github.com/plaidev/karte-react-native/issues/52)) ([7a76244](https://github.com/plaidev/karte-react-native/commit/7a7624468251637792b3896539cf82f958c9c8fb))

## [1.3.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/core@1.2.0...@react-native-karte/core@1.3.0) (2023-03-10)

### Bug Fixes

* **core:** package version ([#49](https://github.com/plaidev/karte-react-native/issues/49)) ([092dab8](https://github.com/plaidev/karte-react-native/commit/092dab8d62767d9ede28171a902bf3997396993f))


### Features

* **core:** convert date in values to unixtime ([#46](https://github.com/plaidev/karte-react-native/issues/46)) ([f777f21](https://github.com/plaidev/karte-react-native/commit/f777f21c04301fc4ca0f07a8bef2998a41fb71b9))

## [1.2.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/core@1.1.0...@react-native-karte/core@1.2.0) (2022-10-20)

### Bug Fixes

* **core,in-app-messaging,notification,variables,visual-tracking:** native dependencies ([a58685f](https://github.com/plaidev/karte-react-native/commit/a58685f2f8c4da0f0209d8c1807fe549a9388826))
* **core,in-app-messaging,notification,variables,visual-tracking:** update dependencies ([#36](https://github.com/plaidev/karte-react-native/issues/36)) ([9baea8b](https://github.com/plaidev/karte-react-native/commit/9baea8bb5b658c77fd1b4eb8b554a833d2156f33))
* **core:** support for activities that restart deep link processing ([#39](https://github.com/plaidev/karte-react-native/issues/39)) ([7c27469](https://github.com/plaidev/karte-react-native/commit/7c27469f66accc2730a623abbc20ac66987ead58))
* **visual-tracking:** avoid compile error and crash in pairing for an… ([#33](https://github.com/plaidev/karte-react-native/issues/33)) ([c0aaf80](https://github.com/plaidev/karte-react-native/commit/c0aaf8044540ebf4af28d741fe2e278249264bd5))

### Features

* **core:** add UserSync.getUserSyncScript ([#40](https://github.com/plaidev/karte-react-native/issues/40)) ([ff2fb48](https://github.com/plaidev/karte-react-native/commit/ff2fb48434825252dbc29c8652d05f0c947c467e))
* **example:** update react native and etc ([#38](https://github.com/plaidev/karte-react-native/issues/38)) ([d490697](https://github.com/plaidev/karte-react-native/commit/d490697bb1829d6be2df0c1f6a670829e5556e5a))

## [1.1.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/core@1.0.0...@react-native-karte/core@1.1.0) (2022-08-23)

### Bug Fixes

* update deployment target to ios10 ([d051822](https://github.com/plaidev/karte-react-native/commit/d051822d24b5441f894b83abc6d22dcfcf689946))

### Features

* **visual-tracking:** add visual tracking api ([100456c](https://github.com/plaidev/karte-react-native/commit/100456c3d60cdd34b3a1079b20185eafa3b3a416))

## [1.0.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/core@0.1.0...@react-native-karte/core@1.0.0) (2020-11-18)

### chore

* relase 1.0.0 ([701c870](https://github.com/plaidev/karte-react-native/commit/701c870fbda772ec180339643ac5c81d85ac9d65))

### BREAKING CHANGES

* It is a commit for the official release, and there is no breaking changes

## 0.1.0 (2020-08-03)

### Features

* implemented the bridge SDK for v2 ([9f91768](https://github.com/plaidev/karte-react-native/commit/9f9176880b4410b6dd9bb3bdfde2e16485ddba5b))
