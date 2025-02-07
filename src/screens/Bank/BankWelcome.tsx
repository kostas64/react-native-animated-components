import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS, WIDTH} from '@utils/device';
import Cards from '@components/bank/Cards';
import Button from '@components/bank/Button';
import {shadows} from '@components/bank/styles';
import {TBankNavigationProps} from './BankStack';
import BankWelcomeText from '@components/bank/BankWelcomeText';

const BankWelcome = () => {
  const navigation = useNavigation<TBankNavigationProps>();
  const insets = useSafeAreaInsets();

  const [changeShadow, setChangeShadow] = useState(false);

  const top = insets.top + WIDTH - 30;
  const bottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  const onPress = () => {
    if (isIOS) {
      setChangeShadow(true);

      requestAnimationFrame(() => {
        navigation.replace('BankBottomStack');
      });
    } else {
      navigation.replace('BankBottomStack');
    }
  };

  return (
    <View style={styles.container}>
      <BankWelcomeText style={{top}} />
      <Cards
        sharedElementTag={isIOS ? 'cards' : undefined}
        style={_ => [
          {top: insets.top + 210},
          changeShadow && shadows.lowShadow,
        ]}
      />
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
