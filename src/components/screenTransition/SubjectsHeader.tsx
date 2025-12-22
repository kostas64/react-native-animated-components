import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  TInnerStackList,
  TScheduleNavigationProps,
} from "@screens/ScreenTransition/ScreenTransitionScheduleStack";
import { isIOS } from "@utils/device";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { AnimatedPressable } from "@components/common/AnimatedComponents";

const TABS = [
  {
    label: "Subjects",
    screen: "ScreenTransitionSchedule",
  },
  {
    label: "Homework",
    screen: "ScreenTransitionHomework",
  },
];

const SubjectsHeader = () => {
  const navigation = useNavigation<TScheduleNavigationProps>();
  const insets = useSafeAreaInsets();

  const navState = navigation.getState();
  const name = navState?.routes?.[navState.index].name;

  const paddingTop =
    insets.top > 24 ? (isIOS ? insets.top : insets.top + 12) : 32;

  return (
    <View style={styles.whiteBg}>
      <View style={[styles.container, { paddingTop }]}>
        {TABS.map((tab, index) => (
          <AnimatedPressable
            key={`tab-${index}`}
            style={styles.tabContainer}
            onPress={() =>
              navigation.replace(tab.screen as keyof TInnerStackList)
            }
          >
            <Text style={[styles.tab, tab.screen === name && styles.black]}>
              {tab.label}
            </Text>
          </AnimatedPressable>
        ))}
      </View>
    </View>
  );
};

export default SubjectsHeader;

const styles = StyleSheet.create({
  whiteBg: {
    backgroundColor: Colors.WHITE,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
  },
  tabContainer: {
    width: "50%",
  },
  tab: {
    paddingVertical: 4,
    textAlign: "center",
    fontSize: 20,
    color: Colors.QUICK_SILVER,
    fontFamily: typography.semiBold,
  },
  black: {
    color: Colors.BLACK,
  },
});
