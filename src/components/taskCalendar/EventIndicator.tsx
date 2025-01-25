import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const EventIndicator = ({label}: {label: string}) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </View>
  );
};

export default EventIndicator;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ededed',
    alignSelf: 'flex-start',
    borderRadius: 32,
  },
  label: {
    fontFamily: typography.medium,
  },
});
