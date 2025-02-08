import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';

import WalletHeader from '@components/bank/WalletHeader';
import WalletCharts from '@components/bank/WalletCharts';
import CardTransactions from '@components/bank/CardTransactions';

const BankWallet = () => {
  const isFocused = useIsFocused();

  if (isFocused) {
    StatusBar.setBarStyle('dark-content');
  }

  return (
    <>
      <View style={styles.container}>
        <WalletHeader style={styles.spaceBottom} />
        <FlatList
          data={[]}
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<WalletCharts style={styles.smSpaceTop} />}
          ListFooterComponent={<CardTransactions style={styles.spaceTop} />}
          ListFooterComponentStyle={styles.xlSpaceBottom}
        />
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
  spaceTop: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  smSpaceTop: {
    marginTop: 10,
    marginHorizontal: 24,
  },
  spaceBottom: {
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  xlSpaceBottom: {
    marginBottom: 142,
  },
});
