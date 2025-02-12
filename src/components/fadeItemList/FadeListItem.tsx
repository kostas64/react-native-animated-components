import Animated, {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Image, StyleSheet, View} from 'react-native';

import {
  WIDTH,
  SM_FONT_UPSCALE_FACTOR,
  MED_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {FadeItemProps} from './types';
import {typography} from '@utils/typography';
import {AVATAR_SIZE, ITEM_SIZE, SPACING} from './constants';

const FadeListItem = ({
  item,
  index,
  scrollY,
}: FadeItemProps & {
  scrollY: SharedValue<number>;
}) => {
  const inputRange = [
    -1,
    0,
    (ITEM_SIZE + 8) * index,
    (ITEM_SIZE + 8) * (index + 2),
  ];

  const opacityInputRange = [
    -1,
    0,
    (ITEM_SIZE + 8) * index,
    (ITEM_SIZE + 8) * (index + 1),
  ];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, opacityInputRange, [1, 1, 1, 0]),
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          inputRange,
          [1, 1, 1, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.parentViewItem, animatedStyle]}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text
          style={styles.name}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          {item.name}
        </Text>
        <Text style={styles.job} maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
          {item.jobTitle}
        </Text>
        <Text style={styles.email} allowFontScaling={false}>
          {item.email}
        </Text>
      </View>
    </Animated.View>
  );
};

export default FadeListItem;

const styles = StyleSheet.create({
  parentViewItem: {
    height: 118,
    flexDirection: 'row',
    padding: SPACING,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 3,
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: SPACING / 2,
  },
  textContainer: {
    width: WIDTH - 2 * SPACING - SPACING - AVATAR_SIZE - SPACING,
  },
  name: {
    fontSize: 22,
    color: Colors.BLACK,
    fontFamily: typography.semiBold,
  },
  job: {
    fontSize: 16,
    opacity: 0.7,
    color: Colors.BLACK,
    fontFamily: typography.regular,
  },
  email: {
    opacity: 0.8,
    color: Colors.RICH_ELECTRIC_BLUE,
    fontFamily: typography.regular,
  },
});
