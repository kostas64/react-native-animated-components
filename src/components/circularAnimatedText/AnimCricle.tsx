import Animated, {
  withRepeat,
  withTiming,
  interpolate,
  processColor,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  createAnimatedPropAdapter,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TextPath, TSpan, Text as SvgText} from 'react-native-svg';

import {
  TEXT,
  SCALE,
  ROT_DEG,
  BOX_SIZE,
  FONT_SIZE,
  LETTER_SPACING,
  CIRCLES_SPACING,
  NUM_LETTER_CIRCLES,
} from './data';
import {TAnimCircle} from './types';

const AnimText = Animated.createAnimatedComponent(SvgText);

const AnimCircle = ({_, activeColor, index}: TAnimCircle) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 2500}), -1, true);
  }, []);

  const animStyle = useAnimatedStyle(() => {
    const translateInterpolation = interpolate(
      progress.value,
      [0, 1],
      [-(BOX_SIZE + 100) / 2, (-(BOX_SIZE + 100) / 2) * SCALE],
    );

    const rotDirection = index % 2 === 0 ? [0, ROT_DEG] : [ROT_DEG, 0];

    return {
      transform: [
        {translateX: BOX_SIZE + 100},
        {translateY: BOX_SIZE + 100},
        {rotate: `${interpolate(progress.value, [0, 1], rotDirection)}deg`},
        {translateX: translateInterpolation},
        {translateY: translateInterpolation},
        {scale: interpolate(progress.value, [0, 1], [1, SCALE])},
      ],
      opacity: (index + 1) / NUM_LETTER_CIRCLES,
    };
  });

  const animProps = useAnimatedProps(
    () => ({fill: activeColor.value}),
    [],
    createAnimatedPropAdapter(
      props => {
        if (Object.keys(props).includes('fill')) {
          props.fill = {type: 0, payload: processColor(props.fill)};
        }
      },
      ['fill'],
    ),
  );

  return (
    <AnimText
      //@ts-ignore
      style={animStyle}
      key={`circle-${index}`}
      animatedProps={animProps}
      letterSpacing={LETTER_SPACING}
      fontSize={`${FONT_SIZE + index}`}>
      <TextPath href="#circle">
        <TSpan dx="-20" dy={-((index + 1) * CIRCLES_SPACING)}>
          {TEXT}
        </TSpan>
      </TextPath>
    </AnimText>
  );
};

export default AnimCircle;

const styles = StyleSheet.create({});
