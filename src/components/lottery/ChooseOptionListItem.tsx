import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useAnimatedStyle} from 'react-native-reanimated';

import {typography} from '@utils/typography';
import {TChooseOption, TListItem} from './types';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';
import {AnimatedPressable} from '@components/AnimatedComponents';

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
    <AnimatedPressable
      onPress={() => selectOption(index)}
      style={({pressed}) => [
        styles.optionContainer,
        selectedO === index ? styles.selectedBorder : styles.unselectedBorder,
        pressed && {opacity: 0.6},
        animStyle,
      ]}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {item}
      </Text>
    </AnimatedPressable>
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
