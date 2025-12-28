import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";

import { Colors } from "@utils/colors";
import { Timeout } from "src/types/common";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { HAPTIC_TYPE, triggerHaptic } from "@utils/haptics";
import SlideButton from "@components/slideToConfirm/SlideButton";

const SlideToConfirmScreen = () => {
  const timeout = useRef<Timeout | null>(null);
  const [isJobDone, setIsJobDone] = useState(false);

  const onConfirm = async () => {
    triggerHaptic(HAPTIC_TYPE.LONG_PRESS);
    const randomDelay = Math.random() * 5000;

    !!timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setIsJobDone(true);
      triggerHaptic(HAPTIC_TYPE.SUCCESS);
    }, randomDelay);
  };

  const onComplete = () => {
    setIsJobDone(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <SlideButton
        onConfirm={onConfirm}
        onComplete={onComplete}
        actionCompleted={isJobDone}
      />

      <Text style={styles.caption}>
        {"Confirmation time is random\nand simulates a network call"}
      </Text>
    </View>
  );
};

export default SlideToConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.HARMONY_GREEN,
  },
  caption: {
    marginTop: 24,
    fontSize: 14,
    // width: 260,
    textAlign: "center",
    fontFamily: typography.semiBold,
  },
});
