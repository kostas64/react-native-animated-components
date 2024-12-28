import {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {HEIGHT_SCR} from '@utils/device';

export const getAnimatedStyles = (splashProgress: SharedValue<number>) => {
  const imageStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 10000,
      opacity: interpolate(
        splashProgress.value,
        [0, 0.1],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      backgroundColor: `rgb(235,238,255)`,
      width: interpolate(splashProgress.value, [0, 1], [160, HEIGHT_SCR + 80]),
      height: interpolate(splashProgress.value, [0, 1], [160, HEIGHT_SCR + 80]),
    };
  });

  const containerAnimStyle = useAnimatedStyle(() => ({
    borderWidth: (HEIGHT_SCR - 80) / 2,
    top: interpolate(splashProgress.value, [0, 1], [-40, -(HEIGHT_SCR / 2)]),
    borderColor: `white`,
    zIndex: splashProgress.value < 1 ? 10000000000 : 0,
  }));

  return {imageStyle, containerAnimStyle};
};
