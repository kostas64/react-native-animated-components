import {Text as RNText, TextProps} from 'react-native';

import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const Text = (props: TextProps) => {
  return (
    <RNText
      maxFontSizeMultiplier={
        props.maxFontSizeMultiplier || MAX_FONT_UPSCALE_FACTOR
      }
      {...props}
    />
  );
};

export default Text;
