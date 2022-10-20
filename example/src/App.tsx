import * as React from 'react';
import { Button, ScrollView } from 'react-native';

import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { CoreComponent, TrackerComponent } from './components/Core';
import InAppMessagingComponent from './components/InAppMessaging';
import VariablesComponent from './components/Variables';
import VisualTrackingComponent from './components/VisualTracking';
import { WebViewComponent } from './components/WebView';
import NotificationUseEffect from './Notification';
import { VisualTracking } from '@react-native-karte/visual-tracking';
import type { StackNavigationProp } from '@react-navigation/stack';

function AllScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TrackerComponent />
        <InAppMessagingComponent />
        <CoreComponent />
        <VariablesComponent />
        <VisualTrackingComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

type CoreParamList = { 'Core.Main': undefined; 'Core.WebView': undefined };
type CoreProp = StackNavigationProp<CoreParamList>;
const CoreStack = createNativeStackNavigator();
function CoreScreen() {
  return (
    <CoreStack.Navigator screenOptions={{ animation: 'none' }}>
      <CoreStack.Screen
        name="Core.Main"
        component={CoreMainScreen}
        options={{ headerShown: false }}
      />
      <CoreStack.Screen name="Core.WebView" component={CoreWebViewScreen} />
    </CoreStack.Navigator>
  );
}
function CoreMainScreen() {
  const navigation = useNavigation<CoreProp>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TrackerComponent />
        <CoreComponent />
        <Button
          onPress={() => navigation.push('Core.WebView')}
          title="WebView test"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
function CoreWebViewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewComponent />
    </SafeAreaView>
  );
}
function InAppMessagingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <InAppMessagingComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
function VariablesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <VariablesComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
function VisualTrackingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <VisualTrackingComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  React.useEffect(() => {
    NotificationUseEffect();
  }, []);
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef<string>();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current =
            navigationRef.current?.getCurrentRoute()?.name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            // ref: https://reactnavigation.org/docs/screen-tracking/
            VisualTracking.view('onStateChange', currentRouteName);
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <Tab.Navigator
          initialRouteName="All"
          screenOptions={() => ({
            tabBarActiveTintColor: '#e91e63',
          })}
        >
          <Tab.Screen
            name="All"
            component={AllScreen}
            options={{
              tabBarLabel: 'All',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Core"
            component={CoreScreen}
            options={{
              tabBarLabel: 'Core',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="heart"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="IAM"
            component={InAppMessagingScreen}
            options={{
              tabBarLabel: 'IAM',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="message-bulleted"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Vars"
            component={VariablesScreen}
            options={{
              tabBarLabel: 'Vars',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="variable"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="VT"
            component={VisualTrackingScreen}
            options={{
              tabBarLabel: 'VT',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="cellphone-link"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
