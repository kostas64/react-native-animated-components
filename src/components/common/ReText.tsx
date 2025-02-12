import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

import {Colors} from '@utils/colors';
import {ReTextProps} from './types';

Animated.addWhitelistedNativeProps({text: true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = (props: ReTextProps & TextInputProps) => {
  const {text, style} = props;
  const animatedProps = useAnimatedProps(() => ({
    text: text.value,
  }));

  return (
    //@ts-ignore
    <AnimatedTextInput
      pointerEvents={props.pointerEvents}
      underlineColorAndroid="transparent"
      editable={false}
      maxFontSizeMultiplier={props.maxFontSizeMultiplier}
      style={[styles.baseStyle, style]}
      {...{animatedProps}}
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    color: Colors.BLACK,
  },
});

export default ReText;
