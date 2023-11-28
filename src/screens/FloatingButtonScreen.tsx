import {
  Text,
  View,
  FlatList,
  Keyboard,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  runOnJS,
  withDelay,
  withTiming,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedKeyboard,
  useAnimatedReaction,
} from 'react-native-reanimated';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SPACING = 16;
const {width} = Dimensions.get('screen');

const FAKE_ARRAY = new Array(16).fill(0);
const image = require('@assets/img/arrow.png');

const AnimPress = Animated.createAnimatedComponent(Pressable);

const FloatingElement = () => {
  const insets = useSafeAreaInsets();
  const [showBack, setShowBack] = React.useState(true);
  const [promoCode, setPromoCode] = React.useState('');
  const buttonHitslop = {top: 8, left: 8, right: 8, bottom: 8};

  //Animated values
  const isOpen = useSharedValue(0);
  const keyboard = useAnimatedKeyboard();
  const contentOpacity = useSharedValue(0);
  const heightFloating = useSharedValue(60);
  const widthFloating = useSharedValue(60);
  const backOpacity = useSharedValue(0);
  const imageRotate = useSharedValue(1);
  const translateCircle = useSharedValue(
    (width - 30 - (width - (width - 4 * SPACING)) / 2) / 2,
  );

  // Update state to show/hide background
  // Triggered when background opacity change
  useAnimatedReaction(
    () => {
      return backOpacity.value > 0;
    },
    shouldHide => {
      'worklet';
      if (!shouldHide) {
        runOnJS(setShowBack)(false);
      } else {
        runOnJS(setShowBack)(true);
      }
    },
  );

  const closeAnimation = () => {
    keyboard.height.value > 0 && Keyboard.dismiss();
    contentOpacity.value = withTiming(0, {duration: 50});
    backOpacity.value = withTiming(0);
    widthFloating.value = withTiming(60);
    heightFloating.value = withTiming(60);
    imageRotate.value = withTiming(1);
    translateCircle.value = withTiming(
      (width - 30 - (width - (width - 4 * SPACING)) / 2) / 2,
      {},
      finished => {
        if (finished) {
          isOpen.value = 0;
        }
      },
    );
  };

  const openAnimation = () => {
    if (isOpen.value === 0) {
      contentOpacity.value = withDelay(150, withTiming(1, {duration: 150}));
      backOpacity.value = withTiming(0.5);
      widthFloating.value = withTiming(width - 4 * SPACING);
      heightFloating.value = withTiming(310);
      imageRotate.value = withTiming(0);
      translateCircle.value = withTiming(
        (width - (width - 4 * SPACING)) / 2,
        {},
        finished => {
          if (finished) {
            isOpen.value = 1;
          }
        },
      );
    }
  };

  const translateStyle = useAnimatedStyle(() => {
    return {
      left: translateCircle.value,
      width: widthFloating.value,
      height: heightFloating.value,
      transform: [
        {
          translateY: withSpring(-keyboard.height.value, {
            damping: 15,
          }),
        },
      ],
    };
  });

  const backStyle = useAnimatedStyle(() => ({
    opacity: backOpacity.value,
  }));

  const contentAnimStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const closeStyle = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${interpolate(imageRotate.value, [0, 1], [0, 45])}deg`},
    ],
  }));

  return (
    <>
      {/* Background */}
      {showBack && (
        <AnimPress
          onPress={closeAnimation}
          style={[backStyle, styles.background]}
        />
      )}
      {/* Container */}
      <AnimPress
        onPress={openAnimation}
        style={[
          translateStyle,
          styles.container,
          {bottom: insets.bottom + 24},
        ]}>
        {/* Content */}
        <Animated.View style={contentAnimStyle}>
          <Text style={styles.title}>Black Friday</Text>

          <Text
            style={[
              styles.paragraph,
            ]}>{`Yo, Black Friday is here, check our sales starting at 40% 🎉\n\nUse BF23BF code`}</Text>

          <TextInput
            value={promoCode}
            onChangeText={setPromoCode}
            placeholder="Paste promo to save over 50%"
            placeholderTextColor={'#625d60'}
            style={styles.promoInput}
          />

          <View style={styles.checkoutButton}>
            <Text style={styles.checkoutLabel}>Checkout</Text>
          </View>
        </Animated.View>

        {/* Close / Cross Button */}
        <Pressable
          style={styles.imageContainer}
          hitSlop={buttonHitslop}
          onPress={showBack ? closeAnimation : openAnimation}>
          <Animated.Image source={image} style={[closeStyle, styles.image]} />
        </Pressable>
      </AnimPress>
    </>
  );
};

const FakeItem = ({index}: {index: number}) => {
  const RANDOM_NUM1 = Math.floor(Math.random() * 255);
  const RANDOM_NUM2 = Math.floor(Math.random() * 255);
  const RANDOM_NUM3 = Math.floor(Math.random() * 255);

  const itemStyle = {
    marginRight: index % 2 === 0 ? SPACING : 0,
    backgroundColor: `rgb(${RANDOM_NUM1},${RANDOM_NUM2},${RANDOM_NUM3})`,
  };

  return <TouchableOpacity style={[styles.item, itemStyle]} />;
};

const FloatingButton = () => {
  const insets = useSafeAreaInsets();

  const renderItem = ({item, index}: {item: number; index: number}) => (
    <FakeItem key={index} index={index} />
  );

  return (
    <>
      <View style={[styles.positionItems, {paddingTop: insets.top}]}>
        <FlatList
          numColumns={2}
          data={FAKE_ARRAY}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <FloatingElement />
      </View>
    </>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  background: {
    width: '150%',
    height: '150%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgb(0,0,0)',
  },
  container: {
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: 'rgb(30,30,30)',
    padding: 24,
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    height: 24,
  },
  paragraph: {
    marginVertical: SPACING,
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    height: 86,
  },
  item: {
    width: (width - SPACING * 3) / 2,
    height: (width - SPACING * 3) / 2,
    marginBottom: SPACING,
  },
  imageContainer: {
    top: 17,
    right: 18,
    position: 'absolute',
  },
  image: {
    tintColor: 'white',
    height: 24,
    width: 24,
  },
  promoInput: {
    fontSize: 16,
    paddingLeft: 14,
    fontWeight: '700',
    paddingVertical: SPACING,
    backgroundColor: '#322d30',
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  checkoutButton: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fedc00',
    borderRadius: SPACING,
  },
  checkoutLabel: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  positionItems: {
    alignItems: 'center',
  },
});
