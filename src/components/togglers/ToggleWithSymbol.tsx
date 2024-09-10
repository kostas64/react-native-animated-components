import React from 'react';
import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';

import {SIZE} from './constants';

const ToggleWithSymbol = () => {
  const animSymbolRef = React.useRef(new Animated.Value(0)).current;
  const opacityOpen = React.useRef(new Animated.Value(1)).current;
  const opacityClose = React.useRef(new Animated.Value(0)).current;

  const [togglerSymbolActive, setTogglerSymbolActive] = React.useState(false);

  const animateSymbol = () => setTogglerSymbolActive(cur => !cur);

  React.useEffect(() => {
    Animated.timing(animSymbolRef, {
      toValue: togglerSymbolActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityOpen, {
      toValue: togglerSymbolActive ? 0 : 1,
      duration: togglerSymbolActive ? 100 : 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityClose, {
      toValue: togglerSymbolActive ? 1 : 0,
      duration: togglerSymbolActive ? 200 : 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerSymbolActive]);

  return (
    <Pressable onPress={animateSymbol}>
      <View
        style={[
          styles.container,
          {backgroundColor: togglerSymbolActive ? 'black' : 'rgba(0,0,0,0.1)'},
        ]}>
        <Animated.View
          style={[styles.dot, {transform: [{translateX: animSymbolRef}]}]}
        />
        <Animated.View
          style={[
            styles.symbolOpen,
            {opacity: opacityOpen, transform: [{translateX: animSymbolRef}]},
          ]}
        />
        <Animated.View
          style={[
            styles.symbolClose,
            {opacity: opacityClose, transform: [{translateX: animSymbolRef}]},
          ]}
        />
      </View>
    </Pressable>
  );
};

export default ToggleWithSymbol;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE / 3,
    borderRadius: SIZE / 4,
  },
  dot: {
    position: 'absolute',
    left: 0,
    top: -(SIZE / 12),
    width: SIZE / 2,
    height: SIZE / 2,
    borderRadius: SIZE / 2,
    backgroundColor: 'white',
  },
  symbolOpen: {
    position: 'absolute',
    top: (SIZE / 3 - SIZE / 4) / 2,
    left: (SIZE - SIZE / 2) / 4,
    width: SIZE / 4,
    height: SIZE / 4,
    borderRadius: SIZE / 4,
    borderWidth: SIZE / 20,
    borderColor: 'black',
  },
  symbolClose: {
    position: 'absolute',
    top: (SIZE / 3 - SIZE / 4) / 2,
    left: SIZE / 5,
    width: SIZE / 20,
    height: SIZE / 4,
    borderRadius: SIZE / 4,
    borderWidth: SIZE / 20,
    borderColor: 'black',
  },
});
