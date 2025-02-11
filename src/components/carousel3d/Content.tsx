import {StyleSheet, View} from 'react-native';

import {SPACING} from './constants';
import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {ICarouselDataType} from './types';
import {typography} from '@utils/typography';
import {SM_FONT_UPSCALE_FACTOR, MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const Content = (item: ICarouselDataType) => {
  return (
    <>
      <Text style={styles.itemTitle} numberOfLines={1} adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text
        style={styles.subtitle}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {item.subtitle}
      </Text>
      <View style={styles.priceContainer}>
        <Text
          style={styles.price}
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
          {item.price}
        </Text>
        <Text style={styles.currency}>USD</Text>
      </View>
    </>
  );
};

export default Content;

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: typography.bold,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.4,
    color: Colors.BLACK,
    fontFamily: typography.medium,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: SPACING,
  },
  price: {
    color: Colors.BLACK,
    fontSize: 42,
    letterSpacing: 3,
    marginRight: 8,
    fontFamily: typography.bold,
  },
  currency: {
    color: Colors.BLACK,
    fontSize: 16,
    lineHeight: 36,
    alignSelf: 'flex-end',
    fontFamily: typography.bold,
  },
});
