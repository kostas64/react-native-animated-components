import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {TextBetweenProps} from './types';
import {typography} from '@utils/typography';
import FadeInTransition from './FadeInTransition';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const TextBetween = ({
  index = 0,
  title,
  titleStyle,
  label,
  animate,
  containerStyle,
}: TextBetweenProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FadeInTransition index={index} animate={animate} direction="top-right">
        <Text
          style={[styles.title, titleStyle]}
          maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
          {title}
        </Text>
      </FadeInTransition>
      {label && (
        <FadeInTransition index={index} animate={animate} direction="top-left">
          <Text
            style={styles.label}
            maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
            {label}
          </Text>
        </FadeInTransition>
      )}
    </View>
  );
};

export default TextBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 22,
  },
  label: {
    fontFamily: typography.bold,
    fontSize: 16,
  },
});
