import Animated, {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { Colors } from "@utils/colors";

type ArrowCircleProps = {
  progress: SharedValue<number>;
};

const ArrowCircle = ({ progress }: ArrowCircleProps) => {
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            progress.value,
            [0, 1],
            [1, 1.4],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const longStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.6, 0.9],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const shortStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.6, 0.9],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [1.25, 1.5],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Arrow - Long side  */}
      <Animated.View
        pointerEvents={"none"}
        style={[styles.longSize, longStyle]}
      />

      {/* Arrow - Top side  */}
      <Animated.View
        pointerEvents={"none"}
        style={[styles.shortSide, styles.top, shortStyle]}
      />

      {/* Arrow - Bottom side  */}
      <Animated.View
        pointerEvents={"none"}
        style={[styles.shortSide, styles.bottom, shortStyle]}
      />

      <Animated.View pointerEvents={"none"} style={[styles.check, checkStyle]}>
        <FontAwesome5
          //@ts-ignore
          name="check"
          size={24}
          color={Colors.WHITE}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ArrowCircle;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    justifyContent: "center",
    borderRadius: 10000,
    zIndex: 10000,
    backgroundColor: Colors.HARMONY_GREEN,
  },
  longSize: {
    height: 3,
    width: 20,
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.WHITE,
  },
  shortSide: {
    height: 3,
    width: 12,
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.WHITE,
  },
  top: {
    transform: [{ rotate: "45deg" }, { translateY: -6 }],
  },
  bottom: {
    transform: [{ rotate: "-45deg" }, { translateY: 6 }],
  },
  check: {
    alignSelf: "center",
    position: "absolute",
    transform: [{ translateX: -1 }],
  },
});
