# Change Log

All notable changes to this project will be documented in this file.

## 0.3.0

**💊FIXED**

- Updated bridging module (`KarteVisualTrackingModule.view`) to support React Native 0.81 and later.
- Replaced `jcenter()` with `mavenCentral()` to support React Native 0.82 and later.

**🔨CHANGED**

- Fixed native SDK versions to specific releases for better stability:
  - iOS: KarteCore 2.32.0, KarteVisualTracking 2.14.0
  - Android: core 2.31.1, visualtracking 2.12.0
- Updated minimum iOS platform target from 10.0 to 15.0.

## [0.2.2](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/visual-tracking@0.2.1...@react-native-karte/visual-tracking@0.2.2) (2025-03-17)

### Bug Fixes

* **visual-tracking:** add condition for new architecture UIManager handling ([58ae5f7](https://github.com/plaidev/karte-react-native/commit/58ae5f7c4c3d1d1eadac22e06c2a0d533729a8e4))

## [0.2.1](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/visual-tracking@0.2.0...@react-native-karte/visual-tracking@0.2.1) (2023-03-14)

### Bug Fixes

* **vt:** switching the header file import method according to the linking method ([#53](https://github.com/plaidev/karte-react-native/issues/53)) ([907f414](https://github.com/plaidev/karte-react-native/commit/907f414b322c3c74b7d1bc308bb98aae8994fd83))

## [0.2.0](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/visual-tracking@0.1.1...@react-native-karte/visual-tracking@0.2.0) (2022-10-20)

### Bug Fixes

* **core,in-app-messaging,notification,variables,visual-tracking:** native dependencies ([a58685f](https://github.com/plaidev/karte-react-native/commit/a58685f2f8c4da0f0209d8c1807fe549a9388826))
* **core,in-app-messaging,notification,variables,visual-tracking:** update dependencies ([#36](https://github.com/plaidev/karte-react-native/issues/36)) ([9baea8b](https://github.com/plaidev/karte-react-native/commit/9baea8bb5b658c77fd1b4eb8b554a833d2156f33))
* **visual-tracking:** avoid compile error and crash in pairing for an… ([#33](https://github.com/plaidev/karte-react-native/issues/33)) ([c0aaf80](https://github.com/plaidev/karte-react-native/commit/c0aaf8044540ebf4af28d741fe2e278249264bd5))

### Features

* **example:** update react native and etc ([#38](https://github.com/plaidev/karte-react-native/issues/38)) ([d490697](https://github.com/plaidev/karte-react-native/commit/d490697bb1829d6be2df0c1f6a670829e5556e5a))

## [0.1.1](https://github.com/plaidev/karte-react-native/compare/@react-native-karte/visual-tracking@0.1.0...@react-native-karte/visual-tracking@0.1.1) (2022-08-23)

### Bug Fixes

* update deployment target to ios10 ([d051822](https://github.com/plaidev/karte-react-native/commit/d051822d24b5441f894b83abc6d22dcfcf689946))

## 0.1.0 (2021-07-01)

### Features

* **visual-tracking:** add visual tracking api ([100456c](https://github.com/plaidev/karte-react-native/commit/100456c3d60cdd34b3a1079b20185eafa3b3a416))
