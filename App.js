import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ParallaxScreen from './src/screens/ParallaxScreen';
import ListWithIndiScreen from './src/screens/ListWithIndiScreen';
import DoubleListScreen from './src/screens/DoubleListScreen';
import Carousel3DScreen from './src/screens/Carousel3DScreen';
import ProgressLoaderScreen from './src/screens/ProgressLoaderScreen';
import DotLoaderScreen from './src/screens/DotLoaderScreen';
import TogglersScreen from './src/screens/TogglerIOSScreen';
import ScrollItemListScreen from './src/screens/ScrollItemListScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
