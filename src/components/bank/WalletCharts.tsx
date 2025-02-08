import {
  Text,
  View,
  FlatList,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Svg, Text as SVGText} from 'react-native-svg';

import Bar from './Bar';
import Tabs from './Tabs';
import {BarItemProps} from './types';
import {isAndroid} from '@utils/device';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {EARNINGS, SELECTED_TYPE} from './data';

const WalletCharts = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedType, setSelectedType] = useState(SELECTED_TYPE.EARNINGS);

  const maxBarEarnings = EARNINGS.reduce(
    (max, obj) => (obj.earnings > max.earnings ? obj : max),
    EARNINGS[0],
  );

  const maxBarSpendings = EARNINGS.reduce(
    (max, obj) => (obj.spendings > max.spendings ? obj : max),
    EARNINGS[0],
  );

  const maxValue =
    selectedType === SELECTED_TYPE.EARNINGS
      ? maxBarEarnings.earnings
      : maxBarSpendings.spendings;

  const onSelect = useCallback((index: number) => {
    setSelectedMonth(index);
  }, []);

  const onSelectType = useCallback((value: string) => {
    setSelectedType(value);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: BarItemProps; index: number}) => (
      <Bar
        key={index}
        index={index}
        month={item.month}
        maxValue={maxValue}
        isSelected={index === selectedMonth}
        onSelect={onSelect}
        value={
          selectedType === SELECTED_TYPE.EARNINGS
            ? item.earnings
            : item.spendings
        }
      />
    ),
    [selectedMonth, selectedType],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.rowCenter}>
        <Svg width={22} height={38} viewBox="0 0 4 2.5" style={styles.currency}>
          <CommonGradient id={'currency'} />
          <SVGText y={4} fontSize={6} fontWeight={'bold'} fill="url(#currency)">
            $
          </SVGText>
        </Svg>
        <Text style={styles.money}>7,008.14</Text>
      </View>
      <Text style={styles.earningsLabel}>{'Total Earnings'}</Text>

      <FlatList
        horizontal
        renderItem={renderItem}
        data={EARNINGS}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />

      <Tabs selected={selectedType} onSelectType={onSelectType} />
    </View>
  );
};

export default WalletCharts;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingTop: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: '#efefef',
  },
  listContentContainer: {
    gap: 16,
    marginTop: 42,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  money: {
    color: '#121212',
    fontSize: 36,
    fontFamily: typography.semiBold,
  },
  earningsLabel: {
    alignSelf: 'center',
    color: '#505050',
    fontFamily: typography.medium,
    fontSize: 12,
    marginTop: 4,
  },
  currency: {
    transform: [{translateY: isAndroid ? 3 : 0}],
  },
});
