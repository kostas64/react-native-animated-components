import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

import {TTooltip} from './types';
import Text from '@components/common/Text';
import {WIDTH} from '@utils/device';
import StackLegend from './StackLegend';
import {generateValueLabels} from './utils';
import {typography} from '@utils/typography';
import StackSliceItem from './StackSliceItem';
import StackChartGrid from './StackChartGrid';
import StackChartTooltip from './StackChartTooltip';
import {DATA, chartHeight, tooltipInitState} from './constants';

const StackChart = ({animate}: {animate: SharedValue<number>}) => {
  const valueLabels = generateValueLabels(DATA);
  const [tooltip, setTooltip] = React.useState<TTooltip>(tooltipInitState);

  const selectedIndex =
    tooltip.x !== null
      ? DATA.findIndex(
          item =>
            item.electricity === tooltip.electricity &&
            item.operations === tooltip.operations &&
            item.payroll === tooltip.payroll &&
            item.travel === tooltip.travel,
        )
      : null;

  const resetTooltip = () => {
    setTooltip(tooltipInitState);
  };

  return (
    <View style={styles.widthContainer}>
      <Text style={{fontFamily: typography.semiBold}}>Quarterly Expenses</Text>

      <View style={[styles.container, {height: chartHeight}]}>
        {DATA.map((item, index) => {
          const isSelected =
            selectedIndex === null ? null : selectedIndex === index;

          return (
            <StackSliceItem
              key={index}
              item={item}
              index={index}
              animate={animate}
              setTooltip={setTooltip}
              resetTooltip={resetTooltip}
              isSelected={isSelected}
            />
          );
        })}
        <View onTouchStart={resetTooltip}>
          <StackChartGrid animate={animate} valueLabels={valueLabels} />
          <StackLegend animate={animate} selectedIndex={selectedIndex} />
        </View>
        <StackChartTooltip tooltip={tooltip} selectedIndex={selectedIndex} />
      </View>
    </View>
  );
};

export default StackChart;

const styles = StyleSheet.create({
  widthContainer: {
    width: WIDTH - 64,
  },
  container: {
    gap: 10,
    marginTop: 32,
  },
});
