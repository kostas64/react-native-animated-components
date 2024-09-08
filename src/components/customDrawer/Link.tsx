import React from 'react';
import {StyleSheet} from 'react-native';

import Button from './Button';
import {colors} from './data';
import {TLinkProps} from './types';
import {typography} from '@utils/typography';

const Link = ({link, index, routes, onPress}: TLinkProps) => {
  return (
    <Button
      title={link}
      onPress={onPress}
      style={[styles.buttonSmall, {color: colors[index + routes.length + 1]}]}
    />
  );
};

export default Link;

const styles = StyleSheet.create({
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fdfdfd',
    fontFamily: typography.regular,
  },
});
