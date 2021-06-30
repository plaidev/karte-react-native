import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { VisualTracking } from '@react-native-karte/visual-tracking';
import { styles } from '../styles';

export default function VisualTrackingComponent() {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.header}>Visual tracking</Text>
      <Button
        onPress={() =>
          VisualTracking.view('testView', 'actionId', 'targetText')
        }
        title="View"
      />
    </View>
  );
}
