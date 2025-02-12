import {Pressable, StyleSheet} from 'react-native';

import Text from './Text';
import {Colors} from '@utils/colors';
import {THomeButtonProps} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const HomeButton = ({
  label,
  onPress,
  backgroundColor = Colors.TWO_POINT_BLACK,
}: THomeButtonProps) => {
  return (
    <Pressable style={[styles.container, {backgroundColor}]} onPress={onPress}>
      <Text
        style={styles.buttonLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.WHITE,
    fontFamily: typography.medium,
  },
});

export default HomeButton;
