import {CaptureOptions} from 'react-native-view-shot';

import {isIOS} from '@utils/device';

export const EMOJI = [
  require('@assets/img/emoji/happy.png'),
  require('@assets/img/emoji/crying.png'),
  require('@assets/img/emoji/in-love.png'),
  require('@assets/img/emoji/laughing.png'),
  require('@assets/img/emoji/anguish.png'),
  require('@assets/img/emoji/angry.png'),
];

export const captureOptions: CaptureOptions = {
  format: 'jpg',
  quality: 0.25,
  result: 'tmpfile', //File get deleted when app is opened again
};

export const BACKGROUND_BLUR_RADIUS = isIOS ? 50 : 15;
export const DELAY_LONG_PRESS = isIOS ? 250 : 150; //Default is 500ms
