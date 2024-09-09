import {ColorValue, ViewStyle} from 'react-native';

export type TFloatingElement = {
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
