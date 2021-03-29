import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { KarteApp, Tracker, UserSync } from '@react-native-karte/core';
import { InAppMessaging } from '@react-native-karte/in-app-messaging';
import { Notification } from '@react-native-karte/notification';
import { Variables } from '@react-native-karte/variables';

import messaging from '@react-native-firebase/messaging';

export default function App() {
  const [viewName, setViewName] = React.useState<string | undefined>();
  const [userId, setUserId] = React.useState<string | undefined>();
  const [eventName, setEventName] = React.useState<string | undefined>();
  const [string, setString] = React.useState<string | undefined>();
  const [integer, setInteger] = React.useState<number | undefined>();
  const [double, setDouble] = React.useState<number | undefined>();
  const [bool, setBool] = React.useState<boolean | undefined>();
  const [array, setArray] = React.useState<Array<any> | undefined>();
  const [object, setObject] = React.useState<object | undefined>();

  React.useEffect(() => {
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

    Variables.fetch().then(() => {
      const strVar = Variables.getVariable('string');
      setString(strVar.getString('unknown'));

      const intVar = Variables.getVariable('long');
      setInteger(intVar.getInteger(-1));

      const doubleVar = Variables.getVariable('double');
      setDouble(doubleVar.getDouble(-1));

      const boolVar = Variables.getVariable('boolean');
      setBool(boolVar.getBoolean(false));

      const arrVar = Variables.getVariable('array');
      setArray(arrVar.getArray(['u', 'n', 'k', 'n', 'o', 'w', 'n']));

      const objVar = Variables.getVariable('object');
      setObject(objVar.getObject({ un: 'known' }));

      const noneVar = Variables.getVariable('none');
      console.log(noneVar.getString('unknown'));
      console.log(noneVar.getInteger(-1));
      console.log(noneVar.getDouble(-1.1));
      console.log(noneVar.getBoolean(false));
      console.log(noneVar.getArray(['u', 'n', 'k', 'n', 'o', 'w', 'n']));
      console.log(noneVar.getObject({ un: 'known' }));
    });
  }, []);

  const fireViewEvent = () => {
    if (viewName && viewName.length > 0) {
      Tracker.view(viewName);
    }
  };

  const fireIdentifyEvent = () => {
    if (userId && userId.length > 0) {
      Tracker.identify({
        user_id: userId,
      });
    }
  };

  const fireCustomEvent = () => {
    if (eventName && eventName.length > 0) {
      Tracker.track(eventName, {
        from: 'React Native',
      });
    }
  };

  const checkIsPresenting = () => {
    const res = InAppMessaging.isPresenting;
    Alert.alert('Is presenting', '' + res, [
      {
        text: 'OK',
        onPress: () => {},
      },
      {
        text: 'Dismiss',
        onPress: () => {
          InAppMessaging.dismiss();
        },
      },
    ]);
  };

  const checkIsOptOut = () => {
    const res = KarteApp.isOptOut;
    Alert.alert('Is opt-out', '' + res, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const userSync = () => {
    const url = UserSync.appendingQueryParameter('https://karte.io');
    Alert.alert('User sync', url, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const fireOpen = () => {
    const strVar = Variables.getVariable('string');
    const intVar = Variables.getVariable('long');
    Variables.trackOpen([strVar, intVar], {
      from: 'React Native',
    });
  };

  const fireClick = () => {
    const strVar = Variables.getVariable('string');
    const intVar = Variables.getVariable('long');
    Variables.trackClick([strVar, intVar], {
      from: 'React Native',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text style={styles.header}>View event</Text>
          <TextInput
            onChangeText={(value) => setViewName(value)}
            placeholder="View event name"
            value={viewName}
          />
          <Button onPress={() => fireViewEvent()} title="Send" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Identify event</Text>
          <TextInput
            onChangeText={(value) => setUserId(value)}
            placeholder="User ID"
            value={userId}
          />
          <Button onPress={() => fireIdentifyEvent()} title="Send" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Custom event</Text>
          <TextInput
            onChangeText={(value) => setEventName(value)}
            placeholder="Custom event name"
            value={eventName}
          />
          <Button onPress={() => fireCustomEvent()} title="Send" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>In-app messaging</Text>
          <Button onPress={() => checkIsPresenting()} title="Is presenting" />
          <Button onPress={() => InAppMessaging.dismiss()} title="Dismiss" />
          <Button onPress={() => InAppMessaging.suppress()} title="Suppress" />
          <Button
            onPress={() => InAppMessaging.unsuppress()}
            title="Unsuppress"
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Opt-in / out</Text>
          <Button onPress={() => checkIsOptOut()} title="Is opt-out" />
          <Button onPress={() => KarteApp.optIn()} title="Opt-in" />
          <Button onPress={() => KarteApp.optOut()} title="Opt-out" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Renew visitor id</Text>
          <Button onPress={() => KarteApp.renewVisitorId()} title="Renew" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>User sync</Text>
          <Button onPress={() => userSync()} title="User sync" />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Variables</Text>
          <Button onPress={() => Variables.fetch()} title="Fetch" />
          <Button onPress={() => fireOpen()} title="Open" />
          <Button onPress={() => fireClick()} title="Click" />
          <Text>string: {string}</Text>
          <Text>integer: {integer}</Text>
          <Text>double: {double}</Text>
          <Text>boolean: {JSON.stringify(bool)}</Text>
          <Text>array: {JSON.stringify(array)}</Text>
          <Text>object: {JSON.stringify(object)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  subContainer: {
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666666',
  },
});
