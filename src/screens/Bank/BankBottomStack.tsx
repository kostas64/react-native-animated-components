import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {tabs} from '@components/bank/data';
import Tabbar from '@components/bank/Tabbar';
import {ToastProvider} from '@providers/ToastProvider';

const Tab = createBottomTabNavigator();

const MyTabbar = (props: BottomTabBarProps) => <Tabbar {...props} />;

export type TBankInnerStackList = {
  BankSettings: undefined;
};

export type TBankSettingsNavigationProps = NativeStackNavigationProp<
  TBankInnerStackList,
  'BankSettings'
>;
export type TBankSettingsScreenProps = NativeStackScreenProps<
  TBankInnerStackList,
  'BankSettings'
>;

const BankBottomStack = () => {
  return (
    <ToastProvider>
      <Tab.Navigator screenOptions={{headerShown: false}} tabBar={MyTabbar}>
        {tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    </ToastProvider>
  );
};

export default BankBottomStack;
