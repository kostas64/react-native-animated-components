import React from 'react';
import Animated from 'react-native-reanimated';
import {Image, StyleProp, StyleSheet, ViewStyle} from 'react-native';

import SectionHeader from './SectionHeader';

const StocksHeader = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <Animated.View
      style={[styles.spacePadHorizontal, styles.headerContainer, style]}>
      <Image
        source={require('../../assets/img/bank/stocks.png')}
        style={styles.icon}
      />
      <SectionHeader label="Stocks" />
    </Animated.View>
  );
};

export default StocksHeader;

const styles = StyleSheet.create({
  spacePadHorizontal: {
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 26,
    height: 26,
  },
});
