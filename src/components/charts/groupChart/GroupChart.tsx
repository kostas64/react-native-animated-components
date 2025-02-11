import {
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import React, {useCallback} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';

import {DATA} from './data';
import Legend from './Legend';
import Prices from './Prices';
import {TGroupItem} from './types';
import MovingDot from './MovingDot';
import {WIDTH} from '@utils/device';
import {Colors} from '@utils/colors';
import {GROUP_WIDTH} from './constants';
import GroupBarItem from './GroupBarItem';

const GroupChart = ({animate}: {animate: SharedValue<number>}) => {
  const maxIncome = Math.max(...DATA.map(item => item.income));
  const maxExpenses = Math.max(...DATA.map(item => item.expenses));
  const MAX_VALUE = Math.max(maxIncome, maxExpenses);

  const sharedQ = useSharedValue<number | null>(null);
  const [selectedQ, setSelectedQ] = React.useState<number | null>(null);
  const [positions, setPositions] = React.useState<number[]>([]);

  const hasSelectedItem = typeof selectedQ === 'number';

  const animatedDot = useAnimatedStyle(() => ({
    opacity: withTiming(selectedQ === null ? 0 : 1),
    transform: [{translateX: sharedQ.value ?? 0}],
  }));

  React.useEffect(() => {
    if (hasSelectedItem) {
      sharedQ.value = withSpring(positions[selectedQ] - GROUP_WIDTH / 2, {
        damping: 80,
        stiffness: 200,
      });
    }
  }, [selectedQ]);

  return (
    <View style={styles.widthContainer}>
      <View style={styles.legendContainer}>
        <Legend />
      </View>

      <View style={styles.pricesContainer}>
        <Prices
          income={hasSelectedItem ? DATA?.[selectedQ]?.income : undefined}
          expenses={hasSelectedItem ? DATA?.[selectedQ]?.expenses : undefined}
        />
      </View>

      <View style={styles.chartOuterContainer}>
        <View style={styles.chartInnerContainer}>
          {DATA.map((item: TGroupItem, index: number) => {
            const onLayout = useCallback((event: LayoutChangeEvent) => {
              event.target.measure((x, y, w, h, pageX) => {
                setPositions(prev => [...prev, pageX]);
              });
            }, []);

            return (
              <GroupBarItem
                item={item}
                index={index}
                animate={animate}
                MAX_VALUE={MAX_VALUE}
                groupWidth={GROUP_WIDTH}
                onLayout={onLayout}
                key={`parent-group-${index}`}
                onPress={() => setSelectedQ(index)}
              />
            );
          })}
        </View>
        <View style={styles.bottomLine} />
        <MovingDot style={[styles.dot, animatedDot]} />
      </View>
    </View>
  );
};

export default GroupChart;

const styles = StyleSheet.create({
  widthContainer: {
    width: WIDTH - 64,
    height: 284,
  },
  legendContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  pricesContainer: {
    height: 50,
    marginVertical: 16,
    marginLeft: 16,
  },
  chartOuterContainer: {
    alignItems: 'center',
  },
  chartInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH - 96,
    height: 100,
  },
  bottomLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  dot: {
    left: 2,
    bottom: -42,
    position: 'absolute',
  },
});
