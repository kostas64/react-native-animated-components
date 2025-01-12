import {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {CIRCLE_SIZE} from './data';
import {TFloatingModalDimensions} from './types';

export const getAnimatedStyles = (progress: SharedValue<number>) => {
  const send = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 0.5, 0.50001, 1],
          [0, 42, -42, 0],
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 0.5, 0.50001, 1],
          [0, -42, 42, 0],
        ),
      },
    ],
  }));

  const close = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 0.35, 0.5, 1],
          [0, 1, 1, 0],
          Extrapolation.CLAMP,
        ),
      },
      {
        rotate: `${interpolate(
          progress.value,
          [0, 0.35, 0.5, 1],
          [0, 360, 360, 0],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  return {
    send,
    close,
  };
};

export const getAnimatedContainerStyles = ({
  dimensions,
  progress,
}: {
  dimensions: TFloatingModalDimensions;
  progress: SharedValue<number>;
}) => {
  const animatedContainer = useAnimatedStyle(() => {
    if (!dimensions.width && !dimensions.height) {
      return {};
    }

    return {
      borderRadius: interpolate(
        progress.value,
        [0, 0.35, 0.5, 1],
        [CIRCLE_SIZE / 2, 24, 24, CIRCLE_SIZE / 2],
      ),
      width: interpolate(
        progress.value,
        [0, 0.35, 0.5, 1],
        [CIRCLE_SIZE, dimensions.width, dimensions.width, CIRCLE_SIZE],
      ),
      height: interpolate(
        progress.value,
        [0, 0.35, 0.5, 1],
        [CIRCLE_SIZE, dimensions.height, dimensions.height, CIRCLE_SIZE],
      ),
      top: interpolate(
        progress.value,
        [0, 0.35, 0.5, 1],
        [0, -dimensions.height - 16, -dimensions.height - 16, 0],
      ),
      left: interpolate(
        progress.value,
        [0, 0.35, 0.5, 1],
        [
          0,
          -dimensions.width + CIRCLE_SIZE,
          -dimensions.width + CIRCLE_SIZE,
          0,
        ],
      ),
    };
  });

  return {
    animatedContainer,
  };
};

export const getAnimatedItemStyles = ({
  progress,
}: {
  progress: SharedValue<number>;
}) => {
  const animatedText = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.35, 0.5, 0.55],
      [0, 1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0.35, 0.5, 0.55],
          [16, 0, 16],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const animatedIcon = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.35, 0.5, 0.55],
      [0, 1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0.35, 0.5, 0.55],
          [-16, 0, -16],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return {animatedText, animatedIcon};
};
