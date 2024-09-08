import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {DATA} from './data';
import {ArrowProps} from './types';
import {typography} from '@utils/typography';
import {IMAGE_WIDTH, SPACING} from './constants';

const Arrows = ({
  index,
  disabledLeft,
  disabledRight,
  onPressLeft,
  onPressRight,
}: ArrowProps) => {
  return (
    <View style={styles.arrowsContainer}>
      <TouchableOpacity
        disabled={disabledLeft}
        style={{opacity: index === 0 ? 0.25 : 1}}
        onPress={onPressLeft}>
        <View style={styles.arrowContainer}>
          <AntDesign name="swapleft" size={42} color="black" />
          <Text style={styles.arrowText}>PREV</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledRight}
        style={{opacity: index === DATA.length - 1 ? 0.25 : 1}}
        onPress={onPressRight}>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>NEXT</Text>
          <AntDesign name="swapright" size={42} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Arrows;

const styles = StyleSheet.create({
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: IMAGE_WIDTH + SPACING * 4,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 12,
    color: 'black',
    fontFamily: typography.bold,
  },
});
