import { View, Easing, Animated, Pressable, StyleSheet } from "react-native";
import React from "react";

import { SIZE } from "./constants";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { SM_FONT_UPSCALE_FACTOR } from "@utils/device";

const ToggleWithLabel = () => {
  const animRef = React.useRef(new Animated.Value(0)).current;
  const [togglerActive, setTogglerActive] = React.useState(false);

  const animate = () => setTogglerActive((cur) => !cur);

  React.useEffect(() => {
    Animated.timing(animRef, {
      toValue: togglerActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animRef, togglerActive]);

  return (
    <Pressable onPress={animate}>
      <View
        style={[
          styles.container,
          !togglerActive ? styles.whiteBg : styles.blackBg,
        ]}
      >
        <Animated.View
          style={[
            styles.background,
            { transform: [{ translateX: animRef }] },
            !togglerActive ? styles.blackBg : styles.whiteBg,
          ]}
        />
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[
            styles.label,
            { right: !togglerActive ? SIZE / 8 : SIZE / 2 + 4 },
            togglerActive ? styles.white : styles.black,
          ]}
        >{`${togglerActive ? "ON" : "OFF"}`}</Text>
      </View>
    </Pressable>
  );
};

export default ToggleWithLabel;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE / 2,
    borderRadius: SIZE / 4,
    justifyContent: "center",
    borderColor: Colors.BLACK,
    borderWidth: 2,
    paddingHorizontal: SIZE / 24,
  },
  background: {
    width: SIZE / 2 - 10,
    height: SIZE / 2 - 10,
    borderRadius: (SIZE / 2 - 10) / 2,
  },
  label: {
    position: "absolute",
    fontFamily: typography.bold,
    fontSize: SIZE / 7,
  },
  whiteBg: {
    backgroundColor: Colors.WHITE,
  },
  blackBg: {
    backgroundColor: Colors.BLACK,
  },
  white: {
    color: Colors.WHITE,
  },
  black: {
    color: Colors.BLACK,
  },
});
