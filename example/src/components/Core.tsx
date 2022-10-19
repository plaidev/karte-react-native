import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { KarteApp, Tracker, UserSync } from '@react-native-karte/core';
import { styles } from '../styles';

export function TrackerComponent() {
  const [viewName, setViewName] = React.useState<string | undefined>();
  const [userId, setUserId] = React.useState<string | undefined>();
  const [gender, setGender] = React.useState<string | undefined>();
  const [eventName, setEventName] = React.useState<string | undefined>();

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

  const fireIdentifyWithUserIdEvent = () => {
    if (userId && userId.length > 0) {
      Tracker.identify(userId);
    }
  };

  const fireAttributeEvent = () => {
    if (gender && gender.length > 0) {
      Tracker.attribute({
        gender: gender,
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
  return (
    <View>
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
        <Button onPress={() => fireIdentifyEvent()} title="Send by values" />
        <Button
          onPress={() => fireIdentifyWithUserIdEvent()}
          title="Send with userId"
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.header}>Attribute event</Text>
        <TextInput
          onChangeText={(value) => setGender(value)}
          placeholder="Gender"
          value={gender}
        />
        <Button onPress={() => fireAttributeEvent()} title="Send" />
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
    </View>
  );
}

export function CoreComponent() {
  const checkIsOptOut = () => {
    const res = KarteApp.isOptOut;
    Alert.alert('Is opt-out', '' + res, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const userSyncAppendParameter = () => {
    const url = UserSync.appendingQueryParameter('https://karte.io');
    Alert.alert('User sync url', url, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };
  const userSyncScript = () => {
    const script = UserSync.getUserSyncScript();
    Alert.alert('User sync script', script, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };
  return (
    <View>
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
        <Button
          onPress={() => userSyncAppendParameter()}
          title="User sync by param"
        />
        <Button onPress={() => userSyncScript()} title="User sync script" />
      </View>
    </View>
  );
}
