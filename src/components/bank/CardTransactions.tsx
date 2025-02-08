import React from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Transaction from './Transaction';
import {CARD_TRANSACTIONS} from './data';
import SectionHeader from './SectionHeader';
import {TransactionItemProps} from './types';

const CardTransactions = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: TransactionItemProps;
    index: number;
  }) => (
    <Transaction
      amount={item.amount}
      key={index}
      beenAdded={item.type === 'Income'}
      date={item.date}
      label={item.label}
      description={item.type}
    />
  );

  return (
    <View style={[styles.gap, style]}>
      <SectionHeader label="Card Transactions" />
      <FlatList
        data={CARD_TRANSACTIONS}
        style={styles.gap}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CardTransactions;

const styles = StyleSheet.create({
  gap: {
    gap: 10,
  },
});
