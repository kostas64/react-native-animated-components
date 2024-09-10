import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {TSearchItem} from './types';
import {typography} from '@utils/typography';

const SearchItem = ({place, date, guests}: TSearchItem) => (
  <TouchableOpacity
    activeOpacity={0.65}
    style={[styles.row, styles.alignCenter, styles.marBot24]}>
    <View style={styles.searchClockContainer}>
      <AntDesign name="clockcircleo" size={25} color={'black'} />
    </View>
    <View>
      <View style={styles.row}>
        <Text style={styles.font17}>{place}</Text>
        <Text style={styles.font17}> • Stays</Text>
      </View>
      <View style={[styles.row, styles.marTop4]}>
        <Text style={styles.subtitle}>{date}</Text>
        <Text style={styles.subtitle}>{` • ${guests} guests`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default SearchItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  marTop4: {
    marginTop: 4,
  },
  marBot24: {
    marginBottom: 24,
  },
  searchClockContainer: {
    padding: 16,
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: 10,
    marginRight: 16,
  },
  font17: {
    fontSize: 16,
    fontFamily: typography.medium,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgb(75,75,75)',
    fontFamily: typography.regular,
  },
});
