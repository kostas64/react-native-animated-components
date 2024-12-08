import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

import ScreenTransitionLesson from './ScreenTransitionLesson';
import ScreenTransitionWelcome from './ScreenTransitionWelcome';
import ScreenTransitionBottomStack from './ScreenTransitionBottomStack';
import ScreenTransitionNotifications from './ScreenTransitionNotifications';

const Stack = createNativeStackNavigator();

export type TStackList = {
  Welcome: undefined;
  Notifications: undefined;
  BottomStack: undefined;
  Lesson: undefined;
};

export type TWelcomeNavigationProps = NativeStackNavigationProp<
  TStackList,
  'Welcome'
>;
export type TWelcomeScreenProps = NativeStackScreenProps<TStackList, 'Welcome'>;

const ScreenTransitionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Welcome" component={ScreenTransitionWelcome} />
      <Stack.Screen
        name="Notifications"
        component={ScreenTransitionNotifications}
      />
      <Stack.Screen name="Lesson" component={ScreenTransitionLesson} />
      <Stack.Screen
        name="BottomStack"
        component={ScreenTransitionBottomStack}
      />
    </Stack.Navigator>
  );
};

export default ScreenTransitionStack;
