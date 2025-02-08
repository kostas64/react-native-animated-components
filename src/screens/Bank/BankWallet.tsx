import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar, StyleSheet, View} from 'react-native';

import WalletHeader from '@components/bank/WalletHeader';
import WalletCharts from '@components/bank/WalletCharts';

const BankWallet = () => {
  const isFocused = useIsFocused();

  if (isFocused) {
    StatusBar.setBarStyle('dark-content');
  }

  return (
    <>
      <View style={styles.container}>
        <WalletHeader style={styles.headerContainer} />
        <WalletCharts style={[styles.headerContainer, styles.spaceTop]} />
      </View>
    </>
  );
};

export default BankWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    marginHorizontal: 24,
  },
  spaceTop: {
    marginTop: 20,
  },
});
