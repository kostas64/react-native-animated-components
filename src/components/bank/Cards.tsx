import React from 'react';
import {StyleSheet, View} from 'react-native';

import Card from './Card';
import {cards} from './data';
import {StyleProps} from './types';

const Cards = ({style}: StyleProps) => {
  return cards.map((card, index) => (
    <View
      key={index}
      style={[
        styles.cardContainer,
        {
          transform: [
            {rotate: `-${(cards.length - index) * 10}deg`},
            {translateY: (cards.length - index) * -60},
            {translateX: (cards.length - 1 - index) * -20},
          ],
        },
        style,
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
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 6,
  },
});
