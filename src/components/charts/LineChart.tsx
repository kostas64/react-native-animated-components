import React from 'react';
import {StyleSheet, View} from 'react-native';

import ChartHeader from './ChartHeader';
import {ChartRef} from './lineChart/types';
import AnimatedLineChart from './lineChart/AnimatedLineChart';
import {chartHeight, chartWidth, data} from './lineChart/data';

const LineChart = React.forwardRef<ChartRef>((_, ref) => {
  return (
    <View>
      <View style={styles.spaceBottom}>
        <ChartHeader iconName="linechart" label={'Line Chart'} />
      </View>
      <AnimatedLineChart
        ref={ref}
        data={data}
        width={chartWidth}
        height={chartHeight}
      />
    </View>
  );
});

export default LineChart;

const styles = StyleSheet.create({
  spaceBottom: {
    marginBottom: 28,
  },
});
