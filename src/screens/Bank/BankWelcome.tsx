import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WIDTH} from '@utils/device';
import Cards from '@components/bank/Cards';
import Button from '@components/bank/Button';
import {TBankNavigationProps} from './BankStack';
import BankWelcomeText from '@components/bank/BankWelcomeText';

const BankWelcome = () => {
  const navigation = useNavigation<TBankNavigationProps>();
  const insets = useSafeAreaInsets();

  const top = insets.top + WIDTH - 30;
  const bottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  const onPress = () => {
    navigation.replace('BankBottomStack');
  };

  return (
    <View style={styles.container}>
      <BankWelcomeText style={{top}} />
      <Cards style={_ => ({top: insets.top + 210})} />
      <Button label="Join Bankify now" style={{bottom}} onPress={onPress} />
    </View>
  );
};

export default BankWelcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#141111',
  },
});
