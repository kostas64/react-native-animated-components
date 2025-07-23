import {Animated, StyleSheet, View} from 'react-native';

import {DATA} from './data';
import Content from './Content';
import {WIDTH} from '@utils/device';
import {DescriptionProps} from './types';
import {IMAGE_WIDTH, SPACING} from './constants';

const Description = ({scrollX}: DescriptionProps) => {
  return (
    <View style={styles.container}>
      {DATA.map((item, index) => {
        const inputRange = [
          (index - 1) * WIDTH,
          index * WIDTH,
          (index + 1) * WIDTH,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [50, 0, 20],
        });
        return (
          <Animated.View
            key={item.key}
            style={[
              styles.itemContainer,
              {
                opacity,
                transform: [{perspective: IMAGE_WIDTH * 4}, {translateX}],
              },
            ]}>
            <Content {...item} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    width: IMAGE_WIDTH,
    alignItems: 'center',
    paddingHorizontal: SPACING * 2,
    marginLeft: SPACING * 2,
    zIndex: 1,
  },
  itemContainer: {
    position: 'absolute',
    backfaceVisibility: 'visible',
  },
});
