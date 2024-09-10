import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {SPACING} from './data';
import {typography} from '@utils/typography';

const FloatingContent = () => {
  const [promoCode, setPromoCode] = React.useState('');

  return (
    <>
      <Text style={styles.title}>Black Friday</Text>
      <Text
        style={[
          styles.paragraph,
        ]}>{`Yo, Black Friday is here, check our sales starting at 40% 🎉\n\nUse BF23BF code`}</Text>
      <TextInput
        value={promoCode}
        onChangeText={setPromoCode}
        placeholder="Paste promo to save over 50%"
        placeholderTextColor={'#625d60'}
        style={styles.promoInput}
      />
      <View style={styles.checkoutButton}>
        <Text style={styles.checkoutLabel}>Checkout</Text>
      </View>
    </>
  );
};

export default FloatingContent;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: typography.bold,
    fontSize: 18,
    height: 24,
  },
  paragraph: {
    marginVertical: SPACING,
    color: 'white',
    fontFamily: typography.regular,
    height: 86,
  },
  promoInput: {
    fontSize: 16,
    paddingLeft: 14,
    fontFamily: typography.medium,
    paddingVertical: SPACING,
    backgroundColor: '#322d30',
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  checkoutButton: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fedc00',
    borderRadius: SPACING,
  },
  checkoutLabel: {
    color: 'black',
    fontSize: 20,
    fontFamily: typography.bold,
  },
});
