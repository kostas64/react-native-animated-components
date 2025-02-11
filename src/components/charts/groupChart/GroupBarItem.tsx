import {StyleSheet, TouchableOpacity} from 'react-native';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {COLORS} from './data';
import GroupBar from './GroupBar';
import Text from '@components/Text';
import {TGroupBarContainer} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const GroupBarItem = ({
  animate,
  item,
  index,
  groupWidth,
  onPress,
  onLayout,
  MAX_VALUE,
}: TGroupBarContainer) => {
  const groupIncStyle = useAnimatedStyle(() => ({
    height: interpolate(
      animate.value,
      [0, 1],
      [0, (item.income / MAX_VALUE) * 100],
    ),
  }));

  const groupExpStyle = useAnimatedStyle(() => ({
    height: interpolate(
      animate.value,
      [0, 1],
      [0, (item.expenses / MAX_VALUE) * 100],
    ),
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.chartItemContainer}>
      <GroupBar
        width={groupWidth}
        color={COLORS.income}
        style={groupIncStyle}
      />
      <GroupBar
        width={groupWidth}
        color={COLORS.expenses}
        style={groupExpStyle}
      />
      <Text
        onLayout={onLayout}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
        style={[styles.quarter, {width: groupWidth}]}>{`Q${index + 1}`}</Text>
    </TouchableOpacity>
  );
};

export default GroupBarItem;

const styles = StyleSheet.create({
  chartItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  quarter: {
    fontFamily: typography.medium,
    position: 'absolute',
    bottom: -24,
    textAlign: 'center',
  },
});
