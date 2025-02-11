import {StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native';
import Animated, {SharedValue, useAnimatedProps} from 'react-native-reanimated';

import {Colors} from '@utils/colors';

Animated.addWhitelistedNativeProps({text: true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = {
  text: SharedValue<string>;
  style?: TextStyle | TextStyle[];
};

const ReText = (props: Props & TextInputProps) => {
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
