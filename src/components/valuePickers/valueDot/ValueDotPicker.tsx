import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { TValueRangePicker } from "./types";

const ValueDotPicker = ({
  range,
  unit,
  value,
  setValue,
}: TValueRangePicker) => {
  const ctxY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [dotValue, setDotValue] = React.useState(value);

  const values = new Array(range[1] - range[0] + 1)
    .fill(0)
    .map((_, i) => i + range[0]);

  const panGest = Gesture.Pan()
    .onBegin(() => {
      ctxY.value = translateY.value;
    })
    .onChange((e) => {
      if (
        ctxY.value + e.translationY > -2 &&
        ctxY.value + e.translationY < 114
      ) {
        const step = 114 / values.length;
        const index = Math.floor(
          (ctxY.value + e.translationY) / step <= 0
            ? 0
            : (ctxY.value + e.translationY) / step
        );

        if (values[index] !== value) {
          scheduleOnRN(setDotValue, values[index]);
        }

        translateY.value = withSpring(ctxY.value + e.translationY, {
          damping: 17,
          stiffness: 100,
          mass: 0.8,
          energyThreshold: 1e-7,
        });
      }
    })
    .onEnd(() => {
      scheduleOnRN(setValue, dotValue);
    });

  const pressGest = Gesture.Tap()
    .onStart((e) => {
      if (e.y > 54 && e.y < 174) {
        const step = 120 / values.length;
        const index = Math.floor((e.y - 54) / step);

        scheduleOnRN(setDotValue, values[index]);

        translateY.value = withSpring(step * index, {
          damping: 17,
        });
      }
    })
    .onEnd(() => {
      scheduleOnRN(setValue, dotValue);
    });

  const dotPickerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const composedGestures = Gesture.Simultaneous(panGest, pressGest);

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{`${dotValue}${unit}`}</Text>
      <View>
        <View style={styles.line} />
        <Animated.View style={[dotPickerStyle, styles.dot]} />
        <GestureDetector gesture={composedGestures}>
          <Animated.View style={styles.gestureTransparentBox} />
        </GestureDetector>
      </View>
    </View>
  );
};

export default React.memo(ValueDotPicker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  value: {
    marginBottom: 24,
    color: Colors.WHITE,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  line: {
    width: 2,
    height: 112,
    backgroundColor: Colors.OUTER_SPACE,
    alignSelf: "center",
  },
  dot: {
    top: -9,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.WHITE,
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: Colors.CHINESE_BLACK,
  },
  gestureTransparentBox: {
    top: -56,
    width: 40,
    height: 186,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: Colors.TRANSPARENT,
  },
});
