import {StyleSheet, Text, View} from 'react-native';

import {SPACING} from './constants';
import {ICarouselDataType} from './types';
import {typography} from '@utils/typography';

const Content = (item: ICarouselDataType) => {
  return (
    <>
      <Text style={styles.itemTitle} numberOfLines={1} adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.currency}>USD</Text>
      </View>
    </>
  );
};

export default Content;

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: typography.bold,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.4,
    color: 'black',
    fontFamily: typography.medium,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: SPACING,
  },
  price: {
    color: 'black',
    fontSize: 42,
    letterSpacing: 3,
    marginRight: 8,
    fontFamily: typography.bold,
  },
  currency: {
    color: 'black',
    fontSize: 16,
    lineHeight: 36,
    alignSelf: 'flex-end',
    fontFamily: typography.bold,
  },
});
