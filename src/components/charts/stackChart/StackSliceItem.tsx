import {StyleSheet, View} from 'react-native';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import Text from '@components/Text';
import {Colors} from '@utils/colors';
import StackSlice from './StackSlice';
import {TStackSliceItem} from './types';
import {typography} from '@utils/typography';
import {XSM_FONT_UPSCALE_FACTOR} from '@utils/device';
import {barHeight, chartWidth, colors, maxQuarter} from './constants';

const StackSliceItem = ({
  item,
  index,
  animate,
  setTooltip,
  isSelected,
  resetTooltip,
}: TStackSliceItem) => {
  const opacity = useAnimatedStyle(() => ({
    opacity: withTiming(isSelected === null || !!isSelected ? 1 : 0.25),
  }));

  return (
    <View style={styles.container}>
      <Text
        style={styles.quarterLabel}
        maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>{`Q${index + 1}`}</Text>
      <StackSlice
        index={1}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.payroll / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          styles.slice1,
          {height: barHeight, backgroundColor: colors?.payroll},
        ]}
      />
      <StackSlice
        index={2}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.operations / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          styles.slice2,
          {
            height: barHeight,
            backgroundColor: colors?.operations,
          },
        ]}
      />
      <StackSlice
        index={3}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.electricity / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          styles.slice2,
          {
            height: barHeight,
            backgroundColor: colors?.electricity,
          },
        ]}
      />
      <StackSlice
        index={4}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.travel / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          styles.lastSlice,
          {
            height: barHeight,
            backgroundColor: colors?.travel,
          },
        ]}
      />
      {index === 0 && <View style={styles.separator} />}
    </View>
  );
};

export default StackSliceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 1,
  },
  quarterLabel: {
    fontSize: 14,
    lineHeight: 18,
    width: 23,
    marginRight: 10,
    fontFamily: typography.medium,
    alignSelf: 'center',
  },
  separator: {
    position: 'absolute',
    width: 1,
    left: 32,
    top: -12,
    height: 236,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  slice1: {
    bottom: -1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  slice2: {
    bottom: -1,
  },
  lastSlice: {
    bottom: -1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
