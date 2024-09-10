import React from 'react';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ChatScreen from './screens/ChatScreen';
import PinCode from './screens/PinCodeScreen';
import HomeScreen from './screens/HomeScreen';
import NFCReader from './screens/NFCReaderScreen';
import AirbnbScreen from './screens/AirbnbScreen';
import TicketScreen from './screens/TicketScreen';
import ShutdownIOS from './screens/ShutdownIOSScreen';
import ParallaxScreen from './screens/ParallaxScreen';
import LineChartScreen from './screens/LineChartScreen';
import DotLoaderScreen from './screens/DotLoaderScreen';
import TogglersScreen from './screens/TogglersScreen';
import DoubleListScreen from './screens/DoubleListScreen';
import Carousel3DScreen from './screens/Carousel3DScreen';
import ProductListScreen from './screens/ProductListScreen';
import FloatingButton from './screens/FloatingButtonScreen';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawerScreen from './screens/CustomDrawerScreen';
import ValuePickersScreen from './screens/ValuePickersScreen';
import FadeItemListScreen from './screens/FadeItemListScreen';
import ProgressLoaderScreen from './screens/ProgressLoaderScreen';
import LikeInteractionScreen from './screens/LikeInteractionScreen';
import ListWithIndicatorScreen from './screens/ListWithIndicatorScreen';
import DrawerInterpolateScreen from './screens/DrawerInterpolateScreen';
import TranslateSearchIOSScreen from './screens/TranslateSearchIOSScreen';
import CircularProgressBarScreen from './screens/CircularProgressBarScreen';
import CircularAnimatedTextScreen from './screens/CircularAnimatedTextScreen';

type TStackList = {
  Home: undefined;
  Parallax: undefined;
  ListWithIndicator: undefined;
  DoubleList: undefined;
  Carousel3D: undefined;
  Progress: undefined;
  DotLoader: undefined;
  Togglers: undefined;
  FadeItem: undefined;
  CustomDrawer: undefined;
  ProductList: undefined;
  DrawerInterpolate: undefined;
  PinCode: undefined;
  Floating: undefined;
  Airbnb: undefined;
  Ticket: undefined;
  ShutdownIOS: undefined;
  NFCReader: undefined;
  TranslateSearchIOS: undefined;
  CircularProgressBar: undefined;
  ValuePickers: undefined;
  LikeInteraction: undefined;
  CircularAnimatedText: undefined;
  Chat: undefined;
  LineChart: undefined;
};

export type THomeNavigationProps = NativeStackNavigationProp<
  TStackList,
  'Home'
>;
export type THomeScreenProps = NativeStackScreenProps<TStackList, 'Home'>;

const Stack = createNativeStackNavigator<TStackList>();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Parallax" component={ParallaxScreen} />
          <Stack.Screen
            name="ListWithIndicator"
            component={ListWithIndicatorScreen}
          />
          <Stack.Screen name="DoubleList" component={DoubleListScreen} />
          <Stack.Screen name="Carousel3D" component={Carousel3DScreen} />
          <Stack.Screen name="Progress" component={ProgressLoaderScreen} />
          <Stack.Screen name="DotLoader" component={DotLoaderScreen} />
          <Stack.Screen name="Togglers" component={TogglersScreen} />
          <Stack.Screen name="FadeItem" component={FadeItemListScreen} />
          <Stack.Screen name="CustomDrawer" component={CustomDrawerScreen} />
          <Stack.Screen
            name="DrawerInterpolate"
            component={DrawerInterpolateScreen}
          />
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="PinCode" component={PinCode} />
          <Stack.Screen name="Floating" component={FloatingButton} />
          <Stack.Screen name="Airbnb" component={AirbnbScreen} />
          <Stack.Screen name="Ticket" component={TicketScreen} />
          <Stack.Screen name="ShutdownIOS" component={ShutdownIOS} />
          <Stack.Screen name="NFCReader" component={NFCReader} />
          <Stack.Screen
            name="TranslateSearchIOS"
            component={TranslateSearchIOSScreen}
          />
          <Stack.Screen
            name="CircularProgressBar"
            component={CircularProgressBarScreen}
          />
          <Stack.Screen name="ValuePickers" component={ValuePickersScreen} />
          <Stack.Screen
            name="LikeInteraction"
            component={LikeInteractionScreen}
          />
          <Stack.Screen
            name="CircularAnimatedText"
            component={CircularAnimatedTextScreen}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="LineChart" component={LineChartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
