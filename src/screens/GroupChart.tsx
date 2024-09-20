import {
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {DATA} from '@components/charts/groupChart/data';
import Legend from '@components/charts/groupChart/Legend';
import Prices from '@components/charts/groupChart/Prices';
import {TGroupItem} from '@components/charts/groupChart/types';
import MovingDot from '@components/charts/groupChart/MovingDot';
import {GROUP_WIDTH} from '@components/charts/groupChart/constants';
import GroupBarItem from '@components/charts/groupChart/GroupBarItem';

const GroupChart = () => {
  const navigation = useNavigation();

  const maxIncome = Math.max(...DATA.map(item => item.income));
  const maxExpenses = Math.max(...DATA.map(item => item.expenses));
  const MAX_VALUE = Math.max(maxIncome, maxExpenses);

  const animate = useSharedValue(0);
  const sharedQ = useSharedValue<number | null>(null);
  const [selectedQ, setSelectedQ] = React.useState<number | null>(null);
  const [positions, setPositions] = React.useState<number[]>([]);

  const hasSelectedItem = typeof selectedQ === 'number';

  const animatedDot = useAnimatedStyle(() => ({
    opacity: withTiming(selectedQ === null ? 0 : 1),
    transform: [{translateX: sharedQ.value ?? 0}],
  }));

  useEffect(() => {
    //@ts-ignore
    const listener = navigation.addListener('transitionEnd', () => {
      animate.value = withTiming(1, {duration: 500});
    });

    return () => !!listener && listener();
  });

  useEffect(() => {
    if (hasSelectedItem) {
      sharedQ.value = withSpring(positions[selectedQ] - GROUP_WIDTH / 2, {
        damping: 80,
        stiffness: 200,
      });
    }
  }, [selectedQ]);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default GroupChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eeeee2',
    justifyContent: 'center',
  },
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
    borderBottomColor: '#d3d3d3',
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
    backgroundColor: '#d3d3d3',
  },
  dot: {
    left: 2,
    bottom: -42,
    position: 'absolute',
  },
});
