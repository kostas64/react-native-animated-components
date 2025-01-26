import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';

const Name = () => {
  return (
    <View style={styles.gap}>
      <Text style={styles.label}>Camp di Tebing</Text>
      <Text style={styles.label}>Terjal, Sukabumi</Text>
    </View>
  );
};

export default Name;

const styles = StyleSheet.create({
  gap: {
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
});
