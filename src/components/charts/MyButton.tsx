import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from '@components/Text';
import {TChartButton} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const MyButton = ({title, style, onPress}: TChartButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.btnContainer, style]}>
      <Text
        style={styles.btnLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#556d36',
    height: 52,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 140,
  },
  btnLabel: {
    color: 'white',
    lineHeight: 22,
    fontFamily: typography.semiBold,
  },
});
