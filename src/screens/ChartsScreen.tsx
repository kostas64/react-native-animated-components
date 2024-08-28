import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {typography} from '@utils/typography';
import LineChart from '@components/charts/LineChart';

type ChartRef = {
  animate: (forward?: boolean) => void;
};

const MyButton = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
  );
};

const LineChartScreen = () => {
  const chartRef = useRef<ChartRef>(null);
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;

  return (
    <View style={[styles.container, {paddingTop}]}>
      <View>
        <LineChart ref={chartRef} />
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
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#eeeee2',
  },
  btnsContainer: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginTop: 16,
  },
  btnContainer: {
    backgroundColor: '#556d36',
    height: 52,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 140,
  },
  btnLabel: {
    color: 'white',
    lineHeight: 22,
    fontFamily: typography.semiBold,
  },
});
