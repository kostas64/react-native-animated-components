import {StyleSheet} from 'react-native';

import Card from './Card';
import {shadows} from './styles';
import {cards} from './constants';
import {StyleProps} from './types';
import Animated from 'react-native-reanimated';

const Cards = ({style, sharedElementTag}: StyleProps) => {
  return (
    <>
      {cards.map((card, index) => (
        <Animated.View
          sharedTransitionTag={`${sharedElementTag}-${index}`}
          key={index}
          style={[
            styles.cardContainer,
            shadows.shadow,
            {
              zIndex: index,
              transform: [
                {rotate: `-${(cards.length - index) * 10}deg`},
                {translateY: (cards.length - index) * -60},
                {translateX: (cards.length - 1 - index) * -20},
              ],
            },
            style?.(index),
          ]}>
          <Card delay={index * 250} key={card.cardNumber} {...card} />
        </Animated.View>
      ))}
    </>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: 'white',
  },
});
