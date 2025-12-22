import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { forwardRef, memo, useImperativeHandle, useState } from "react";

import { Colors } from "@utils/colors";
import { HOME_LIST } from "@assets/homeList";
import { HEIGHT_SCR, isIOS, WIDTH } from "@utils/device";

const MemoizedBackground = forwardRef((_, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    selectedIndex,
    setSelectedIndex,
  }));

  return (
    <>
      <Animated.Image
        key={`image-${selectedIndex}`}
        blurRadius={50}
        style={styles.img}
        entering={isIOS ? FadeIn.duration(125) : undefined}
        exiting={isIOS ? FadeOut.duration(150) : undefined}
        source={HOME_LIST[selectedIndex]?.image ?? HOME_LIST[0]?.image}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.overlay]} />
    </>
  );
});

MemoizedBackground.displayName = "HomeBackground";

const HomeBackground = memo(MemoizedBackground);

export default HomeBackground;

const styles = StyleSheet.create({
  img: {
    position: "absolute",
    width: WIDTH,
    height: HEIGHT_SCR,
  },
  overlay: {
    backgroundColor: Colors.HALF_BLACK,
  },
});
