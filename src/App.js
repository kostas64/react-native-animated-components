import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ParallaxScreen from './screens/ParallaxScreen';
import ListWithIndiScreen from './screens/ListWithIndiScreen';
import DoubleListScreen from './screens/DoubleListScreen';
import Carousel3DScreen from './screens/Carousel3DScreen';
import ProgressLoaderScreen from './screens/ProgressLoaderScreen';
import DotLoaderScreen from './screens/DotLoaderScreen';
import TogglersScreen from './screens/TogglerIOSScreen';
import ScrollItemListScreen from './screens/ScrollItemListScreen';
import CustomDrawerScreen from './screens/CustomDrawerScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Parallax" component={ParallaxScreen} />
        <Stack.Screen name="ListWithIndi" component={ListWithIndiScreen} />
        <Stack.Screen name="DoubleList" component={DoubleListScreen} />
        <Stack.Screen name="Carousel3D" component={Carousel3DScreen} />
        <Stack.Screen name="Progress" component={ProgressLoaderScreen} />
        <Stack.Screen name="DotLoader" component={DotLoaderScreen} />
        <Stack.Screen name="Togglers" component={TogglersScreen} />
        <Stack.Screen name="ScrollItem" component={ScrollItemListScreen} />
        <Stack.Screen name="CustomDrawer" component={CustomDrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
