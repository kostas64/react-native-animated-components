import React from 'react';
import {StyleSheet} from 'react-native';
import {LinearGradient, Stop} from 'react-native-svg';

const CommonGradient = ({id}: {id: string}) => {
  return (
    <LinearGradient id={id} x1="100%" y1="0%" x2="100%" y2="100%">
      <Stop offset="0%" stopOpacity="0.8" stopColor={'#f7736b'} />
      <Stop offset="50%" stopOpacity="1" stopColor={'#e94173'} />
      <Stop offset="100%" stopOpacity="0.8" stopColor={'#e4489b'} />
    </LinearGradient>
  );
};

export default CommonGradient;

const styles = StyleSheet.create({});
