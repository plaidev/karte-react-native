import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Variables } from '@react-native-karte/variables';
import { styles } from '../styles';

export function NotificationUseEffect() {}

export default function VariablesComponent() {
  const [string, setString] = React.useState<string | undefined>();
  const [integer, setInteger] = React.useState<number | undefined>();
  const [double, setDouble] = React.useState<number | undefined>();
  const [bool, setBool] = React.useState<boolean | undefined>();
  const [array, setArray] = React.useState<Array<any> | undefined>();
  const [object, setObject] = React.useState<object | undefined>();

  React.useEffect(() => {
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
  );
}
