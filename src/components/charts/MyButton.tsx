import {StyleSheet, TouchableOpacity} from 'react-native';

import {TChartButton} from './types';
import {Colors} from '@utils/colors';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import {isIOS, SM_FONT_UPSCALE_FACTOR} from '@utils/device';

const MyButton = ({title, style, onPress}: TChartButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.btnContainer, style]}>
      <Text
        style={[styles.btnLabel, isIOS && styles.lineHeight]}
        numberOfLines={1}
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.DARK_OLIVE_GREEN,
    height: 52,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 150,
  },
  btnLabel: {
    color: Colors.WHITE,
    fontFamily: typography.semiBold,
  },
  lineHeight: {
    lineHeight: 24,
  },
});
