import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { THeader } from "./types";
import Calendar from "./Calendar";
import MenuIcon from "./MenuIcon";
import { isIOS } from "@utils/device";
import { Colors } from "@utils/colors";
import MonthPicker from "./MonthPicker";
import { ANIMATION_DUR } from "./constants";
import MonthListModal from "./MonthListModal";
import { useModalContext } from "@providers/ModalProvider";

const Header = ({ month, selectedDate, onSelecteMonth }: THeader) => {
  const insets = useSafeAreaInsets();
  const { setModalInfo } = useModalContext();

  const paddingTop = insets.top > 32 ? insets.top : 32;

  const entering = FadeInDown.delay(isIOS ? 50 : 100).duration(ANIMATION_DUR);

  const onPressMonthPicker = useCallback(() => {
    setModalInfo({
      content: (
        <View style={styles.modalContainer}>
          <MonthListModal
            month={month}
            setMonth={(selectedMonth) => {
              onSelecteMonth(selectedMonth);
            }}
          />
        </View>
      ),
      modalHeight: 250,
      lineStyle: styles.linStyle,
      contentContainerStyle: styles.modalInnerContainer,
    });
  }, [month, onSelecteMonth, setModalInfo]);

  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.container, { paddingTop }]}
    >
      <Animated.View entering={entering}>
        <MenuIcon />
        <MonthPicker month={month} onPress={onPressMonthPicker} />
        <Calendar month={month} selectedDate={selectedDate} />
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CHINESE_BLACK,
    paddingBottom: 16,
    borderRadius: 32,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.CHINESE_BLACK,
    borderRadius: 0,
    elevation: 10,
  },
  modalInnerContainer: {
    borderRadius: 0,
    backgroundColor: Colors.CHINESE_BLACK,
    borderWidth: isIOS ? 0 : 2,
    borderTopColor: Colors.WHITE,
    shadowColor: Colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  linStyle: {
    marginTop: 16,
    backgroundColor: Colors.WHITE,
  },
});
