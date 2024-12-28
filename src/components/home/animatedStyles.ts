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
      width: 160,
      height: 160,
      backgroundColor: `rgb(235,238,255)`,
    };
  });

  const containerAnimStyle = useAnimatedStyle(() => ({
    top: -160,
    borderWidth: (HEIGHT_SCR + 160) / 2,
    transform: [
      {scale: interpolate(splashProgress.value, [0, 0.25, 1], [1, 0.8, 8])},
    ],
    borderColor: `white`,
    zIndex: splashProgress.value < 1 ? 1 : 0,
  }));

  return {imageStyle, containerAnimStyle};
};
