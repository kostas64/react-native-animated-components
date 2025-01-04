import {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import {AnimatedStyles} from './types';

const getAnimatedStyles = ({
  translateY,
  scrollOffset,
  indicatorOpacity,
  progressIndicator,
  contentH,
  initialLayoutH,
}: AnimatedStyles) => {
  const insets = useSafeAreaInsets();

  const marginTop = insets.top > 0 ? insets.top : 32;
  const marginBottom = insets.bottom > 0 ? insets.bottom : 32;

  const indicator = useAnimatedStyle(() => {
    translateY.value = interpolate(
      scrollOffset.value,
      [
        -250,
        0,
        contentH.value - initialLayoutH.value,
        contentH.value - initialLayoutH.value + 250,
      ],
      [
        0,
        0,
        initialLayoutH.value - marginTop - marginBottom - (isIOS ? 72 : 84),
        initialLayoutH.value -
          marginTop -
          marginBottom -
          (isIOS ? 72 : 84) +
          23,
      ],
    );

    const translateX = interpolate(
      progressIndicator.value,
      [0, 1],
      [0, -56],
      Extrapolation.CLAMP,
    );

    return {
      top: 72,
      opacity: indicatorOpacity.value,
      height: interpolate(
        scrollOffset.value,
        [
          -250,
          0,
          contentH.value - initialLayoutH.value,
          contentH.value - initialLayoutH.value + 250,
        ],
        [21, 42, 42, 21],
        Extrapolation.CLAMP,
      ),
      transform: [{translateY: translateY.value}, {translateX}],
    };
  });

  return {indicator};
};

export default getAnimatedStyles;
