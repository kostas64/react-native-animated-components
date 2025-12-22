import Animated, {
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

import React from "react";
import { StyleSheet, View } from "react-native";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { Colors } from "@utils/colors";
import useBackAction from "@hooks/useBackAction";
import { HEIGHT, HEIGHT_SCR, isIOS } from "@utils/device";
import { BottomSheetProps, BottomSheetRef } from "./types";

const MAX_HEIGHT = isIOS ? HEIGHT : HEIGHT_SCR;

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      modalHeight,
      onBackPress,
      resetModal,
      lineStyle,
      lineStyleContainer,
      panEnabled = true,
      withoutLine = false,
      contentContainerStyle,
    },
    ref
  ) => {
    const MAX_TRANSLATE_Y =
      (modalHeight > 0 ? -modalHeight : modalHeight) || -MAX_HEIGHT + 50;

    const active = useSharedValue(false);
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const [isActive, setIsActive] = React.useState(false);
    const [isPanEnabled, setIsPanEnabled] = React.useState(panEnabled);

    //** ----- STYLES -----
    const animBottomSheetStyle = useAnimatedStyle(
      () => ({ transform: [{ translateY: translateY.value }] }),
      []
    );

    const rBackdropStyle = useAnimatedStyle(
      () => ({ opacity: withTiming(active.value ? 1 : 0) }),
      []
    );

    const rBackdropProps = useAnimatedProps(
      () => ({
        pointerEvents: active.value
          ? ("auto" as "box-none" | "none" | "box-only" | "auto")
          : ("none" as "box-none" | "none" | "box-only" | "auto"),
      }),
      []
    );

    const bottomSheetStyles = [
      styles.bottomSheetContainer,
      contentContainerStyle,
      animBottomSheetStyle,
    ];

    //** ----- FUNCTIONS -----
    const scrollTo = React.useCallback(
      (destination: number) => {
        "worklet";

        scheduleOnRN(setIsActive, destination !== 0);
        active.value = destination !== 0;
        translateY.value = withSpring(
          destination,
          { damping: 18, stiffness: 120, mass: 0.8, energyThreshold: 1e-7 },
          (done) => {
            if (done && destination === 0) {
              if (resetModal) {
                scheduleOnRN(resetModal);
              }
            }
          }
        );
      },
      [active, resetModal, translateY]
    );

    const onBackdropPress = () => {
      // Dismiss the BottomSheet
      !!onBackPress && onBackPress();
      scrollTo(0);
    };

    const onBackHandlerPress = () => {
      if (isActive) {
        scrollTo(0);
        return true;
      }
    };

    //** ----- EFFECTS -----
    useBackAction(onBackHandlerPress);

    React.useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

    React.useEffect(() => {
      panEnabled !== isPanEnabled && setIsPanEnabled(panEnabled);
    }, [panEnabled, isPanEnabled]);

    //** ----- GESTURES -----
    const gesture = Gesture.Pan()
      .enabled(isPanEnabled)
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (Math.abs(MAX_TRANSLATE_Y) - Math.abs(translateY.value) < 50) {
          scrollTo(MAX_TRANSLATE_Y);
        } else {
          if (onBackPress) {
            scheduleOnRN(onBackPress);
          }

          scrollTo(0);
        }
      });

    const wrappedChildren =
      -MAX_TRANSLATE_Y === 0.9 * HEIGHT ? (
        <View style={{ height: -MAX_TRANSLATE_Y - 40 }}>{children}</View>
      ) : (
        children
      );

    return (
      <>
        <Animated.View
          onTouchStart={onBackdropPress}
          animatedProps={rBackdropProps}
          style={[styles.backdrop, rBackdropStyle]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={bottomSheetStyles}>
            {!withoutLine && (
              <View style={[styles.borderRadius, lineStyleContainer]}>
                <View style={[styles.line, lineStyle]} />
              </View>
            )}
            {wrappedChildren}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.HALF_BLACK,
  },
  bottomSheetContainer: {
    height: MAX_HEIGHT,
    width: "100%",
    backgroundColor: Colors.WHITE,
    position: "absolute",
    top: MAX_HEIGHT,
    borderRadius: 18,
  },
  borderRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  line: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: Colors.CHINESE_BLACK,
  },
});

export default BottomSheet;
