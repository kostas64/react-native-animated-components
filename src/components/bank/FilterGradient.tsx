import React from 'react';
import {LinearGradient, Stop} from 'react-native-svg';

const FilterGradient = () => {
  return (
    <LinearGradient id="gradient" x1="100%" y1="0%" x2="100%" y2="100%">
      <Stop offset="0%" stopColor="#f7736b" stopOpacity="0.8" />
      <Stop offset="50%" stopColor="#e94173" stopOpacity="1" />
      <Stop offset="100%" stopColor="#e4489b" stopOpacity="0.8" />
    </LinearGradient>
  );
};

export default FilterGradient;
