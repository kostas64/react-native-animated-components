import {isIOS} from '@utils/device';

export const shadow = {
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  borderWidth: isIOS ? 0 : 1,
  borderColor: '#e7e7e7',
};
