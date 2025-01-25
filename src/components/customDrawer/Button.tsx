import {Text, TouchableOpacity} from 'react-native';

import {ButtonProps} from './types';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const Button = ({title, onPress, style}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style} maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
