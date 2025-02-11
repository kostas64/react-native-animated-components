import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import {barHeight, colors} from './constants';
import {TStackChartTooltip, TTooltip} from './types';

const StackChartTooltip = ({tooltip, selectedIndex}: TStackChartTooltip) => {
  const [layout, setLayout] = useState({width: 0, height: 0});

  const gap = 4;
  const utilities = Object.keys(tooltip)
    .filter(key => key !== 'x' && key !== 'y' && key !== 'quarter')
    .map(key => key.charAt(0).toUpperCase() + key.slice(1));

  const opacity = useAnimatedStyle(() => {
    const top =
      selectedIndex === 0
        ? -layout.height - gap
        : -layout.height +
          (selectedIndex ?? 0) * barHeight +
          (gap + 3) * (selectedIndex ?? 0);

    const initLeftPos = (tooltip.x ?? 0) - layout.width / 2 + 14;
    const left =
      initLeftPos < -25 ? -25 : initLeftPos > 245 ? 245 : initLeftPos;

    return {
      top,
      left,
      opacity: selectedIndex === null ? 0 : withTiming(1, {duration: 500}),
    };
  });

  return (
    <Animated.View
      onLayout={e => setLayout(e.nativeEvent.layout)}
      style={[styles.container, opacity, {gap}]}>
      {utilities.map((item, key) => (
        <View key={key} style={styles.itemContainer}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  colors?.[item.toLowerCase() as keyof typeof colors],
              },
            ]}
          />
          <Text style={styles.label}>
            {`$${tooltip[item.toLowerCase() as keyof TTooltip]}`}
          </Text>
        </View>
      ))}
    </Animated.View>
  );
};

export default StackChartTooltip;

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: '#eeeee2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d3d3d3',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    fontFamily: typography.medium,
  },
});
