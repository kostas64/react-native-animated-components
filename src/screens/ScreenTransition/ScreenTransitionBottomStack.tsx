import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Tabbar from '@components/screenTransition/Tabbar';
import ScreenTransitionHome from './ScreenTransitionHome';
import ScreenTransitionSchedule from './ScreenTransitionSchedule';
import ScreenTransitionScheduleStack from './ScreenTransitionScheduleStack';

const Tab = createBottomTabNavigator();

const MyTabbar = (props: BottomTabBarProps) => <Tabbar {...props} />;

const ScreenTransitionBottomStack = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={MyTabbar}>
      <Tab.Screen name="Home" component={ScreenTransitionHome} />
      <Tab.Screen name="Schedule" component={ScreenTransitionSchedule} />
      <Tab.Screen name="Subjects" component={ScreenTransitionScheduleStack} />
    </Tab.Navigator>
  );
};

export default ScreenTransitionBottomStack;
