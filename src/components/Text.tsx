import {
  StyleProp,
  TextStyle,
  TextProps,
  StyleSheet,
  Text as DefaultText,
} from 'react-native';
import React from 'react';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

interface DefaultTextProps extends TextProps {
  textStyle?: StyleProp<TextStyle>;
  children: string;
}

const Text = ({textStyle, children, ...restProps}: DefaultTextProps) => {
  return (
    <DefaultText
      maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
      style={[styles.defaultStyle, textStyle]}
      {...restProps}>
      {children}
    </DefaultText>
  );
};

export default Text;

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#121212',
    fontSize: 14,
    fontFamily: typography.regular,
  },
});
