import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {StocksItemProps} from './types';
import {typography} from '@utils/typography';
import {ChartRef} from '@components/charts/lineChart/types';
import AnimatedLineChart from '@components/charts/lineChart/AnimatedLineChart';

const StockItem = ({name, values}: StocksItemProps) => {
  const chartRef = useRef<ChartRef>(null);
  const hasIncrease = values?.[values?.length - 1] > values?.[0];

  useEffect(() => {
    chartRef.current?.animate();
  }, []);

  return (
    <View style={[styles.container, styles.spaceHorizontal]}>
      <View style={styles.gap}>
        <Text style={styles.label}>{name}</Text>
        <Text
          style={[styles.label, {color: hasIncrease ? '#3ac060' : '#e8477e'}]}>
          {`$${values?.[values.length - 1]?.toFixed(2)}`}
        </Text>
      </View>

      <AnimatedLineChart
        ref={chartRef}
        noGrid
        data={values}
        width={90}
        height={45}
        shouldCancelWhenOutsideGesture={false}
        strokeBackground={hasIncrease ? '#deeae2' : '#edcdda'}
        strokeColor={hasIncrease ? '#3ac060' : '#e8477e'}
      />
    </View>
  );
};

export default StockItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 8,
    paddingRight: 16,
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
});
