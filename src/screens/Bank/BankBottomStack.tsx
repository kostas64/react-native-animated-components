import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {tabs} from '@components/bank/data';
import Tabbar from '@components/bank/Tabbar';

const Tab = createBottomTabNavigator();

const MyTabbar = (props: BottomTabBarProps) => <Tabbar {...props} />;

const BankBottomStack = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={MyTabbar}>
      {tabs.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BankBottomStack;
