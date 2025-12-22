import Animated, {
  withDelay,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";

import { WIDTH } from "@utils/device";
import { FadeInTransitionProps } from "./types";

const FadeInTransition = ({
  index = 0,
  children,
  direction,
  animate,
  containerStyle,
}: FadeInTransitionProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(
        index * 75,
        withSpring(1, {
          damping: 80,
          stiffness: 200,
          mass: 0.8,
          energyThreshold: 1e-7,
        })
      );
    } else {
      progress.value = 0;
    }
  }, [animate, index, progress]);

  const style = useAnimatedStyle(() => {
    //Direction top scale
    if (direction === "top-scale") {
      return {
        opacity: progress.value,
        transform: [
          { translateY: interpolate(progress.value, [0, 1], [75, 0]) },
          { scale: interpolate(progress.value, [0, 1], [1.25, 1]) },
        ],
      };
    }

    //Direction top left
    if (direction === "top-left") {
      return {
        opacity: progress.value,
        transform: [
          { translateY: interpolate(progress.value, [0, 1], [75, 0]) },
          { translateX: interpolate(progress.value, [0, 1], [25, 0]) },
          { scale: interpolate(progress.value, [0, 1], [1.1, 1]) },
        ],
      };
    }

    //Direction top right
    if (direction === "top-right") {
      return {
        opacity: progress.value,
        transform: [
          { translateY: interpolate(progress.value, [0, 1], [75, 0]) },
          { translateX: interpolate(progress.value, [0, 1], [-25, 0]) },
          { scale: interpolate(progress.value, [0, 1], [1.1, 1]) },
        ],
      };
    }

    //Direction top
    if (direction === "top") {
      return {
        opacity: progress.value,
        transform: [
          { translateY: interpolate(progress.value, [0, 1], [75, 0]) },
        ],
      };
    }

    //Direction left
    if (direction === "left") {
      return {
        opacity: progress.value,
        transform: [
          { translateX: interpolate(progress.value, [0, 1], [WIDTH / 3.5, 0]) },
        ],
      };
    }

    //Just fade
    return {
      opacity: progress.value,
    };
  });

  return (
    <Animated.View style={[containerStyle, style]}>{children}</Animated.View>
  );
};

export default FadeInTransition;
