import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '@utils/typography';

const EventIndicator = ({label}: {label: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default EventIndicator;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ededed',
    alignSelf: 'flex-start',
    borderRadius: 32,
  },
  label: {
    fontFamily: typography.medium,
  },
});
