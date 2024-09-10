import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {TItemCounter} from './types';
import CounterBtn from './CounterBtn';
import {typography} from '@utils/typography';

const ItemCounter = ({
  label,
  subLabel,
  subLabelStyle,
  value,
  setValue,
  extraOnPress,
  disabledLeft,
}: TItemCounter) => (
  <View
    style={[
      styles.row,
      styles.justifyBtn,
      styles.alignCenter,
      styles.itemCounterContainer,
    ]}>
    <View>
      <Text style={styles.font16}>{label}</Text>
      <Text style={[styles.subtitle, subLabelStyle, styles.marTop4]}>
        {subLabel}
      </Text>
    </View>
    <View style={[styles.row, styles.alignCenter]}>
      <CounterBtn
        isPlus={false}
        disabled={value <= 0 || disabledLeft}
        onPress={() => {
          setValue((old: number) => old - 1);
        }}
      />
      <Text
        style={[
          styles.fontW500,
          styles.font16,
          styles.textCenter,
          {minWidth: value < 10 ? 30 : 36},
        ]}>
        {value}
      </Text>
      <CounterBtn
        isPlus
        onPress={() => {
          setValue((old: number) => {
            !!extraOnPress && extraOnPress(old + 1);
            return old + 1;
          });
        }}
      />
    </View>
  </View>
);

export default ItemCounter;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  justifyBtn: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  itemCounterContainer: {
    width: WIDTH - 80,
    marginHorizontal: 24,
  },
  font16: {
    fontSize: 16,
    fontFamily: typography.medium,
  },
  textCenter: {
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgb(75,75,75)',
    fontSize: 12,
    fontFamily: typography.regular,
  },
  marTop4: {
    marginTop: 4,
  },
  fontW500: {
    fontFamily: typography.medium,
  },
});
