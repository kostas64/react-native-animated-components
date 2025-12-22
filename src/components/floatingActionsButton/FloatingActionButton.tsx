import Animated from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { forwardRef, useImperativeHandle } from "react";
import { Circle, Defs, LinearGradient, Stop, Svg } from "react-native-svg";

import { Colors } from "@utils/colors";
import { CIRCLE_SIZE, ICON_SIZE } from "./data";
import { useAnimatedStyles } from "./animatedStyles";
import { TFloatingActionButtonProps } from "./types";

const AnimatedIcon = Animated.createAnimatedComponent(Feather);

export type RefProps = {
  close: () => void;
};

const FloatingActionButton = forwardRef<RefProps, TFloatingActionButtonProps>(
  ({ progress, onPress }, ref) => {
    const { send, close } = useAnimatedStyles(progress);

    useImperativeHandle(ref, () => ({
      close: onPress,
    }));

    return (
      <View onTouchStart={onPress} style={styles.container}>
        <Svg height={`${CIRCLE_SIZE}`} width={`${CIRCLE_SIZE}`}>
          <Defs>
            <LinearGradient id="button" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="40%" stopColor={Colors.FIERY_ROSE} />
              <Stop offset="100%" stopColor={Colors.RASBERRY_PINK} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={`${CIRCLE_SIZE / 2}`}
            cy={`${CIRCLE_SIZE / 2}`}
            r={`${CIRCLE_SIZE / 2}`}
            fill="url(#button)"
          />
        </Svg>
        <AnimatedIcon
          name={"send"}
          size={ICON_SIZE}
          color={"white"}
          style={[send, styles.sendIcon]}
        />
        <AnimatedIcon
          name={"x"}
          size={ICON_SIZE}
          color={"white"}
          style={[close, styles.closeIcon]}
        />
      </View>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    zIndex: 1,
  },
  sendIcon: {
    right: (CIRCLE_SIZE - ICON_SIZE) / 2 + 1,
    top: (CIRCLE_SIZE - ICON_SIZE) / 2 + 2,
    position: "absolute",
  },
  closeIcon: {
    right: (CIRCLE_SIZE - ICON_SIZE) / 2,
    top: (CIRCLE_SIZE - ICON_SIZE) / 2,
    position: "absolute",
  },
});
