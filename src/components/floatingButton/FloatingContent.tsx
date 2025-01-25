import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {
  SM_FONT_UPSCALE_FACTOR,
  MED_FONT_UPSCALE_FACTOR,
  MAX_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import {SPACING} from './data';
import {typography} from '@utils/typography';

const FloatingContent = () => {
  const [promoCode, setPromoCode] = React.useState('');

  return (
    <>
      <Text
        style={styles.title}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        Black Friday
      </Text>
      <Text
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
        style={[
          styles.paragraph,
        ]}>{`Yo, Black Friday is here, check our sales starting at 40% 🎉\n\nUse BF23BF code`}</Text>
      <TextInput
        value={promoCode}
        onChangeText={setPromoCode}
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
        placeholder="Paste promo to save over 50%"
        placeholderTextColor={'#625d60'}
        style={styles.promoInput}
      />
      <View style={styles.checkoutButton}>
        <Text
          style={styles.checkoutLabel}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          Checkout
        </Text>
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
    color: 'white',
    fontFamily: typography.medium,
    paddingVertical: SPACING,
    backgroundColor: '#322d30',
    borderRadius: SPACING,
    marginBottom: SPACING / 2,
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
