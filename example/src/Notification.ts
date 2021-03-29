import { Notification } from '@react-native-karte/notification';
import messaging from '@react-native-firebase/messaging';

export default function NotificationUseEffect() {
  messaging()
    .requestPermission()
    .then((authorizationStatus) => {
      if (authorizationStatus) {
        console.log('Permission status: ', authorizationStatus);
      }
    });

  messaging()
    .getToken()
    .then((fcmToken) => {
      console.log('FCM Token (getToken): ', fcmToken);
      Notification.registerFCMToken(fcmToken);
    })
    .catch((e) => {
      console.log(e);
    });

  messaging().onTokenRefresh((fcmToken) => {
    console.log('FCM Token (onTokenRefresh): ', fcmToken);
    Notification.registerFCMToken(fcmToken);
  });

  messaging().onMessage((remoteMessage) => {
    if (remoteMessage) {
      console.log('onMessage: ', remoteMessage);
      const notification = Notification.create(remoteMessage);
      if (notification) {
        console.log('onMessage(handle): ', notification);
        // This function only works on Android.
        // If you want to display the foreground notification on iOS, please display it with local notification etc.
        notification.show();
      }
    }
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('getInitialNotification: ', remoteMessage);
        const notification = Notification.create(remoteMessage);
        if (notification) {
          console.log('getInitialNotification(handle): ', remoteMessage);
          notification.handle();

          // If automatic measurement is disabled, the following is called
          // notification.track();
        }
      }
    });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage) {
      console.log('onNotificationOpenedApp: ', remoteMessage);
      const notification = Notification.create(remoteMessage);
      if (notification) {
        console.log('onNotificationOpenedApp(handle): ', notification);
        notification.handle();

        // If automatic measurement is disabled, the following is called
        // notification.track();
      }
    }
  });
}
