import {
  G,
  Svg,
  TSpan,
  Circle,
  TextPath,
  Text as SvgText,
} from 'react-native-svg';
import Animated, {
  withRepeat,
  withTiming,
  interpolate,
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';

import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const FONT_SIZE = 18;
const BOX_SIZE = 400;
const NUM_LETTER_CIRCLES = 3;
const CIRCLES_SPACING = 30;
const LETTER_SPACING = 2;
const ROT_DEG = 360;
const SCALE = 1.3;
const TEXT =
  'ホヤュホサめゃほさけホヤュホサめゃほさけホヤュホサめゃほさけホけホ';

const COLOURS: string[] = [
  'rgb(255,0,0)',
  'rgb(34,34,34)',
  'rgb(255,135,0)',
  'rgb(60,110,113)',
  'rgb(15,163,177)',
  'rgb(112,78,46)',
  'rgb(10,239,255)',
  'rgb(20,125,245)',
  'rgb(88,10,255)',
  'rgb(190, 10, 255)',
];

const brush = require('../assets/img/brush.png');

const AnimText = Animated.createAnimatedComponent(SvgText);

const AnimCircle = ({
  _,
  activeColor,
  index,
}: {
  _?: any;
  activeColor: SharedValue<string>;
  index: number;
}) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 2500}), -1, true);
  }, []);

  const animStyle = useAnimatedStyle(() => {
    const translateInterpolation = interpolate(
      progress.value,
      [0, 1],
      [-(BOX_SIZE + 100) / 2, (-(BOX_SIZE + 100) / 2) * SCALE],
    );

    const rotDirection = index % 2 === 0 ? [0, ROT_DEG] : [ROT_DEG, 0];

    return {
      transform: [
        {translateX: BOX_SIZE + 100},
        {translateY: BOX_SIZE + 100},
        {rotate: `${interpolate(progress.value, [0, 1], rotDirection)}deg`},
        {translateX: translateInterpolation},
        {translateY: translateInterpolation},
        {scale: interpolate(progress.value, [0, 1], [1, SCALE])},
      ],
      opacity: (index + 1) / NUM_LETTER_CIRCLES,
    };
  });

  const animProps = useAnimatedProps(() => ({
    fill: activeColor.value,
  }));

  return (
    <AnimText
      style={animStyle}
      key={`circle-${index}`}
      animatedProps={animProps}
      letterSpacing={LETTER_SPACING}
      fontSize={`${FONT_SIZE + index}`}>
      <TextPath href="#circle">
        <TSpan dx="-20" dy={-((index + 1) * CIRCLES_SPACING)}>
          {TEXT}
        </TSpan>
      </TextPath>
    </AnimText>
  );
};

const ColorBox = ({
  item,
  isLast,
  activeColor,
  onColorTouch,
}: {
  item: string;
  index: number;
  isLast: boolean;
  activeColor: SharedValue<string>;
  onColorTouch: (color: string) => void;
}) => {
  const borderColor = useAnimatedStyle(() => ({
    borderWidth: activeColor.value === item ? 3 : 1,
  }));

  return (
    <Animated.View
      onTouchStart={() => onColorTouch(item)}
      style={[
        styles.colorItem,
        borderColor,
        {backgroundColor: item, marginRight: isLast ? 48 : 24},
      ]}
    />
  );
};

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
  separator: {
    width: 24,
  },
  colorItem: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
  },
});
