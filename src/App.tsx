import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ParallaxScreen from './screens/ParallaxScreen';
import DotLoaderScreen from './screens/DotLoaderScreen';
import TogglersScreen from './screens/TogglerIOSScreen';
import DoubleListScreen from './screens/DoubleListScreen';
import Carousel3DScreen from './screens/Carousel3DScreen';
import {NavigationContainer} from '@react-navigation/native';
import ListWithIndiScreen from './screens/ListWithIndiScreen';
import CustomDrawerScreen from './screens/CustomDrawerScreen';
import ProgressLoaderScreen from './screens/ProgressLoaderScreen';
import ScrollItemListScreen from './screens/ScrollItemListScreen';

type TStackList = {
  Home: undefined;
  Parallax: undefined;
  ListWithIndi: undefined;
  DoubleList: undefined;
  Carousel3D: undefined;
  Progress: undefined;
  DotLoader: undefined;
  Togglers: undefined;
  ScrollItem: undefined;
  CustomDrawer: undefined;
};

export type THomeNavigationProps = NativeStackNavigationProp<
  TStackList,
  'Home'
>;
export type THomeScreenProps = NativeStackScreenProps<TStackList, 'Home'>;

const Stack = createNativeStackNavigator<TStackList>();

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
