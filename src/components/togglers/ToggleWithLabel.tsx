import {View, Easing, Animated, Pressable, StyleSheet} from 'react-native';
import React from 'react';

import {SIZE} from './constants';
import Text from '@components/Text';
import {typography} from '@utils/typography';
import {SM_FONT_UPSCALE_FACTOR} from '@utils/device';

const ToggleWithLabel = () => {
  const animRef = React.useRef(new Animated.Value(0)).current;
  const [togglerActive, setTogglerActive] = React.useState(false);

  const animate = () => setTogglerActive(cur => !cur);

  React.useEffect(() => {
    Animated.timing(animRef, {
      toValue: togglerActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerActive]);

  return (
    <Pressable onPress={animate}>
      <View
        style={[
          styles.container,
          !togglerActive ? styles.white : styles.black,
        ]}>
        <Animated.View
          style={[
            styles.background,
            {transform: [{translateX: animRef}]},
            !togglerActive ? styles.black : styles.white,
          ]}
        />
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[
            styles.label,
            {right: !togglerActive ? SIZE / 8 : SIZE / 2 + 4},
            !togglerActive ? styles.black : styles.white,
          ]}>{`${togglerActive ? 'ON' : 'OFF'}`}</Text>
      </View>
    </Pressable>
  );
};

export default ToggleWithLabel;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE / 2,
    borderRadius: SIZE / 4,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: SIZE / 24,
  },
  background: {
    width: SIZE / 2 - 10,
    height: SIZE / 2 - 10,
    borderRadius: (SIZE / 2 - 10) / 2,
  },
  label: {
    position: 'absolute',
    fontFamily: typography.bold,
    fontSize: SIZE / 7,
  },
  white: {
    backgroundColor: 'white',
  },
  black: {
    backgroundColor: 'black',
  },
});
