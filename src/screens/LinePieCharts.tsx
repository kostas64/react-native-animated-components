import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MyButton from '@components/charts/MyButton';
import PieChart from '@components/charts/pieChart/PieChart';
import LineChart from '@components/charts/lineChart/LineChart';

type ChartRef = {
  animate: (forward?: boolean) => void;
};

const LineChartScreen = () => {
  const lineChartRef = useRef<ChartRef>(null);
  const pieChartRef = useRef<ChartRef>(null);
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;
  const paddingBottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  const onAnimate = (forward = true) => {
    if (forward) {
      lineChartRef.current?.animate();
      pieChartRef.current?.animate();
    } else {
      lineChartRef.current?.animate(false);
      pieChartRef.current?.animate(false);
    }
  };

  return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>
      <View style={styles.chartsContainer}>
        <LineChart ref={lineChartRef} />
        <PieChart ref={pieChartRef} />
      </View>

      <View style={styles.btnsContainer}>
        <MyButton title="Animate" onPress={onAnimate} />
        <MyButton title="Animate Back" onPress={() => onAnimate(false)} />
      </View>
    </View>
  );
};

export default LineChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#eeeee2',
    justifyContent: 'space-between',
  },
  chartsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  btnsContainer: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginTop: 16,
  },
});
