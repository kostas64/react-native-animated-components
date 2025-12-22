import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { SIZE } from "./constants";
import { Colors } from "@utils/colors";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

const NativeIOSToggle = ({ withTheme = false }: { withTheme?: boolean }) => {
  const [togglerIOSActive, setTogglerIOSActive] = React.useState(false);

  const animateIOS = () => setTogglerIOSActive((cur) => !cur);

  const animIOSRef = useSharedValue(0);
  const animIOSDisabledRef = useSharedValue(1);

  const container = useAnimatedStyle(() => ({
    transform: [{ translateX: animIOSRef.value }],
  }));

  const opacityLightMode = useAnimatedStyle(() => ({
    opacity: animIOSDisabledRef.value,
  }));

  const opacityDarkMode = useAnimatedStyle(() => ({
    opacity: 1 - animIOSDisabledRef.value,
  }));

  React.useEffect(() => {
    animIOSRef.value = withTiming(togglerIOSActive ? SIZE / 2 - 2 : 0, {
      duration: 200,
      easing: Easing.linear,
    });
    animIOSDisabledRef.value = withTiming(togglerIOSActive ? 1 : 0, {
      duration: 200,
      easing: Easing.linear,
    });
  }, [togglerIOSActive, animIOSDisabledRef, animIOSRef]);

  return (
    <Pressable onPress={animateIOS}>
      <View
        style={[
          styles.container,
          !togglerIOSActive ? styles.lowOpacityBlack : styles.green,
        ]}
      >
        <Animated.View style={[styles.dot, container]}>
          {withTheme && (
            <>
              <AnimatedIcon
                color={"#4cda63"}
                name="light-mode"
                size={24}
                style={[opacityLightMode, styles.absoluteCenter]}
              />
              <AnimatedIcon
                color={"#d1d1d1"}
                name="dark-mode"
                size={24}
                style={[opacityDarkMode, styles.absoluteCenter]}
              />
            </>
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default NativeIOSToggle;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE / 2,
    borderRadius: SIZE / 4,
    justifyContent: "center",
    paddingHorizontal: SIZE / 30,
  },
  dot: {
    width: SIZE / 2 - 4,
    height: SIZE / 2 - 4,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    borderRadius: (SIZE / 2 - 4) / 2,
  },
  absoluteCenter: {
    position: "absolute",
    alignSelf: "center",
  },
  green: {
    backgroundColor: Colors.UFO_GREEN,
  },
  lowOpacityBlack: {
    backgroundColor: Colors.POINT_ONE_BLACK,
  },
});
