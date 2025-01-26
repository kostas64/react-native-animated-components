import {
  View,
  ViewStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import {isIOS, MED_FONT_UPSCALE_FACTOR} from '@utils/device';

type FooterProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const Footer = ({onLayout, containerStyle}: FooterProps) => {
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, {paddingBottom: bottom}, containerStyle]}>
      <View>
        <Text style={styles.totalPrice}>Total Price</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceUnit}>{'$ '}</Text>
          <Text style={styles.priceLabel}>120</Text>
          <Text style={styles.frequency}>{' per day'}</Text>
        </View>
      </View>

      <Pressable
        style={({pressed}) => [
          styles.buttonContainer,
          {opacity: pressed ? 0.65 : 1},
        ]}>
        <Text
          style={styles.buttonLabel}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          {'Book Place'}
        </Text>
        <Entypo name="chevron-right" color={'white'} />
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 24,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 20,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: -4},
  },
  totalPrice: {
    fontFamily: typography.semiBold,
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceUnit: {
    color: '#f68043',
    fontFamily: typography.semiBold,
    fontSize: 12,
    lineHeight: isIOS ? 22 : 24,
  },
  priceLabel: {
    fontFamily: typography.bold,
    fontSize: 20,
  },
  frequency: {
    color: '#f68043',
    fontFamily: typography.semiBold,
    fontSize: 12,
    lineHeight: isIOS ? 28 : 34,
  },
  buttonContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#5db16e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 10,
    shadowColor: '#5db16e',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 4},
  },
  buttonLabel: {
    color: 'white',
    fontFamily: typography.semiBold,
    fontSize: 12,
    lineHeight: 26,
  },
});
