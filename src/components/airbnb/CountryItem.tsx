import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COUNTRIES} from './data';
import {TCountryItem} from './types';
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
        {
          paddingRight: index === COUNTRIES.length - 1 ? 24 : 16,
          paddingLeft: index === 0 ? 24 : 0,
        },
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
    borderColor: 'black',
  },
  borderGreyW1: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
});
