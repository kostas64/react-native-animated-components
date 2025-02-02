import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WIDTH} from '@utils/device';
import Cards from '@components/bank/Cards';
import Button from '@components/bank/Button';
import BankHomeText from '@components/bank/BankHomeText';

const BankHome = () => {
  const insets = useSafeAreaInsets();

  const top = insets.top + WIDTH - 30;
  const bottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  return (
    <View style={styles.container}>
      <BankHomeText style={{top}} />
      <Cards style={{top: insets.top + 210}} />
      <Button label="Join Bankify now" style={{bottom}} />
    </View>
  );
};

export default BankHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#141111',
  },
});
