import {Text, TouchableOpacity} from 'react-native';

import {ButtonProps} from './types';

const Button = ({title, onPress, style}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
