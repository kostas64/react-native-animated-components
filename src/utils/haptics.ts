import {
  impactAsync,
  AndroidHaptics,
  ImpactFeedbackStyle,
  performAndroidHapticsAsync,
} from "expo-haptics";

import { isAndroid } from "./device";

export const HAPTIC_TYPE = {
  SOFT: "SOFT",
  LONG_PRESS: "LONG_PRESS",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  SELECT: "SELECT",
};

type HapticType = (typeof HAPTIC_TYPE)[keyof typeof HAPTIC_TYPE];

export const triggerHaptic = (type: HapticType) => {
  switch (type) {
    case HAPTIC_TYPE.LONG_PRESS:
      return triggerLongPressHaptic();
    case HAPTIC_TYPE.SOFT:
      return triggerSoftHaptic();
    case HAPTIC_TYPE.SUCCESS:
      return triggerSuccessHaptic();
    case HAPTIC_TYPE.ERROR:
      return triggerErrorHaptic();
    case HAPTIC_TYPE.SELECT:
      return triggerSelectionHaptic();
    default:
      return;
  }
};

const triggerLongPressHaptic = () => {
  if (isAndroid) {
    performAndroidHapticsAsync(AndroidHaptics.Long_Press);
  } else {
    impactAsync(ImpactFeedbackStyle.Medium);
  }
};

const triggerSoftHaptic = () => {
  if (isAndroid) {
    performAndroidHapticsAsync(AndroidHaptics.Drag_Start);
  } else {
    impactAsync(ImpactFeedbackStyle.Soft);
  }
};

const triggerSuccessHaptic = () => {
  if (isAndroid) {
    performAndroidHapticsAsync(AndroidHaptics.Confirm);
  } else {
    impactAsync(ImpactFeedbackStyle.Rigid);
  }
};

const triggerErrorHaptic = () => {
  if (isAndroid) {
    performAndroidHapticsAsync(AndroidHaptics.Reject);
  } else {
    impactAsync(ImpactFeedbackStyle.Heavy);
  }
};

const triggerSelectionHaptic = () => {
  if (isAndroid) {
    performAndroidHapticsAsync(AndroidHaptics.Context_Click);
  } else {
    impactAsync(ImpactFeedbackStyle.Light);
  }
};
