import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

import { typography } from "@utils/typography";

const FONT_SIZE = 36;
const LINE_HEIGHT = 42;
const DEFAULT_TEXT =
  "Wishing you a warm and peaceful Christmas, filled with cozy moments, quiet joy, and plenty of reasons to smile 🎄✨";

function AnimatedWord({ word, index }: { word: string; index: number }) {
  return (
    <View style={styles.wordClip}>
      <Animated.View
        entering={SlideInDown.delay(index * 90)
          .springify()
          .damping(80)
          .stiffness(160)}
      >
        <Text allowFontScaling={false} style={styles.label}>
          {word}
        </Text>
      </Animated.View>
    </View>
  );
}

export default function AnimatedWordTextScreen({ text = DEFAULT_TEXT }) {
  const words = text.split(" ");

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        {words.map((word, index) => (
          <AnimatedWord key={`${word}-${index}`} word={word} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f36565ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordClip: {
    height: LINE_HEIGHT,
    overflow: "hidden",
    marginRight: 10,
  },
  label: {
    letterSpacing: 0.25,
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontFamily: typography.bold,
    textTransform: "uppercase",
  },
});
