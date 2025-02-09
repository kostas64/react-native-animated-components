import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';

import {typography} from '@utils/typography';
import {STOCKS_DATA} from '@components/bank/data';
import StockItem from '@components/bank/StockItem';
import {StocksItemProps} from '@components/bank/types';
import SectionHeader from '@components/bank/SectionHeader';

const BankStocks = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  if (isFocused) {
    StatusBar.setBarStyle('dark-content');
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: StocksItemProps;
    index: number;
  }) => {
    return <StockItem {...item} key={index} />;
  };
  return (
    <View style={[styles.container, {paddingTop}]}>
      <View style={[styles.spaceHorizontal, styles.headerContainer]}>
        <Image
          source={require('../../assets/img/bank/stocks.png')}
          style={styles.icon}
        />
        <SectionHeader label="Stocks" />
      </View>
      <FlatList
        data={STOCKS_DATA}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default BankStocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    backgroundColor: 'f7f7f7',
  },
  label: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spaceHorizontal: {
    marginHorizontal: 24,
  },
  contentContainer: {
    gap: 16,
    paddingTop: 24,
    paddingBottom: 150,
    overflow: 'visible',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
