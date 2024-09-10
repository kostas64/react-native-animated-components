import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TFooter} from './types';
import {HEIGHT, WIDTH} from '@utils/device';
import {typography} from '@utils/typography';

const Footer = ({onPressClear, animateClose}: TFooter) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.row,
        styles.justifyBtn,
        styles.padHor24,
        styles.marTop4,
        styles.widthCenter,
        {
          paddingBottom: insets.bottom,
          height: HEIGHT > 800 ? 100 : 48 + (insets.bottom || 24),
        },
      ]}>
      <Pressable style={styles.padding8} onPress={onPressClear}>
        <Text style={styles.clearAll}>Clear all</Text>
      </Pressable>
      <Pressable
        onPress={animateClose}
        style={[styles.row, styles.searchBtn, styles.alignCenter]}>
        <Entypo size={20} style={styles.lens3} name="magnifying-glass" />
        <Text style={styles.search}>Search</Text>
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  justifyBtn: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  padHor24: {
    paddingHorizontal: 24,
  },
  marTop4: {
    marginTop: 4,
  },
  widthCenter: {
    width: WIDTH,
    alignItems: 'center',
  },
  padding8: {
    padding: 8,
  },
  searchBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#e51d51',
  },
  search: {
    color: 'white',
    fontFamily: typography.semiBold,
  },
  clearAll: {
    fontSize: 16,
    fontFamily: typography.semiBold,
    textDecorationLine: 'underline',
  },
  lens3: {
    paddingRight: 8,
    color: 'white',
  },
});
