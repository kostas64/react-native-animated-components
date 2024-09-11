import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import MyButton from '@components/charts/MyButton';
import ChartHeader from '@components/charts/ChartHeader';
import {ChartRef} from '@components/charts/lineChart/types';
import AnimatedLineChart from '@components/charts/lineChart/AnimatedLineChart';
import {data, chartWidth, chartHeight} from '@components/charts/lineChart/data';

const LineChartScreen = () => {
  const chartRef = useRef<ChartRef>(null);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <ChartHeader iconName="linechart" label={'Line Chart'} />
        </View>
        <AnimatedLineChart
          ref={chartRef}
          data={data}
          width={chartWidth}
          height={chartHeight}
        />
      </View>

      <View style={styles.btnsContainer}>
        <MyButton title="Animate" onPress={() => chartRef.current?.animate()} />
        <MyButton
          title="Animate Back"
          onPress={() => chartRef.current?.animate(false)}
        />
      </View>
    </View>
  );
};

export default LineChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#eeeee2',
    gap: 36,
  },
  header: {
    top: -26,
  },
  btnsContainer: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
  },
});
