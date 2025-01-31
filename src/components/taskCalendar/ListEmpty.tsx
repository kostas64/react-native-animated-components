import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {TLoading} from './types';
import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const ListEmpty = ({loading, selectedDate}: TLoading) => {
  const label = !selectedDate ? 'Pick a day' : 'No events';

  if (loading) {
    return null;
  }

  return !loading || !selectedDate ? (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </Animated.View>
  ) : null;
};

export default ListEmpty;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: typography.medium,
    color: 'white',
  },
});
