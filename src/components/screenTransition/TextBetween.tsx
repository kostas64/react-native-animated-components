import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {TextBetweenProps} from './types';
import {typography} from '@utils/typography';
import FadeInTransition from './FadeInTransition';

const TextBetween = ({
  index = 0,
  title,
  titleStyle,
  label,
  animate,
  containerStyle,
}: TextBetweenProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FadeInTransition index={index} animate={animate} direction="top-right">
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </FadeInTransition>
      {label && (
        <FadeInTransition index={index} animate={animate} direction="top-left">
          <Text style={styles.label}>{label}</Text>
        </FadeInTransition>
      )}
    </View>
  );
};

export default TextBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 22,
  },
  label: {
    fontFamily: typography.bold,
    fontSize: 16,
  },
});
