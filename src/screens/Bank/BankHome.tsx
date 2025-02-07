import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import {cards} from '@components/bank/constants';
import HomeHeader from '@components/bank/HomeHeader';
import CardDetail from '@components/bank/CardDetail';
import HomeActions from '@components/bank/HomeActions';
import Transactions from '@components/bank/Transactions';

const BankHome = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 142}}>
      <HomeHeader style={[styles.headerContainer, {paddingTop}]} />
      <HomeActions style={styles.actionsContainer} />
      <Transactions style={styles.transactionsContainer} />
      <CardDetail {...cards?.[0]} style={styles.transactionsContainer} />
    </ScrollView>
  );
};

export default BankHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    marginHorizontal: isIOS ? 4 : 0,
  },
  actionsContainer: {
    marginTop: 90,
    marginHorizontal: 28,
  },
  transactionsContainer: {
    marginTop: 24,
    marginLeft: 28,
  },
});
