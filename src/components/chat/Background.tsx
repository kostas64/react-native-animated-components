import Animated, {
  withTiming,
  interpolate,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

import { Colors } from "@utils/colors";
import MessageItem from "./MessageItem";
import { WIDTH } from "@utils/device";
import { BACKGROUND_BLUR_RADIUS, EMOJI } from "./data";
import { TBackgroundProps, TEmojiItemProps } from "./types";
import { HAPTIC_TYPE, triggerHaptic } from "@utils/haptics";
import { AnimatedPressable } from "@components/common/AnimatedComponents";

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
    transform: [{ scale: interpolate(animateDismiss.value, [0, 1], [0.5, 1]) }],
  }));

  const onDismiss = (
    id?: string,
    emoji?: ImageSourcePropType,
    vibrate = false
  ) => {
    animateDismiss.value = withTiming(0, { duration: 50 });
    onPressOut(id, emoji === clonedItemToPass.emoji ? undefined : emoji);
    vibrate && triggerHaptic(HAPTIC_TYPE.SELECT);
  };

  const renderItem = ({ item, index }: TEmojiItemProps) => {
    const backgroundColor =
      clonedItemToPass.emoji === item ? "#d3d3d3" : "transparent";

    return (
      <AnimatedPressable
        key={`emoji-${index}`}
        entering={SlideInDown.delay(index * 50)}
        onPress={() => onDismiss(clonedItemToPass.id, item, true)}
        style={[{ backgroundColor }, styles.emojiSelectedContainer]}
      >
        <Image source={item} style={styles.emoji} />
      </AnimatedPressable>
    );
  };

  React.useEffect(() => {
    if (captureUri) {
      animateDismiss.value = withTiming(1);
    }
  }, [captureUri, animateDismiss]);

  if (
    !captureUri ||
    typeof clonedItem?.id !== "string" ||
    typeof clonedItem?.top !== "number"
  ) {
    return null;
  }

  return (
    <>
      <AnimatedPressable style={styles.blurBg} onPress={() => onDismiss()}>
        <Animated.Image
          source={{ uri: captureUri }}
          blurRadius={BACKGROUND_BLUR_RADIUS}
          style={[opacity, styles.capturedImg]}
        />
      </AnimatedPressable>
      <Animated.View
        style={[opacity, styles.clonedMessage, { top: clonedItem?.top }]}
      >
        <MessageItem item={{ ...clonedItemToPass, emoji: undefined }} />
        <Animated.View style={[emojiStyle, styles.emojiContainer]}>
          {EMOJI.map((item, index) => renderItem({ item, index }))}
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default Background;

const styles = StyleSheet.create({
  blurBg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 100,
  },
  capturedImg: {
    width: "100%",
    height: "100%",
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
    position: "absolute",
    width: "100%",
    zIndex: 201,
    overflow: "hidden",
  },
  emojiContainer: {
    zIndex: 100,
    width: WIDTH - 104,
    height: 58,
    borderColor: Colors.PLATINUM,
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
    padding: 8,
    alignSelf: "center",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
