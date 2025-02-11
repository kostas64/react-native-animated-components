import Animated, {
  withTiming,
  withSpring,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import {Pressable, StyleSheet, View} from 'react-native';

import {BarProps} from './types';
import {shadows} from './styles';
import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {AnimatedRect, AnimatedSvg} from '@components/AnimatedComponents';

const MAX_BAR_HEIGHT = 172;

const Bar = ({
  isSelected,
  value,
  month,
  maxValue,
  index = 0,
  onSelect,
}: BarProps) => {
  const animatedProps = useAnimatedProps(() => ({
    height: withSpring((value * MAX_BAR_HEIGHT) / maxValue, {
      damping: 80,
      stiffness: 200,
    }),
    opacity: isSelected ? withTiming(1) : withTiming(0, {duration: 150}),
  }));

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: isSelected ? withTiming(0, {duration: 150}) : withTiming(1),
  }));

  const height = useAnimatedStyle(() => ({
    height: withSpring((value * MAX_BAR_HEIGHT) / maxValue, {
      damping: 80,
      stiffness: 200,
    }),
  }));

  const heightProps = useAnimatedProps(() => ({
    height: withSpring((value * MAX_BAR_HEIGHT) / maxValue, {
      damping: 80,
      stiffness: 200,
    }),
  }));

  return (
    <Pressable style={styles.gap} onPress={() => onSelect(index)}>
      <View style={styles.container}>
        <Animated.View
          style={[
            height,
            styles.inner,
            animatedOpacity,
            shadows.veryJustShadow,
          ]}
        />
        <AnimatedSvg
          width={40}
          style={styles.absolute}
          animatedProps={animatedProps}>
          <CommonGradient id={'bar'} />
          <AnimatedRect
            rx={6}
            width={40}
            animatedProps={heightProps}
            fill={'url(#bar)'}
          />
        </AnimatedSvg>
      </View>
      <Text style={[styles.month, isSelected ? styles.selectedMonth : {}]}>
        {month}
      </Text>
    </Pressable>
  );
};

export default Bar;

const styles = StyleSheet.create({
  gap: {
    gap: 4,
  },
  absolute: {
    position: 'absolute',
    left: 2,
    bottom: 2,
  },
  container: {
    padding: 2,
    borderRadius: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: MAX_BAR_HEIGHT + 4,
    justifyContent: 'flex-end',
    backgroundColor: Colors.PLATINUM,
  },
  inner: {
    width: 40,
    height: 86,
    borderRadius: 6,
    backgroundColor: Colors.WHITE,
  },
  month: {
    color: Colors.ARGENT,
    alignSelf: 'center',
    fontFamily: typography.medium,
  },
  selectedMonth: {
    color: Colors.CHINESE_BLACK,
    alignSelf: 'center',
    fontFamily: typography.semiBold,
  },
});
