import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ScreenTransitionHomework from "./ScreenTransitionHomework";
import ScreenTransitionSubjects from "./ScreenTransitionSubjects";
import SubjectsHeader from "@components/screenTransition/SubjectsHeader";

const Stack = createNativeStackNavigator();

export type TInnerStackList = {
  ScreenTransitionSchedule: undefined;
  ScreenTransitionHomework: undefined;
};

export type TScheduleNavigationProps = NativeStackNavigationProp<
  TInnerStackList,
  "ScreenTransitionSchedule"
>;
export type TScheduleScreenProps = NativeStackScreenProps<
  TInnerStackList,
  "ScreenTransitionSchedule"
>;

const ScreenTransitionScheduleStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="ScreenTransitionSchedule"
        screenOptions={{
          headerShown: true,
          animation: "fade",
          header: () => <SubjectsHeader />,
        }}
      >
        <Stack.Screen
          name="ScreenTransitionSchedule"
          component={ScreenTransitionSubjects}
        />
        <Stack.Screen
          name="ScreenTransitionHomework"
          component={ScreenTransitionHomework}
        />
      </Stack.Navigator>
    </>
  );
};

export default ScreenTransitionScheduleStack;
