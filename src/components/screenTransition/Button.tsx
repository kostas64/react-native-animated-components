import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from '@components/Text';
import {ButtonProps} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const Button = ({style, label, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPressIn={onPress}
      activeOpacity={0.5}
      style={[styles.container, style]}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
    fontFamily: typography.semiBold,
  },
});
