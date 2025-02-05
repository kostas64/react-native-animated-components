import React from 'react';
import {StyleSheet, View} from 'react-native';

import Card from './Card';
import {shadows} from './styles';
import {cards} from './constants';
import {StyleProps} from './types';

const Cards = ({style}: StyleProps) => {
  return cards.map((card, index) => (
    <View
      key={index}
      style={[
        styles.cardContainer,
        shadows.shadow,
        {
          transform: [
            {rotate: `-${(cards.length - index) * 10}deg`},
            {translateY: (cards.length - index) * -60},
            {translateX: (cards.length - 1 - index) * -20},
          ],
        },
        style?.(index),
      ]}>
      <Card delay={index * 250} key={card.cardNumber} {...card} />
    </View>
  ));
};

export default Cards;

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: 'white',
  },
});
