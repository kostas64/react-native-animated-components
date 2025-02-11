import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Animated, TextInput, ScrollView, StyleSheet} from 'react-native';

import Text from './Text';

const DotLoader = () => {
  const [size, setSize] = React.useState(20);
  const opacityRef1 = React.useRef(new Animated.Value(0.3)).current;
  const opacityRef2 = React.useRef(new Animated.Value(0.3)).current;
  const opacityRef3 = React.useRef(new Animated.Value(0.3)).current;
  const opacityRef4 = React.useRef(new Animated.Value(0.3)).current;

  const scaleRef1 = React.useRef(new Animated.Value(1)).current;
  const scaleRef2 = React.useRef(new Animated.Value(1)).current;
  const scaleRef3 = React.useRef(new Animated.Value(1)).current;
  const scaleRef4 = React.useRef(new Animated.Value(1)).current;

  const translateYRef1 = React.useRef(new Animated.Value(0)).current;
  const translateYRef2 = React.useRef(new Animated.Value(0)).current;
  const translateYRef3 = React.useRef(new Animated.Value(0)).current;
  const translateYRef4 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef1, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef1, {
              toValue: -(+size / 1.5),
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef1, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef1, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef2, {
              toValue: 1,
              duration: 300,
              delay: 200,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef2, {
              toValue: -(+size / 1.5),
              duration: 300,
              delay: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef2, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef2, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef3, {
              toValue: 1,
              duration: 300,
              delay: 400,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef3, {
              toValue: -(+size / 1.5),
              duration: 300,
              delay: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef3, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef3, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityRef4, {
              toValue: 1,
              duration: 300,
              delay: 600,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef4, {
              toValue: -(+size / 1.5),
              duration: 300,
              delay: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityRef4, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateYRef4, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),
    ).start();
  }, []);

  const ImplementedWith = () => {
    const insets = useSafeAreaInsets();

    return (
      <View
        style={{
          position: 'absolute',
          top: insets.top + 16,
          left: 20,
          zIndex: 100,
        }}>
        <Text style={styles.implemented}>Implemented with:</Text>
        <Text style={styles.implementedLabel}>Animated API</Text>
      </View>
    );
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <ImplementedWith />
      <Text style={styles.label}>Set dot size - Min: 1</Text>
      <TextInput
        keyboardType="numeric"
        value={`${!!size ? size : 1}`}
        onChangeText={val => setSize(parseInt(val))}
        style={styles.textInput}
      />
      <View style={styles.row}>
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              opacity: opacityRef1,
              transform: [
                {
                  scale: scaleRef1,
                },
                {
                  translateY: translateYRef1,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              opacity: opacityRef2,
              transform: [
                {
                  scale: scaleRef2,
                },
                {
                  translateY: translateYRef2,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              opacity: opacityRef3,
              transform: [
                {
                  scale: scaleRef3,
                },
                {
                  translateY: translateYRef3,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              marginRight: 0,
              opacity: opacityRef4,
              transform: [
                {
                  scale: scaleRef4,
                },
                {
                  translateY: translateYRef4,
                },
              ],
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  implemented: {
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
  },
  implementedLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: 'black',
  },
  textInput: {
    fontSize: 18,
    width: 80,
    height: 40,
    padding: 8,
    marginBottom: 32,
    borderRadius: 8,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 3,
  },
  dot: {
    marginRight: 8,
    backgroundColor: '#a3a3a3',
  },
});

export default DotLoader;
