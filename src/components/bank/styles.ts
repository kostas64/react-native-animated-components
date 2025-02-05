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
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    elevation: 25,
  },
  justShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
  },
});
