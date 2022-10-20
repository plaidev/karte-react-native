import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { UserSync } from '@react-native-karte/core';

export function WebViewComponent() {
  const api_key = 'your_api_key';
  const script = UserSync.getUserSyncScript();
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://admin.karte.io/inspector/track/demo/${api_key}`,
        }}
        injectedJavaScriptBeforeContentLoaded={script}
      />
    </View>
  );
}
