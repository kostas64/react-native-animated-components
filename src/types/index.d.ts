declare module '@assets';

declare module 'react-native-haptic-feedback' {
  interface HapticOptions {
    enableVibrateFallback: boolean;
    ignoreAndroidSystemSettings: boolean;
  }

  type HapticFeedbackTypes =
    | 'selection'
    | 'impactLight'
    | 'impactMedium'
    | 'impactHeavy'
    | 'notificationSuccess'
    | 'notificationWarning'
    | 'notificationError'
    | 'longPress'
    | 'effectClick';

  function trigger(type: HapticFeedbackTypes, options?: HapticOptions): void;

  export default {
    trigger,
  };
}
