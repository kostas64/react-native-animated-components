import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {COUNTRIES} from './data';
import Text from '@components/Text';
import {TCountryItem} from './types';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';

const CountryItem = ({
  item,
  index,
  isSelected,
  setCountry,
  animateWhen,
}: TCountryItem) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      key={`country-${index}`}
      onPress={() => {
        setCountry(item.label);
        animateWhen();
      }}
      style={[
        styles.mapImgContainer,
        index === COUNTRIES.length - 1
          ? styles.spaceRight24
          : styles.spaceRight16,
        index === 0 ? styles.spaceLeft24 : styles.spaceLeft0,
      ]}>
      {/* @ts-ignore */}
      <Image
        borderRadius={8}
        source={item.img}
        style={[
          styles.mapImg,
          isSelected ? styles.borderBlackW2 : styles.borderGreyW1,
        ]}
      />
      <Text style={[styles.marTop8, isSelected && styles.bold]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default CountryItem;

const styles = StyleSheet.create({
  bold: {
    fontFamily: typography.semiBold,
  },
  marTop8: {
    marginTop: 8,
  },
  mapImgContainer: {
    borderRadius: 8,
    marginTop: 16,
  },
  mapImg: {
    width: 116,
    height: 116,
  },
  borderBlackW2: {
    borderWidth: 2,
    borderColor: Colors.BLACK,
  },
  borderGreyW1: {
    borderWidth: 1,
    borderColor: Colors.PLATINUM,
  },
  spaceRight24: {
    paddingRight: 24,
  },
  spaceRight16: {
    paddingRight: 16,
  },
  spaceLeft0: {
    paddingLeft: 0,
  },
  spaceLeft24: {
    paddingLeft: 24,
  },
});
