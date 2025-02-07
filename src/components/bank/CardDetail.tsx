import React from 'react';
import {StyleSheet, View} from 'react-native';

import {shadows} from './styles';
import {CardDetailProps} from './types';
import SectionHeader from './SectionHeader';
import CardDetailRow from './CardDetailRow';

const CardDetail = ({
  cardNumber,
  cardholderName,
  expirationDate,
  style,
}: CardDetailProps) => {
  return (
    <View style={style}>
      <SectionHeader label="Card Detail" rightLabel="Show All" />

      <View style={[styles.boxContainer, shadows.veryJustShadow]}>
        <CardDetailRow
          label={'Holder Name'}
          value={cardholderName}
          pressedStyle={styles.pressedFirst}
        />
        <CardDetailRow label={'Card Number'} value={cardNumber} />
        <CardDetailRow
          label={'Exp. Date'}
          value={expirationDate}
          pressedStyle={styles.pressedLast}
        />
      </View>
    </View>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  boxContainer: {
    marginRight: 24,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  pressedFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pressedLast: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
