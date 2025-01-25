import {Dimensions, Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const HEIGHT_SCR = Dimensions.get('screen').height;

export const MAX_FONT_UPSCALE_FACTOR = isIOS ? 1.5 : 1.3;
export const MED_FONT_UPSCALE_FACTOR = isIOS ? 1.3 : 1.15;
export const SM_FONT_UPSCALE_FACTOR = isIOS ? 1.2 : 1.1;
export const XSM_FONT_UPSCALE_FACTOR = isIOS ? 1.1 : 1.05;
