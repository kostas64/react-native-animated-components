import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BankHome from './BankHome';

const Stack = createNativeStackNavigator();

const BankStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BankHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BankHome" component={BankHome} />
    </Stack.Navigator>
  );
};

export default BankStack;
