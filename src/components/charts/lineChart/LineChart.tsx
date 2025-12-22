import React from "react";
import { StyleSheet, View } from "react-native";

import { ChartRef } from "./types";
import ChartHeader from "../ChartHeader";
import AnimatedLineChart from "./AnimatedLineChart";
import { chartHeight, chartWidth, data } from "./data";

const LineChart = React.forwardRef<ChartRef>((_, ref) => {
  return (
    <View>
      <View style={styles.spaceBottom}>
        <ChartHeader iconName="line-chart" label={"Line Chart"} />
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

LineChart.displayName = "LineChart";

export default LineChart;

const styles = StyleSheet.create({
  spaceBottom: {
    marginBottom: 28,
  },
});
