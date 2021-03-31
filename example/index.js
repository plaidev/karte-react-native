import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import { name as appName } from './app.json';
import { Notification } from '@react-native-karte/notification';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('setBackgroundMessageHandler: ', remoteMessage);
  const notification = Notification.create(remoteMessage);
  if (notification) {
    console.log('setBackgroundMessageHandler(handle): ', notification);
    notification.show();
  }
});

AppRegistry.registerComponent(appName, () => App);
