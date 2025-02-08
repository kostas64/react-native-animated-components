import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import {cards} from '@components/bank/constants';
import HomeHeader from '@components/bank/HomeHeader';
import CardDetail from '@components/bank/CardDetail';
import HomeActions from '@components/bank/HomeActions';
import Transactions from '@components/bank/Transactions';

const BankHome = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  if (isFocused) {
    StatusBar.setBarStyle('light-content');
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.spaceBottom}>
        <HomeHeader style={[styles.headerContainer, {paddingTop}]} />
        <HomeActions style={styles.actionsContainer} />
        <Transactions style={styles.transactionsContainer} />
        <CardDetail {...cards?.[0]} style={styles.transactionsContainer} />
      </ScrollView>
    </>
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
  spaceBottom: {
    paddingBottom: 142,
  },
});
