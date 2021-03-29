import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { InAppMessaging } from '@react-native-karte/in-app-messaging';
import { styles } from '../styles';

export default function InAppMessagingComponent() {
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
  return (
    <View style={styles.subContainer}>
      <Text style={styles.header}>In-app messaging</Text>
      <Button onPress={() => checkIsPresenting()} title="Is presenting" />
      <Button onPress={() => InAppMessaging.dismiss()} title="Dismiss" />
      <Button onPress={() => InAppMessaging.suppress()} title="Suppress" />
      <Button onPress={() => InAppMessaging.unsuppress()} title="Unsuppress" />
    </View>
  );
}
