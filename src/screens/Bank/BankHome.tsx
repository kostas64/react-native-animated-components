import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import HomeHeader from '@components/bank/HomeHeader';
import HomeActions from '@components/bank/HomeActions';

const BankHome = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  return (
    <View style={styles.container}>
      <HomeHeader style={[styles.headerContainer, {paddingTop}]} />
      <HomeActions style={styles.actionsContainer} />
    </View>
  );
};

export default BankHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginHorizontal: isIOS ? 4 : 0,
  },
  actionsContainer: {
    marginTop: 86,
    marginHorizontal: 28,
  },
});
