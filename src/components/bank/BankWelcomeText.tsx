import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WelcomeStyleProps} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const BankWelcomeText = ({style}: WelcomeStyleProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={styles.title}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {'Payments\nNever Been\nEasier'}
      </Text>
      <Text
        style={styles.description}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {
          'Experience seamless financial management makes managing your financies easy and intuitive'
        }
      </Text>
    </View>
  );
};

export default BankWelcomeText;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
    fontFamily: typography.medium,
    color: 'white',
  },
  description: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: typography.medium,
    color: '#707070',
  },
});
