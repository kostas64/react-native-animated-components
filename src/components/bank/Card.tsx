import Animated, {
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
  withSequence,
  Extrapolation,
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, {LinearGradient, Rect, Stop} from 'react-native-svg';

import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_BODY_HEIGHT,
  CARD_FOOTER_HEIGHT,
} from './constants';
import {
  isIOS,
  SM_FONT_UPSCALE_FACTOR,
  XSM_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import {CardProps} from './types';
import Text from '@components/Text';
import {typography} from '@utils/typography';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const Card = ({
  style,
  delay,
  cardNumber,
  stopColors,
  cardholderName,
  expirationDate,
}: CardProps) => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    x2: `${interpolate(
      progress.value,
      [0, 1],
      [30, 50],
      Extrapolation.CLAMP,
    )}%`,
  }));

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(1, {duration: 1500})),
        withTiming(0, {duration: 1500}),
      ),
      -1,
    );
  }, []);

  return (
    <View style={[styles.cardContainer, style]}>
      <Svg
        height={CARD_BODY_HEIGHT}
        width={CARD_WIDTH}
        style={styles.whiteBackground}>
        <Rect
          x="0"
          y="0"
          width={CARD_WIDTH}
          height={CARD_BODY_HEIGHT}
          fill="url(#gradient)"
        />
        <AnimatedGradient
          id="gradient"
          x1="40%"
          y1="0%"
          y2="90%"
          animatedProps={animatedProps}>
          <Stop offset="0%" stopColor={stopColors?.[0]} stopOpacity="0.8" />
          <Stop offset="50%" stopColor={stopColors?.[1]} stopOpacity="1" />
          <Stop offset="100%" stopColor={stopColors?.[2]} stopOpacity="0.8" />
        </AnimatedGradient>
        <View style={styles.cardBody}>
          <FontAwesome name="bank" size={26} color={'white'} />
          <Text
            style={styles.cardNumber}
            maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
            {cardNumber}
          </Text>
        </View>
      </Svg>
      <Svg height={CARD_FOOTER_HEIGHT} width={CARD_WIDTH}>
        <Rect
          x="0"
          y="0"
          width={CARD_WIDTH}
          height={CARD_FOOTER_HEIGHT}
          fill="url(#gradient)"
        />
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#505050" stopOpacity="1" />
          <Stop offset="50%" stopColor="#141214" stopOpacity="1" />
          <Stop offset="100%" stopColor="#505050" stopOpacity="1" />
        </LinearGradient>
        <View style={[styles.cardFooter, styles.rowCenter]}>
          <Text
            style={styles.whiteLabel}
            maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
            {cardholderName}
          </Text>
          <View style={styles.rowCenter}>
            <Text
              style={styles.offWhiteLabel}
              maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>
              {'Exp.'}
            </Text>
            <Text
              style={styles.whiteLabel}
              maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>
              {expirationDate}
            </Text>
          </View>
        </View>
      </Svg>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  cardContainer: {
    borderRadius: 16,
    borderColor: 'white',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardBody: {
    height: (CARD_HEIGHT * 4) / 6,
    width: CARD_WIDTH,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardFooter: {
    paddingHorizontal: 20,
    height: (CARD_HEIGHT * 2) / 6,
    justifyContent: 'space-between',
  },
  offWhiteLabel: {
    fontSize: isIOS ? 14 : 12,
    color: '#797979',
    marginRight: 8,
    fontFamily: typography.medium,
  },
  whiteLabel: {
    fontSize: isIOS ? 14 : 12,
    color: 'white',
    fontFamily: typography.medium,
  },
  cardNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: typography.medium,
  },
});
