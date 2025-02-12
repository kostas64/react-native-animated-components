import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {SPACING} from './data';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {SM_FONT_UPSCALE_FACTOR, MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const FloatingContent = () => {
  const [promoCode, setPromoCode] = React.useState('');

  return (
    <>
      <Text style={styles.title}>Black Friday</Text>
      <Text
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
        style={
          styles.paragraph
        }>{`Yo, Black Friday is here, check our sales starting at 40% 🎉\n\nUse BF23BF code`}</Text>
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
    color: Colors.WHITE,
    fontFamily: typography.bold,
    fontSize: 18,
  },
  paragraph: {
    marginVertical: SPACING,
    color: Colors.WHITE,
    fontFamily: typography.regular,
    height: 86,
  },
  promoInput: {
    fontSize: 16,
    paddingLeft: 14,
    color: Colors.WHITE,
    fontFamily: typography.medium,
    paddingVertical: SPACING,
    backgroundColor: Colors.DARK_CHARCOAL,
    borderRadius: SPACING,
    marginBottom: SPACING / 2,
  },
  checkoutButton: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING,
    backgroundColor: Colors.SIZZLING_SUNRISE,
  },
  checkoutLabel: {
    color: Colors.BLACK,
    fontSize: 20,
    fontFamily: typography.bold,
  },
});
