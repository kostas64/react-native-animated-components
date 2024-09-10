import Animated, {
  withTiming,
  interpolate,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useCallback} from 'react';
import Haptic from 'react-native-haptic-feedback';
import {Image, ImageSourcePropType, Pressable, StyleSheet} from 'react-native';

import MessageItem from './MessageItem';
import {HAPTIC_CONFIG} from '@utils/haptics';
import {isAndroid, WIDTH} from '@utils/device';
import {BACKGROUND_BLUR_RADIUS, EMOJI} from './data';
import {TBackgroundProps, TEmojiItemProps} from './types';

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const triggerSelectionHaptik = () => {
  if (isAndroid) {
    Haptic.trigger('effectClick', HAPTIC_CONFIG);
  } else {
    Haptic.trigger('selection', HAPTIC_CONFIG);
  }
};

const Background = ({
  opacity,
  captureUri,
  clonedItem,
  clonedItemToPass,
  onPressOut,
}: TBackgroundProps) => {
  const animateDismiss = useSharedValue(0);

  const emojiStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animateDismiss.value, [0, 1], [0, 1]),
    transform: [{scale: interpolate(animateDismiss.value, [0, 1], [0.5, 1])}],
  }));

  const onDismiss = useCallback(
    (id?: string, emoji?: ImageSourcePropType, vibrate = false) => {
      animateDismiss.value = withTiming(0, {duration: 50});
      onPressOut(id, emoji === clonedItemToPass.emoji ? undefined : emoji);
      vibrate && triggerSelectionHaptik();
    },
    [clonedItemToPass],
  );

  const renderItem = useCallback(
    ({item, index}: TEmojiItemProps) => {
      const backgroundColor =
        clonedItemToPass.emoji === item ? '#d3d3d3' : 'transparent';

      return (
        <AnimPressable
          key={`emoji-${index}`}
          entering={SlideInDown.delay(index * 50)}
          onPress={() => onDismiss(clonedItemToPass.id, item, true)}
          style={[{backgroundColor}, styles.emojiSelectedContainer]}>
          <Image source={item} style={styles.emoji} />
        </AnimPressable>
      );
    },
    [clonedItemToPass],
  );

  React.useEffect(() => {
    if (captureUri) {
      animateDismiss.value = withTiming(1);
    }
  }, [captureUri]);

  if (
    !captureUri ||
    typeof clonedItem?.id !== 'string' ||
    typeof clonedItem?.top !== 'number'
  ) {
    return null;
  }

  return (
    <>
      <AnimPressable style={styles.blurBg} onPress={() => onDismiss()}>
        <Animated.Image
          source={{uri: captureUri}}
          blurRadius={BACKGROUND_BLUR_RADIUS}
          style={[opacity, styles.capturedImg]}
        />
      </AnimPressable>
      <Animated.View
        style={[opacity, styles.clonedMessage, {top: clonedItem?.top}]}>
        <MessageItem item={{...clonedItemToPass, emoji: undefined}} />
        <Animated.View style={[emojiStyle, styles.emojiContainer]}>
          {EMOJI.map((item, index) => renderItem({item, index}))}
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default Background;

const styles = StyleSheet.create({
  blurBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  capturedImg: {
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  emojiSelectedContainer: {
    padding: 4,
    borderRadius: 8,
  },
  emoji: {
    width: 32,
    height: 32,
  },
  clonedMessage: {
    position: 'absolute',
    width: '100%',
    zIndex: 201,
    overflow: 'hidden',
  },
  emojiContainer: {
    zIndex: 100,
    width: WIDTH - 104,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
