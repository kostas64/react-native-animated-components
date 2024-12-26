import {
  interpolate,
  SharedValue,
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {HEIGHT_SCR} from '@utils/device';

export const getAnimatedStyles = (splashProgress: SharedValue<number>) => {
  const imageStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 78,
      opacity: interpolate(
        splashProgress.value,
        [0.5, 0.9],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      backgroundColor: interpolateColor(
        splashProgress.value,
        [0, 1],
        [`rgb(235,238,255)`, `rgb(255,255,255)`],
      ),
      width: interpolate(
        splashProgress.value,
        [0.9, 1],
        [160, 0],
        Extrapolation.CLAMP,
      ),
      height: interpolate(
        splashProgress.value,
        [0.9, 1],
        [160, 0],
        Extrapolation.CLAMP,
      ),
    };
  }, []);

  const containerAnimStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(
      splashProgress.value,
      [0, 1],
      [(HEIGHT_SCR - 160) / 2 + 40, 0],
    ),
    top: interpolate(
      splashProgress.value,
      [0, 1],
      [(HEIGHT_SCR - HEIGHT_SCR - 80) / 2, (HEIGHT_SCR - 160) / 2],
    ),
    borderColor: `rgba(255,255,255,${interpolate(
      splashProgress.value,
      [0.9, 1],
      [1, 0],
      Extrapolation.CLAMP,
    )})`,
    backgroundColor: 'white',
    opacity: interpolate(
      splashProgress.value,
      [0.9, 1],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          splashProgress.value,
          [0.9, 1],
          [0, 80],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return {imageStyle, containerAnimStyle};
};
