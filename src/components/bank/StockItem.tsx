import Animated, {
  withDelay,
  withTiming,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';

import {shadows} from './styles';
import {Colors} from '@utils/colors';
import {StocksItemProps} from './types';
import {isAndroid} from '@utils/device';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import {ChartRef} from '@components/charts/lineChart/types';
import AnimatedLineChart from '@components/charts/lineChart/AnimatedLineChart';

const StockItem = ({name, values}: StocksItemProps) => {
  const chartRef = useRef<ChartRef>(null);

  const shouldHighlight = useSharedValue(0);
  const [stockData, setStockData] = useState(values);
  const hasIncrease = stockData?.[stockData?.length - 1] > values?.[0];

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      shouldHighlight.value,
      [0, 1],
      [Colors.WHITE, Colors.SIZZLING_SUNRISE],
    ),
  }));

  useEffect(() => {
    chartRef.current?.animate();

    const interval = setInterval(() => {
      const newValue = parseFloat((Math.random() * 1000 + 50).toFixed(2));

      if (newValue < values?.[0]) {
        shouldHighlight.value = withTiming(1, {duration: 1500}, finished => {
          if (finished) {
            shouldHighlight.value = withDelay(
              500,
              withTiming(0, {duration: 150}),
            );
          }
        });
      }

      setStockData(old => [
        ...(old?.length > 0 ? old.slice(1) : old),
        newValue,
      ]);
    }, 5000);

    return () => {
      !!interval && clearInterval(interval);
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        animatedBackground,
        isAndroid ? styles.border : shadows.veryJustShadow,
        styles.spaceHorizontal,
      ]}>
      <View style={styles.gap}>
        <Text style={styles.label}>{name}</Text>
        <Text style={[styles.label, hasIncrease ? styles.green : styles.red]}>
          {`$${stockData?.[stockData.length - 1]?.toFixed(2)}`}
        </Text>
      </View>

      <AnimatedLineChart
        ref={chartRef}
        noGrid
        data={stockData}
        width={90}
        height={45}
        shouldCancelWhenOutsideGesture={false}
        strokeBackground={
          hasIncrease ? Colors.CHINESE_WHITE : Colors.QUEEN_PINK
        }
        strokeColor={hasIncrease ? Colors.MEDIUM_SEA_GREEN : Colors.DARK_PINK}
      />
    </Animated.View>
  );
};

export default StockItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gap: {
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  spaceHorizontal: {
    marginHorizontal: 24,
  },
  green: {
    color: Colors.MEDIUM_SEA_GREEN,
  },
  red: {
    color: Colors.DARK_PINK,
  },
  border: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.PLATINUM,
  },
});
