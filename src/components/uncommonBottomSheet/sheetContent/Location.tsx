import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {View, Image, StyleProp, ViewStyle, StyleSheet} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';

const asset = require('@assets/img/camp.png');

type LocationProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

const Location = ({containerStyle}: LocationProps) => {
  return (
    <View style={[styles.rowCenter, styles.container, containerStyle]}>
      <View style={[styles.bigGap, styles.rowCenter]}>
        <Image source={asset} style={styles.img} />
        <View style={styles.gap}>
          <View style={[styles.gap, styles.rowCenter]}>
            <Text style={styles.distance}>20.6</Text>
            <Text style={styles.distanceUnit}>km</Text>
          </View>
          <Text style={styles.city}>Banten, Sukabumi</Text>
        </View>
      </View>
      <View style={styles.pinContainer}>
        <Fontisto name="map-marker" color={'#5db16e'} size={26} />
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  gap: {
    gap: 4,
  },
  bigGap: {
    gap: 12,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  distance: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  distanceUnit: {
    fontSize: 16,
    fontFamily: typography.medium,
  },
  city: {
    color: '#a1a1a1',
    fontSize: 12,
    fontFamily: typography.medium,
  },
  pinContainer: {
    marginRight: 8,
    padding: 16,
    paddingVertical: 13,
  },
});
