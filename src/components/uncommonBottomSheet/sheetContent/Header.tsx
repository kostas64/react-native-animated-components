import React from 'react';
import {StyleSheet, View} from 'react-native';

import Name from './Name';
import Rating from './Rating';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Name />
      <Rating />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
