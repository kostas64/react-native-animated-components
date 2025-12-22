import React from "react";
import { View, Animated, ScrollView, StyleSheet } from "react-native";

import { Colors } from "@utils/colors";

const DotLoader = () => {
  const size = 24;
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
      ])
    ).start();
  }, [
    translateYRef1,
    translateYRef2,
    translateYRef3,
    translateYRef4,
    opacityRef1,
    opacityRef2,
    opacityRef3,
    opacityRef4,
  ]);

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.row}>
        <Animated.View
          style={[
            styles.dot,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              opacity: opacityRef1,
              transform: [{ scale: scaleRef1 }, { translateY: translateYRef1 }],
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
              transform: [{ scale: scaleRef2 }, { translateY: translateYRef2 }],
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
              transform: [{ scale: scaleRef3 }, { translateY: translateYRef3 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            styles.spaceRight0,
            {
              width: size || 1,
              height: size || 1,
              borderRadius: (+size || 1) / 2,
              opacity: opacityRef4,
              transform: [{ scale: scaleRef4 }, { translateY: translateYRef4 }],
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  dot: {
    marginRight: 8,
    backgroundColor: Colors.QUICK_SILVER,
  },
  spaceRight0: {
    marginRight: 0,
  },
});

export default DotLoader;
