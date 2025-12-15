import {useNavigation} from '@react-navigation/native';
import {Animated, Image, Pressable, StyleSheet} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

import {Colors} from '@utils/colors';
import {HomeListItemsProps} from './types';
import {THomeNavigationProps} from 'src/App';
import {HEIGHT, isIOS, WIDTH} from '@utils/device';
import {ITEM_HEIGHT, ITEM_WIDTH} from './constants';
import {shadow} from '@components/addButtonMove/styles';

const HomeListItem = ({item, index, scrollX}: HomeListItemsProps) => {
  const navigation = useNavigation<THomeNavigationProps>();

  const inputRange = [
    ITEM_WIDTH * (index - 1),
    ITEM_WIDTH * index,
    ITEM_WIDTH * (index + 1),
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [
      (WIDTH - ITEM_WIDTH) / 2 + 16,
      (WIDTH - ITEM_WIDTH) / 2 - 2,
      (WIDTH - ITEM_WIDTH) / 2 + 16,
    ],
    extrapolate: 'clamp',
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [-((HEIGHT * 0.6) / 20), 0, -((HEIGHT * 0.6) / 20)],
    extrapolate: 'clamp',
  });

  const onPress = () => {
    //@ts-ignore
    navigation.navigate(item.screen);
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...(isIOS && item.isDark && styles.whiteShadow),
        transform: [{scale}, {translateX}, {translateY}],
      }}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => ({opacity: pressed && isIOS ? 0.5 : 1})}>
        <Image
          borderRadius={64}
          resizeMode="cover"
          source={item.image}
          style={{
            ...styles.image,
            ...(item.isDark && {
              shadowColor: Colors.WHITE,
              backgroundColor: Colors.CHINESE_BLACK,
            }),
          }}
        />
      </Pressable>
    </Animated.View>
  );
};

export default HomeListItem;

const styles = StyleSheet.create({
  container: {
    zIndex: 10000000000,
    width: ITEM_WIDTH,
    alignItems: 'center',
    ...(isIOS && shadow),
    marginTop:
      (HEIGHT - ITEM_HEIGHT - (initialWindowMetrics?.insets?.top ?? 0)) / 2,
  },
  whiteShadow: {
    shadowColor: Colors.WHITE,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 34,
    ...shadow,
  },
});
