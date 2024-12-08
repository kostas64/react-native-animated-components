import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tabbar from '../../components/screenTransition/Tabbar';
import ScreenTransitionHome from './ScreenTransitionHome';
import ScreenTransitionSchedule from './ScreenTransitionSchedule';
import ScreenTransitionScheduleStack from './ScreenTransitionScheduleStack';

const Tab = createBottomTabNavigator();

const ScreenTransitionBottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Tabbar {...props} />}>
      <Tab.Screen name="Home" component={ScreenTransitionHome} />
      <Tab.Screen name="Schedule" component={ScreenTransitionSchedule} />
      <Tab.Screen name="Subjects" component={ScreenTransitionScheduleStack} />
    </Tab.Navigator>
  );
};

export default ScreenTransitionBottomStack;
