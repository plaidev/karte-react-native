# Change Log

All notable changes to this project will be documented in this file.

## 2.0.0

**💊FIXED**

- Updated bridging module (`KarteInAppMessagingModule`) to support React Native 0.80 and later.
- Replaced `jcenter()` with `mavenCentral()` to support React Native 0.82 and later.

**🔨CHANGED**

- Fixed native SDK versions to specific releases for better stability:
  - iOS: KarteInAppMessaging 2.22.0
  - Android: inappmessaging 2.24.0
- Updated minimum iOS platform target from 10.0 to 15.0.

## [1.2.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/in-app-messaging@1.1.0...@react-native-karte/in-app-messaging@1.2.0) (2022-10-20)

### Bug Fixes

* **core,in-app-messaging,notification,variables,visual-tracking:** native dependencies ([a58685f](https://github.com/plaidev/karte-react-native/commit/a58685f2f8c4da0f0209d8c1807fe549a9388826))
* **core,in-app-messaging,notification,variables,visual-tracking:** update dependencies ([#36](https://github.com/plaidev/karte-react-native/issues/36)) ([9baea8b](https://github.com/plaidev/karte-react-native/commit/9baea8bb5b658c77fd1b4eb8b554a833d2156f33))

### Features

* **example:** update react native and etc ([#38](https://github.com/plaidev/karte-react-native/issues/38)) ([d490697](https://github.com/plaidev/karte-react-native/commit/d490697bb1829d6be2df0c1f6a670829e5556e5a))

## [1.1.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/in-app-messaging@1.0.1...@react-native-karte/in-app-messaging@1.1.0) (2022-08-23)

### Bug Fixes

* update deployment target to ios10 ([d051822](https://github.com/plaidev/karte-react-native/commit/d051822d24b5441f894b83abc6d22dcfcf689946))

### Features

* **visual-tracking:** add visual tracking api ([100456c](https://github.com/plaidev/karte-react-native/commit/100456c3d60cdd34b3a1079b20185eafa3b3a416))

## [1.0.1](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/in-app-messaging@1.0.0...@react-native-karte/in-app-messaging@1.0.1) (2021-03-30)

### Bug Fixes

* **in-app-messaging:** support chat image upload on android ([9bfeadb](https://github.com/plaidev/karte-react-native/commit/9bfeadb06a3183612b4993d82ab30b21d0547630))

## [1.0.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/in-app-messaging@0.1.0...@react-native-karte/in-app-messaging@1.0.0) (2020-11-18)

### chore

* relase 1.0.0 ([701c870](https://github.com/plaidev/karte-react-native/commit/701c870fbda772ec180339643ac5c81d85ac9d65))

### BREAKING CHANGES

* It is a commit for the official release, and there is no breaking changes

## 0.1.0 (2020-08-03)

### Features

* implemented the bridge SDK for v2 ([9f91768](https://github.com/plaidev/karte-react-native/commit/9f9176880b4410b6dd9bb3bdfde2e16485ddba5b))
