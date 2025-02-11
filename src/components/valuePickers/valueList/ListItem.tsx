import {StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import Text from '@components/Text';
import {TListItem, TScrollOffset} from './types';
import {SM_FONT_UPSCALE_FACTOR} from '@utils/device';

const ListItem = ({
  item,
  index,
  unit,
  isLast,
  scrollOffset,
}: TListItem & TScrollOffset) => {
  const animStyle = useAnimatedStyle(() => ({
    height: 30,
    marginTop: index === 0 ? 20 : 0,
    marginBottom: isLast ? 30 : 0,
    opacity: interpolate(
      scrollOffset.value,
      [
        (index - 4) * 30,
        (index - 3) * 30,
        (index - 2) * 30,
        (index - 1) * 30,
        index * 30,
        (index + 1) * 30,
        (index + 2) * 30,
      ],
      [0.25, 0.5, 1, 0.5, 0.25, 0, 0],
    ),
  }));

  return (
    <Animated.View style={animStyle}>
      <Text maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR} style={styles.item}>
        {typeof item === 'number' ? `${item}${unit}` : ''}
      </Text>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 6,
  },
});
