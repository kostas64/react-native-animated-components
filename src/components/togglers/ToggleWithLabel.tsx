import {
  Text,
  View,
  Easing,
  Animated,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {SIZE} from './constants';
import {typography} from '@utils/typography';

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
          {backgroundColor: !togglerActive ? 'white' : 'black'},
        ]}>
        <Animated.View
          style={[
            styles.background,
            {
              transform: [{translateX: animRef}],
              backgroundColor: !togglerActive ? 'black' : 'white',
            },
          ]}
        />
        <Text
          style={[
            styles.label,
            {
              right: !togglerActive ? SIZE / 8 : SIZE / 2 + 4,
              color: !togglerActive ? 'black' : 'white',
            },
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
});
