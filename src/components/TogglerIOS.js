import React from 'react';
import {Easing, Pressable, View, Animated, StyleSheet} from 'react-native';

const SIZE = 60;

const TogglerIOS = () => {
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
    <View style={styles.container}>
      <Pressable onPress={animate}>
        <View
          style={{
            width: SIZE,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            justifyContent: 'center',
            paddingHorizontal: SIZE / 30,
            backgroundColor: !togglerActive ? 'rgba(0,0,0,0.1)' : '#4cda63',
          }}>
          <Animated.View
            style={{
              width: SIZE / 2 - 4,
              height: SIZE / 2 - 4,
              backgroundColor: 'white',
              borderRadius: (SIZE / 2 - 4) / 2,
              transform: [{translateX: animRef}],
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
