import React from 'react';
import {StyleSheet, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {_spacing} from './constants';

const WeekEmptyDayListItem = () => {
  return <View style={styles.empty} />;
};

export default WeekEmptyDayListItem;

const styles = StyleSheet.create({
  empty: {
    marginRight: _spacing,
    paddingVertical: 10,
    width: (WIDTH - 40 - 6 * _spacing) / 7,
    borderRadius: 48,
  },
});
