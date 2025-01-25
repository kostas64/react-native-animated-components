import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const ScreenTransitionHomework = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {'You think im lazy?\n😔😔😔'}
      </Text>
    </View>
  );
};

export default ScreenTransitionHomework;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: typography.semiBold,
  },
});
