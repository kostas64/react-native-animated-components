import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {tabs} from '@components/bank/data';
import Tabbar from '@components/bank/Tabbar';

const Tab = createBottomTabNavigator();

const BankBottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Tabbar {...props} />}>
      {tabs.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BankBottomStack;
