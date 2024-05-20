import {
  Text,
  View,
  FlatList,
  Keyboard,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  ViewStyle,
  ColorValue,
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
import React, {useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SPACING = 16;
const {width} = Dimensions.get('screen');

const FAKE_ARRAY = new Array(16).fill(0);
const image = require('@assets/img/arrow.png');

const AnimPress = Animated.createAnimatedComponent(Pressable);

type TFloatingElement = {
  /** Is the final animated height */
  snapHeight: number;

  /** Is the content when modal is open*/
  content: React.ReactNode;

  /** Is the final animated width
   * @default screenWidth - 64
   */
  snapWidth?: number;

  /** Is the style of the FAB (Floating Action Button) container */
  containerStyle?: ViewStyle | ViewStyle[];

  /** Is the color behind the FAB when its extended
   * @default rgb(0,0,0)
   */
  backdropColor?: ColorValue;

  /** Is the opacity to animate backdrop color when FAB opens. Value should be between 0 and 1
   * @default 0.5
   */
  backdropOpacity?: number;

  /** Is the time that animation needs to fade in (ms)
   * @default 150ms
   */
  fadeInDuration?: number;

  /** Is the time that animation needs to fade in (ms)
   * @default 10ms
   */
  fadeOutDuration?: number;

  /** Hide or show close button
   *  @default true
   */
  showClose?: boolean;

  /** Is the icon's tint color
   * @default
   * #000000
   */
  iconTintColor?: ColorValue;

  /** Is the FAB's button clickable area when FAB is a extended (open state)
   * @default
   * top: 8 left: 8 right: 8 bottom: 8
   */
  hitSlopWithFabOpen?: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };

  /** Is the FAB's button clickable area when FAB is a button (closed state)
   * @default
   * top: 16 left: 16 right: 16 bottom: 16
   */
  hitSlopWithFabClosed?: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
};

const FloatingContent = () => {
  const [promoCode, setPromoCode] = React.useState('');

  return (
    <>
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
    </>
  );
};

const FloatingElement = ({
  content,
  snapHeight,
  snapWidth,
  containerStyle = {},
  backdropColor,
  iconTintColor,
  backdropOpacity,
  fadeInDuration,
  fadeOutDuration,
  showClose = true,
  hitSlopWithFabOpen,
  hitSlopWithFabClosed,
}: TFloatingElement) => {
  const [showBack, setShowBack] = React.useState(true);

  let dismissKeybTimeout = useRef<ReturnType<typeof setInterval> | null>(null);

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

  //Checks
  const hasCloseButton = showClose || (!showClose && !showBack);
  const hasCustomOpenHitslop = !!hitSlopWithFabOpen && isOpen.value === 1;
  const hasCustomClosedHitslop = !!hitSlopWithFabClosed && !isOpen.value;

  const buttonHitslop = hasCustomOpenHitslop
    ? hitSlopWithFabOpen
    : hasCustomClosedHitslop
    ? hitSlopWithFabClosed
    : !showBack
    ? {top: 16, left: 16, right: 16, bottom: 16}
    : {top: 8, left: 8, right: 8, bottom: 8};

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

  const closeAnimation = React.useCallback(() => {
    const contDur = fadeOutDuration || 10;
    const finalWidth = snapWidth || width - 4 * SPACING;

    contentOpacity.value = withTiming(0, {duration: contDur});
    backOpacity.value = withTiming(0);
    widthFloating.value = withTiming(60);
    heightFloating.value = withTiming(60);
    imageRotate.value = withTiming(1);
    translateCircle.value = withTiming(
      (width - 30 - (width - finalWidth) / 2) / 2,
      {},
      finished => {
        if (finished) {
          isOpen.value = 0;
        }
      },
    );

    if (keyboard.height.value > 0) {
      dismissKeybTimeout.current = setTimeout(() => {
        Keyboard.dismiss();
      }, 100);
    }
  }, []);

  const openAnimation = React.useCallback(() => {
    const contDur = fadeInDuration || 150;
    const backDropOpacity = backdropOpacity || 0.5;
    const finalWidth = snapWidth || width - 4 * SPACING;

    if (isOpen.value === 0) {
      contentOpacity.value = withDelay(150, withTiming(1, {duration: contDur}));
      backOpacity.value = withTiming(backDropOpacity);
      widthFloating.value = withTiming(finalWidth);
      heightFloating.value = withTiming(snapHeight);
      imageRotate.value = withTiming(0);
      translateCircle.value = withTiming(
        (width - finalWidth) / 2,
        {},
        finished => {
          if (finished) {
            isOpen.value = 1;
          }
        },
      );
    }
  }, []);

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

  //Clean timer set in case keyboard opened
  React.useEffect(() => {
    return () => {
      !!dismissKeybTimeout.current && clearTimeout(dismissKeybTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Background */}
      {showBack && (
        <AnimPress
          onPress={closeAnimation}
          style={[
            backStyle,
            styles.background,
            !!backdropColor && {backgroundColor: backdropColor},
          ]}
        />
      )}
      {/* Container */}
      <AnimPress
        onPress={openAnimation}
        style={[translateStyle, containerStyle]}>
        {/* Content */}
        <Animated.View style={contentAnimStyle}>{content}</Animated.View>

        {/* Close / Cross Button */}
        {hasCloseButton && (
          <Pressable
            style={styles.imageContainer}
            hitSlop={buttonHitslop}
            onPress={showBack ? closeAnimation : openAnimation}>
            <Animated.Image
              source={image}
              style={[closeStyle, styles.image, {tintColor: iconTintColor}]}
            />
          </Pressable>
        )}
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

  const renderItem = ({index}: {index: number}) => (
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
        <FloatingElement
          snapHeight={310}
          iconTintColor={'#FFF'}
          content={<FloatingContent />}
          containerStyle={[styles.container, {bottom: insets.bottom + 24}]}
        />
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
