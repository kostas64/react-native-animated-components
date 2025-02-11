import {StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {TMonthListItem} from './types';
import {typography} from '@utils/typography';
import {isIOS, SM_FONT_UPSCALE_FACTOR} from '@utils/device';

const MonthListItem = ({
  item,
  index,
  scrollOffset,
  scrollToMonth,
}: TMonthListItem) => {
  const animStyle = useAnimatedStyle(() => {
    return {
      height: 46,
      opacity: interpolate(
        scrollOffset?.value ?? 0,
        [
          (index - 2) * 46,
          (index - 1) * 46,
          index * 46,
          (index + 1) * 46,
          (index + 2) * 46,
        ],
        [0.1, 0.3, 1, 0.3, 0.1],
      ),
    };
  });

  return (
    <Animated.View
      style={animStyle}
      onTouchStart={() => !!scrollToMonth && scrollToMonth(item)}>
      <Text style={styles.label} maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
        {item}
      </Text>
    </Animated.View>
  );
};

export default MonthListItem;

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    color: Colors.WHITE,
    lineHeight: isIOS ? 26 : 29,
    fontFamily: typography.semiBold,
  },
});
