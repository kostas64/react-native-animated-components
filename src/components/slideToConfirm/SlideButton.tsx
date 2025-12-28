/**
 *
 *   Component has 3 states:
 *      a) Initial State - Extended
 *      b) Loading State - Button transformed to a circular progress
 *      c) Completed State - Circular progress is filled and checkmark is shown
 *
 *   We use 2 values to control the state:
 *      1) progress - a shared value that is used to animate the button
 *      2) circularP - a state that is used to animate the circular progress
 *
 */

import Animated, {
  clamp,
  withDelay,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { scheduleOnRN } from "react-native-worklets";
import React, { useCallback, useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { Colors } from "@utils/colors";
import ArrowCircle from "./ArrowCircle";
import { typography } from "@utils/typography";
import { shadows } from "@components/bank/styles";
import CircularProgress from "@components/circularProgress/CircularProgress";

const CIRCLE_SIZE = 84;
const INITIAL_CIRCLE_PROGRESS = 0.0001;

type SlideButtonProps = {
  /* This prop will trigger the action completed state */
  actionCompleted: boolean;
  /* Callback to be called when the user confirms the action */
  onConfirm: () => void;
  /* Callback to be called when action is completed */
  onComplete: () => void;
};

const SlideButton = ({
  actionCompleted,
  onConfirm,
  onComplete,
}: SlideButtonProps) => {
  const progress = useSharedValue(0);
  const [circularP, setCircularP] = useState(INITIAL_CIRCLE_PROGRESS);

  // When action is completed, we trigger the last state of the button
  // and when is done, we call the onComplete callback
  const onActionCompleted = useCallback(() => {
    scheduleOnRN(setCircularP, 1);
    progress.value = withTiming(1.5, { duration: 500 }, () => {
      progress.value = withDelay(
        1500,
        withTiming(0, { duration: 500 }, () => {
          scheduleOnRN(setCircularP, INITIAL_CIRCLE_PROGRESS);
          scheduleOnRN(onComplete);
        })
      );
    });
  }, [progress, onComplete]);

  const onPanFinish = (toValue: number) => {
    const toCircularValue =
      toValue === 0 ? 0.95 : toValue === 1.25 ? 1 : INITIAL_CIRCLE_PROGRESS;
    setCircularP(toCircularValue);
  };

  // Shrink buttonn
  const containerStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [260, 88], Extrapolation.CLAMP),
  }));

  // Hide and translate the label as user pan
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.25],
      [1, 0],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 0.25],
          [52, 32],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const circularStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.9, 1], [0, 1], Extrapolation.CLAMP),
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [1, 1.25],
          [0, 2],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  // Coloring transformation for the circular progress
  const customAnimatedProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        progress.value,
        [1, 1.25],
        [Colors.WHITE, Colors.HARMONY_GREEN]
      ),
    }),
    [circularP]
  );

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      progress.value = clamp(event.translationX / 88, 0, 1);
    })
    .onFinalize((e) => {
      const toValue = e.translationX > 60 ? 1.25 : 0;

      progress.value = withTiming(toValue, { duration: 500 });

      if (toValue === 1.25) {
        scheduleOnRN(onConfirm);
        scheduleOnRN(onPanFinish, 0);
      }
    })
    .minDistance(0);

  useEffect(() => {
    if (actionCompleted) {
      onActionCompleted();
    }
  }, [actionCompleted, onActionCompleted]);

  return (
    <Animated.View style={[styles.btnContainer, containerStyle]}>
      {/* Green Circle */}
      <GestureDetector gesture={pan}>
        <ArrowCircle progress={progress} />
      </GestureDetector>

      <CircularProgress
        progress={circularP}
        size={CIRCLE_SIZE}
        strokeWidth={7}
        startAngle={0}
        duration={1000}
        progressColor={Colors.RED_SALSA}
        trackColor={Colors.TRANSPARENT}
        animated
        repeatAnimation={circularP === 0.95}
        style={[styles.absolute, circularStyle]}
        customAnimatedProps={customAnimatedProps}
      />

      <Animated.Text style={[styles.btnLabel, labelStyle]}>
        Slide to Confirm
      </Animated.Text>
    </Animated.View>
  );
};

export default SlideButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10000,
    borderCurve: "continuous",
    flexDirection: "row",
    alignItems: "center",
    ...shadows.justLowShadow,
  },
  btnLabel: {
    fontFamily: typography.bold,
    flex: 1,
    fontSize: 18,
    alignSelf: "center",
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
  absolute: {
    position: "absolute",
  },
});
