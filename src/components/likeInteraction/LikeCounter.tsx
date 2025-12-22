import Animated, {
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { TLikeCounter } from "./types";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { SM_FONT_UPSCALE_FACTOR } from "@utils/device";

const AnimIcon = Animated.createAnimatedComponent(AntDesign);

const LikeCounter = ({ counter, liked, onPress }: TLikeCounter) => {
  const animate = useSharedValue(0);
  const first = React.useRef(0);

  const style = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(animate.value, [0, 80, 144], [1, 1.5, 1]) },
    ],
    color: interpolateColor(animate.value, [0, 144], ["#a1a1a1", "#f85230"]),
  }));

  React.useEffect(() => {
    const toValue = liked ? 144 : 0;

    if (first.current === 0 && !liked) {
      first.current = 1;
    } else if (first.current === 0 && liked) {
      animate.value = withTiming(toValue, { duration: 1 });
      first.current = 1;
    } else {
      animate.value = withSpring(toValue, {
        damping: 12,
        stiffness: 120,
        mass: 0.8,
        energyThreshold: 1e-7,
      });
    }
  }, [liked, animate]);

  return (
    <View onTouchStart={onPress} style={styles.counterContainer}>
      <AnimIcon name="heart" size={20} color={"#a1a1a1"} style={style} />
      <Text
        style={styles.counter}
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
      >
        {counter}
      </Text>
    </View>
  );
};

export default LikeCounter;

const styles = StyleSheet.create({
  counterContainer: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: Colors.BRIGHT_GRAY,
  },
  counter: {
    marginLeft: 10,
    color: Colors.GRANITE_GRAY,
    fontFamily: typography.regular,
  },
});
