import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ChatScreen from './screens/ChatScreen';
import PinCode from './screens/PinCodeScreen';
import HomeScreen from './screens/HomeScreen';
import BankStack from '@screens/Bank/BankStack';
import {commonStyles} from '@utils/commonStyles';
import NFCReader from './screens/NFCReaderScreen';
import AirbnbScreen from './screens/AirbnbScreen';
import TicketScreen from './screens/TicketScreen';
import LotteryScreen from '@screens/LotteryScreen';
import LinePieCharts from './screens/LinePieCharts';
import ShutdownIOS from './screens/ShutdownIOSScreen';
import ParallaxScreen from './screens/ParallaxScreen';
import TogglersScreen from './screens/TogglersScreen';
import DotLoaderScreen from './screens/DotLoaderScreen';
import {ModalProvider} from './providers/ModalProvider';
import GroupStackCharts from './screens/GroupStackCharts';
import DoubleListScreen from './screens/DoubleListScreen';
import GalleryListScreen from './screens/GalleryListScreen';
import ProductListScreen from './screens/ProductListScreen';
import FloatingButton from './screens/FloatingButtonScreen';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawerScreen from './screens/CustomDrawerScreen';
import ValuePickersScreen from './screens/ValuePickersScreen';
import FadeItemListScreen from './screens/FadeItemListScreen';
import TaskCalendarScreen from './screens/TaskCalendarScreen';
import AddButtonMoveScreen from '@screens/AddButtonMoveScreen';
import GestureCounterScreen from '@screens/GestureCounterScreen';
import ProgressLoaderScreen from './screens/ProgressLoaderScreen';
import LikeInteractionScreen from './screens/LikeInteractionScreen';
import VerticalScrollBarScreen from '@screens/VerticalScrollBarScreen';
import ListWithIndicatorScreen from './screens/ListWithIndicatorScreen';
import DrawerInterpolateScreen from './screens/DrawerInterpolateScreen';
import TranslateSearchIOSScreen from './screens/TranslateSearchIOSScreen';
import FloatingActionButtonScreen from '@screens/FloatingActionButtonScreen';
import CircularAnimatedTextScreen from './screens/CircularAnimatedTextScreen';
import ScreenTransitionStack from '@screens/ScreenTransition/ScreenTransitionStack';

export type TStackList = {
  Home: undefined;
  Parallax: undefined;
  ListWithIndicator: undefined;
  DoubleList: undefined;
  GalleryList: undefined;
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
  ValuePickers: undefined;
  LikeInteraction: undefined;
  CircularAnimatedText: undefined;
  Chat: undefined;
  LinePieCharts: undefined;
  GroupStackCharts: undefined;
  TaskCalendar: undefined;
  ScreenTransition: undefined;
  Lottery: undefined;
  VerticalScrollBar: undefined;
  GestureCounter: undefined;
  FloatingActions: undefined;
  AddButtonMove: undefined;
  BankStack: undefined;
};

export type THomeNavigationProps = NativeStackNavigationProp<
  TStackList,
  'Home'
>;
export type THomeScreenProps = NativeStackScreenProps<TStackList, 'Home'>;

const Stack = createNativeStackNavigator<TStackList>();

function App() {
  return (
    <SafeAreaProvider style={commonStyles.flex}>
      <GestureHandlerRootView style={commonStyles.flex}>
        <ModalProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Parallax" component={ParallaxScreen} />
              <Stack.Screen
                name="ListWithIndicator"
                component={ListWithIndicatorScreen}
              />
              <Stack.Screen name="DoubleList" component={DoubleListScreen} />
              <Stack.Screen name="GalleryList" component={GalleryListScreen} />
              <Stack.Screen name="Progress" component={ProgressLoaderScreen} />
              <Stack.Screen name="DotLoader" component={DotLoaderScreen} />
              <Stack.Screen name="Togglers" component={TogglersScreen} />
              <Stack.Screen name="FadeItem" component={FadeItemListScreen} />
              <Stack.Screen
                name="CustomDrawer"
                component={CustomDrawerScreen}
              />
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
                name="ValuePickers"
                component={ValuePickersScreen}
              />
              <Stack.Screen
                name="LikeInteraction"
                component={LikeInteractionScreen}
              />
              <Stack.Screen
                name="CircularAnimatedText"
                component={CircularAnimatedTextScreen}
              />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="LinePieCharts" component={LinePieCharts} />
              <Stack.Screen
                name="GroupStackCharts"
                component={GroupStackCharts}
              />
              <Stack.Screen
                name="TaskCalendar"
                component={TaskCalendarScreen}
              />
              <Stack.Screen
                name="ScreenTransition"
                component={ScreenTransitionStack}
              />
              <Stack.Screen name="Lottery" component={LotteryScreen} />
              <Stack.Screen
                name="VerticalScrollBar"
                component={VerticalScrollBarScreen}
              />
              <Stack.Screen
                name="GestureCounter"
                component={GestureCounterScreen}
              />
              <Stack.Screen
                name="FloatingActions"
                component={FloatingActionButtonScreen}
              />
              <Stack.Screen
                name="AddButtonMove"
                component={AddButtonMoveScreen}
              />
              <Stack.Screen name="BankStack" component={BankStack} />
            </Stack.Navigator>
          </NavigationContainer>
        </ModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
