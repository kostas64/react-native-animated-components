import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ScreenTransitionHomework from './ScreenTransitionHomework';
import ScreenTransitionSubjects from './ScreenTransitionSubjects';

const Stack = createNativeStackNavigator();

const ScreenTransitionScheduleStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ScreenTransitionSchedule"
        component={ScreenTransitionSubjects}
      />
      <Stack.Screen
        name="ScreenTransitionHomework"
        component={ScreenTransitionHomework}
      />
    </Stack.Navigator>
  );
};

export default ScreenTransitionScheduleStack;
