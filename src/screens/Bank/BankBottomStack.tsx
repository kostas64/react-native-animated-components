import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import BankHome from "./BankHome";
import BankStocks from "./BankStocks";
import BankWallet from "./BankWallet";
import BankSettings from "./BankSettings";
import Tabbar from "@components/bank/Tabbar";
import { ToastProvider } from "@providers/ToastProvider";

const Tab = createBottomTabNavigator();

const MyTabbar = (props: BottomTabBarProps) => <Tabbar {...props} />;

export type TBankInnerStackList = {
  BankSettings: undefined;
};

export type TBankSettingsNavigationProps = NativeStackNavigationProp<
  TBankInnerStackList,
  "BankSettings"
>;
export type TBankSettingsScreenProps = NativeStackScreenProps<
  TBankInnerStackList,
  "BankSettings"
>;

const BankBottomStack = () => {
  return (
    <ToastProvider>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={MyTabbar}>
        <Tab.Screen name="BankHome" component={BankHome} />
        <Tab.Screen name="BankStocks" component={BankStocks} />
        <Tab.Screen name="BankWallet" component={BankWallet} />
        <Tab.Screen name="BankSettings" component={BankSettings} />
      </Tab.Navigator>
    </ToastProvider>
  );
};

export default BankBottomStack;
