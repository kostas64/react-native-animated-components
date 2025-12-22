import {
  withTiming,
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import React from "react";
import { Rect } from "react-native-svg";
import { Image, Pressable, StyleSheet } from "react-native";

import { Colors } from "@utils/colors";
import CommonGradient from "@components/bank/CommonGradient";
import { ICON_CONTAINER_SIZE } from "@components/bank/constants";
import { AnimatedSvg } from "@components/common/AnimatedComponents";

type TabProps = {
  index: number;
  tab: {
    ImageSource: number;
    screen: string;
  };
  activeTab: SharedValue<number>;
  onItemPress: (index: number) => void;
};

const Tab = ({ index, tab, activeTab, onItemPress }: TabProps) => {
  const opacity = useAnimatedProps(() => ({
    opacity:
      activeTab.value === index
        ? withTiming(1)
        : withTiming(0, { duration: 100 }),
  }));

  return (
    <Pressable
      key={tab.screen}
      onPressOut={() => onItemPress(index)}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.halfOpacity,
      ]}
    >
      <AnimatedSvg
        width={ICON_CONTAINER_SIZE}
        height={ICON_CONTAINER_SIZE}
        animatedProps={opacity}
        style={styles.buttonSvg}
      >
        <CommonGradient id={"tabbarBtn"} />
        <Rect
          width={ICON_CONTAINER_SIZE}
          height={ICON_CONTAINER_SIZE}
          rx={ICON_CONTAINER_SIZE / 2}
          fill={"url(#tabbarBtn)"}
        />
      </AnimatedSvg>

      <Image source={tab.ImageSource} style={styles.icon} />
    </Pressable>
  );
};

export default Tab;

const styles = StyleSheet.create({
  halfOpacity: {
    opacity: 0.5,
  },
  buttonContainer: {
    padding: 18,
    borderRadius: 32,
    backgroundColor: Colors.DARK_CHARCOAL,
  },
  buttonSvg: {
    overflow: "hidden",
    borderRadius: ICON_CONTAINER_SIZE / 2,
    position: "absolute",
    backgroundColor: Colors.WHITE,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.WHITE,
  },
});
