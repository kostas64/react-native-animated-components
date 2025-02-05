import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WelcomeStyleProps} from './types';
import {typography} from '@utils/typography';

const BankWelcomeText = ({style}: WelcomeStyleProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{'Payments\nNever Been\nEasier'}</Text>
      <Text style={styles.description}>
        {
          'Experience seamless financial management makes managing your financies easy and intuitive'
        }
      </Text>
    </View>
  );
};

export default BankWelcomeText;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 36,
    fontFamily: typography.medium,
    color: 'white',
  },
  description: {
    fontSize: 12,
    fontFamily: typography.medium,
    color: '#707070',
  },
});
