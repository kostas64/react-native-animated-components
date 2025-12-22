import { Animated, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@utils/colors";
import { TAnimatedIcon } from "./types";

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const AnimatedIcon = ({ onOpenDrawer, opacity, translateX }: TAnimatedIcon) => {
  const insets = useSafeAreaInsets();

  return (
    <AnimatedAntDesign
      size={32}
      color={Colors.RAISIN_BLACK}
      name="menu-fold"
      onPress={onOpenDrawer}
      style={[
        styles.icon,
        { opacity, top: insets.top + 16, transform: [{ translateX }] },
      ]}
    />
  );
};

export default AnimatedIcon;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 30,
  },
});
