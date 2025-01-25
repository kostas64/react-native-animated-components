import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {typography} from '@utils/typography';
import {TChooseOption, TListItem} from './types';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const AnimPressable = Animated.createAnimatedComponent(TouchableOpacity);

const ChooseOptionListItem = ({
  item,
  index,
  spinning,
  selectedO,
  selectOption,
}: TChooseOption & TListItem) => {
  const animStyle = useAnimatedStyle(() => ({
    elevation: spinning.value ? 0 : 5,
  }));

  return (
    <AnimPressable
      activeOpacity={0.6}
      onPress={() => selectOption(index)}
      style={[
        styles.optionContainer,
        selectedO === index ? styles.selectedBorder : styles.unselectedBorder,
        animStyle,
      ]}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {item}
      </Text>
    </AnimPressable>
  );
};

export default ChooseOptionListItem;

const styles = StyleSheet.create({
  optionContainer: {
    minWidth: 92,
    alignItems: 'center',
    backgroundColor: '#7a54cd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: 'white',
  },
  unselectedBorder: {
    borderWidth: 2,
    borderColor: '#7a54cd',
  },
});
