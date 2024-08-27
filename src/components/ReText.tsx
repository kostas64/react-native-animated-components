import React from 'react';
import {StyleSheet, TextInput, TextStyle} from 'react-native';
import Animated, {SharedValue, useAnimatedProps} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({text: true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = {
  text: SharedValue<string>;
  style?: TextStyle | TextStyle[];
};

const ReText = (props: Props) => {
  const {text, style} = props;
  const animatedProps = useAnimatedProps(() => ({
    text: text.value,
  }));

  return (
    //@ts-ignore
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={[styles.baseStyle, style]}
      {...{animatedProps}}
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    color: 'black',
  },
});

export default ReText;
