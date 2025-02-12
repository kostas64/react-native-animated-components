import {StatusBar} from 'react-native';

import {StatusBarProps} from './types';

const StatusBarManager = ({barStyle = 'dark'}: StatusBarProps) => {
  return (
    <StatusBar
      translucent
      backgroundColor={'transparent'}
      barStyle={barStyle === 'dark' ? 'dark-content' : 'light-content'}
    />
  );
};

export default StatusBarManager;
