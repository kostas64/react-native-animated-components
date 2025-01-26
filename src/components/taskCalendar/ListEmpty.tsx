import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {TLoading} from './types';
import Text from '@components/Text';
import {typography} from '@utils/typography';

const ListEmpty = ({loading, selectedDate}: TLoading) => {
  const label = !selectedDate ? 'Pick a day' : 'No events';

  if (loading) {
    return null;
  }

  return !loading || !selectedDate ? (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
