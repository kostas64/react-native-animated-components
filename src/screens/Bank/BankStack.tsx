import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import BankWelcome from './BankWelcome';
import BankBottomStack from './BankBottomStack';

const Stack = createNativeStackNavigator();

export type TBankInnerStackList = {
  BankWelcome: undefined;
  BankBottomStack: undefined;
};

export type TBankNavigationProps = NativeStackNavigationProp<
  TBankInnerStackList,
  'BankWelcome'
>;
export type TBankScreenProps = NativeStackScreenProps<
  TBankInnerStackList,
  'BankWelcome'
>;

const BankStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BankWelcome"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="BankWelcome" component={BankWelcome} />
        <Stack.Screen name="BankBottomStack" component={BankBottomStack} />
      </Stack.Navigator>
    </>
  );
};

export default BankStack;
