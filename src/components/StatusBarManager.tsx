import React from 'react';
import {StatusBar} from 'react-native';

const StatusBarManager = ({barStyle = 'dark'}) => {
  return (
    <StatusBar
      translucent
      backgroundColor={'transparent'}
      barStyle={barStyle === 'dark' ? 'dark-content' : 'light-content'}
    />
  );
};

export default StatusBarManager;
