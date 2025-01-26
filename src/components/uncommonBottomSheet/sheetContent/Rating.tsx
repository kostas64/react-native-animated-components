import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Text from '@components/Text';
import {typography} from '@utils/typography';

const Rating = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.overall}>Overall</Text>
      <View style={styles.ratingContainer}>
        <AntDesign name="star" color="white" />
        <Text style={styles.ratingLabel}>4.8</Text>
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    gap: 6,
    borderRadius: 12,
    backgroundColor: '#ff874c',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  overall: {
    color: 'white',
    fontFamily: typography.medium,
  },
  ratingContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingLabel: {
    color: 'white',
    fontSize: 12,
    fontFamily: typography.medium,
  },
});
