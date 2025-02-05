import {StyleSheet} from 'react-native';

export const shadows = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 50,
  },
  lowShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 25,
  },
});
