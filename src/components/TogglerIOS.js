import {
  View,
  Text,
  Easing,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import React from 'react';

const SIZE = 90;

const TogglerIOS = () => {
  const animIOSRef = React.useRef(new Animated.Value(0)).current;
  const animRef = React.useRef(new Animated.Value(0)).current;
  const animSymbolRef = React.useRef(new Animated.Value(0)).current;
  const opacityOpen = React.useRef(new Animated.Value(1)).current;
  const opacityClose = React.useRef(new Animated.Value(0)).current;

  const [togglerIOSActive, setTogglerIOSActive] = React.useState(false);
  const [togglerActive, setTogglerActive] = React.useState(false);
  const [togglerSymbolActive, setTogglerSymbolActive] = React.useState(false);

  const animateIOS = () => setTogglerIOSActive(cur => !cur);
  const animate = () => setTogglerActive(cur => !cur);
  const animateSymbol = () => setTogglerSymbolActive(cur => !cur);

  React.useEffect(() => {
    Animated.timing(animIOSRef, {
      toValue: togglerIOSActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerIOSActive]);

  React.useEffect(() => {
    Animated.timing(animRef, {
      toValue: togglerActive ? SIZE / 2 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [togglerActive]);

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
    <View style={styles.container}>
      <Pressable onPress={animateIOS}>
        <View
          style={{
            width: SIZE,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            justifyContent: 'center',
            paddingHorizontal: SIZE / 30,
            backgroundColor: !togglerIOSActive ? 'rgba(0,0,0,0.1)' : '#4cda63',
          }}>
          <Animated.View
            style={{
              width: SIZE / 2 - 4,
              height: SIZE / 2 - 4,
              backgroundColor: 'white',
              borderRadius: (SIZE / 2 - 4) / 2,
              transform: [{translateX: animIOSRef}],
            }}
          />
        </View>
      </Pressable>
      <View style={{paddingVertical: 8}} />
      <Pressable onPress={animate}>
        <View
          style={{
            width: SIZE,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            justifyContent: 'center',
            borderColor: 'black',
            borderWidth: 2,
            paddingHorizontal: SIZE / 24,
            backgroundColor: !togglerActive ? 'white' : 'black',
          }}>
          <Animated.View
            style={{
              width: SIZE / 2 - 10,
              height: SIZE / 2 - 10,
              backgroundColor: !togglerActive ? 'black' : 'white',
              borderRadius: (SIZE / 2 - 10) / 2,
              transform: [{translateX: animRef}],
            }}
          />
          <Text
            style={{
              position: 'absolute',
              right: !togglerActive ? SIZE / 8 : SIZE / 2,
              fontWeight: '800',
              fontSize: SIZE / 6,
              color: !togglerActive ? 'black' : 'white',
            }}>{`${togglerActive ? 'ON' : 'OFF'}`}</Text>
        </View>
      </Pressable>
      <View style={{paddingVertical: 10}} />
      <Pressable onPress={animateSymbol}>
        <View
          style={{
            width: SIZE,
            height: SIZE / 3,
            borderRadius: SIZE / 4,
            backgroundColor: togglerSymbolActive ? 'black' : 'rgba(0,0,0,0.1)',
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: -(SIZE / 12),
              width: SIZE / 2,
              height: SIZE / 2,
              borderRadius: SIZE / 2,
              backgroundColor: 'white',
              transform: [{translateX: animSymbolRef}],
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: (SIZE / 3 - SIZE / 4) / 2,
              left: (SIZE - SIZE / 2) / 4,
              width: SIZE / 4,
              height: SIZE / 4,
              borderRadius: SIZE / 4,
              borderWidth: SIZE / 20,
              borderColor: 'black',
              opacity: opacityOpen,
              transform: [{translateX: animSymbolRef}],
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: (SIZE / 3 - SIZE / 4) / 2,
              left: SIZE / 5,
              width: SIZE / 20,
              height: SIZE / 4,
              borderRadius: SIZE / 4,
              borderWidth: SIZE / 20,
              borderColor: 'black',
              opacity: opacityClose,
              transform: [{translateX: animSymbolRef}],
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TogglerIOS;
