import {isIOS} from './device';

export const typography = {
  thin: isIOS ? 'FSP DEMO - Facundo Thin Regular' : 'Fontspring-Thin',
  semiBold: isIOS
    ? 'FSP DEMO - Facundo SemiBold Regular'
    : 'Fontspring-SemiBold',
  regular: isIOS ? 'FSP DEMO - Facundo Regular' : 'Fontspring-Regular',
  light: isIOS ? 'FSP DEMO - Facundo Light Regular' : 'Fontspring-Light',
  extraLight: isIOS
    ? 'FSP DEMO - Facundo ExtraLight Regular'
    : 'Fontspring-ExtraLight',
  bold: isIOS ? 'FSP DEMO - Facundo Bold Regular' : 'Fontspring-Bold',
  black: isIOS ? 'FSP DEMO - Facundo Black Regular' : 'Fontspring-Black',
};
