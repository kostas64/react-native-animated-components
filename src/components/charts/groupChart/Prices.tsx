import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {COLORS} from './data';
import {TPrices} from './types';
import {typography} from '@utils/typography';
import {SM_FONT_UPSCALE_FACTOR} from '@utils/device';
import {FADE_IN_DUR, FADE_OUT_DUR} from './constants';

const Prices = ({income, expenses}: TPrices) => {
  const animation = useSharedValue(0);
  const [localState, setLocalState] = React.useState<TPrices>({
    income: undefined,
    expenses: undefined,
  });

  const textStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
  }));

  useEffect(() => {
    if (!!income || !!expenses) {
      if (animation.value === 0) {
        setLocalState({income, expenses});
        animation.value = withTiming(1, {duration: FADE_IN_DUR});
      } else {
        animation.value = withTiming(0, {duration: FADE_OUT_DUR}, finished => {
          if (finished) {
            runOnJS(setLocalState)({income, expenses});
            animation.value = withTiming(1, {duration: FADE_IN_DUR});
          }
        });
      }
    }
  }, [income]);

  return (
    <>
      <Animated.Text
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
        style={[styles.price, {color: COLORS.income}, textStyle]}>{`${
        localState.income ? '$' : ''
      }${localState.income ?? ''}`}</Animated.Text>
      <Animated.Text
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
        style={[styles.price, {color: COLORS.expenses}, textStyle]}>{`${
        localState.expenses ? '$' : ''
      }${localState.expenses ?? ''}`}</Animated.Text>
    </>
  );
};

export default Prices;

const styles = StyleSheet.create({
  price: {
    height: 24,
    fontSize: 20,
    fontFamily: typography.semiBold,
  },
});
