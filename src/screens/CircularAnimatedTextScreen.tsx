import Animated, {
  withTiming,
  interpolate,
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {G, Svg, Circle} from 'react-native-svg';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  brush,
  COLOURS,
  BOX_SIZE,
  NUM_LETTER_CIRCLES,
} from '@components/circularAnimatedText/data';
import ColorBox from '@components/circularAnimatedText/ColorBox';
import AnimCircle from '@components/circularAnimatedText/AnimCricle';

const CircularAnimatedTextScreen = () => {
  const insets = useSafeAreaInsets();
  const openBrush = useSharedValue(0);

  const activeColor = useSharedValue(COLOURS[0]);

  const ARRAY = new Array(NUM_LETTER_CIRCLES).fill(0);
  const marginTop = insets.top > 0 ? insets.top : 24;

  const onPressBrush = () => {
    const toValue = openBrush.value === 0 ? 1 : 0;
    openBrush.value = withTiming(toValue);
  };

  const renderItem = ({
    item,
    index,
    activeColor,
    onColorTouch,
  }: {
    item: string;
    index: number;
    activeColor: SharedValue<string>;
    onColorTouch: (color: string) => void;
  }) => {
    const isLast = index === COLOURS.length - 1;

    return (
      <ColorBox
        item={item}
        index={index}
        isLast={isLast}
        onColorTouch={onColorTouch}
        activeColor={activeColor}
      />
    );
  };

  const onColorTouch = (color: string) => {
    activeColor.value = color;
  };

  const listStyle = useAnimatedStyle(() => ({
    bottom: interpolate(openBrush.value, [0, 1], [-48, 48]),
  }));

  return (
    <>
      <Pressable
        onPress={onPressBrush}
        style={[styles.imgContainer, {marginTop}]}>
        <Image source={brush} style={[styles.img]} />
      </Pressable>

      <View style={styles.svgContainer}>
        <Svg
          height={`${BOX_SIZE}`}
          width={`${BOX_SIZE}`}
          viewBox={`0 0 ${BOX_SIZE + 100} ${BOX_SIZE + 100}`}>
          <G id="circle">
            <Circle
              fill="none"
              r={(BOX_SIZE + 100) / 8}
              x={(BOX_SIZE + 100) / 2}
              y={(BOX_SIZE + 100) / 2}
              strokeWidth={10}
              stroke="transparent"
            />
          </G>
          {ARRAY.map((_, i) => (
            <AnimCircle
              key={`circle-${i}`}
              index={i}
              activeColor={activeColor}
            />
          ))}
        </Svg>
      </View>

      <Animated.FlatList
        horizontal
        data={COLOURS}
        renderItem={({item, index}) =>
          renderItem({item, index, activeColor, onColorTouch})
        }
        style={[styles.listContainer, listStyle]}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
      />
    </>
  );
};

export default CircularAnimatedTextScreen;

const styles = StyleSheet.create({
  svgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    position: 'absolute',
    paddingHorizontal: 24,
  },
  imgContainer: {
    position: 'absolute',
    right: 24,
    zIndex: 1,
  },
  img: {
    width: 32,
    height: 32,
  },
});
