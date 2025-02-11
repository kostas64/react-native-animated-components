import {StatusBar} from 'react-native';

type StatusBarProps = {
  barStyle?: 'dark' | 'light';
};

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
