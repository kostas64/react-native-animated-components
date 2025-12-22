import { useState } from "react";
import Animated from "react-native-reanimated";
import { StyleSheet, LayoutChangeEvent } from "react-native";

import { Colors } from "@utils/colors";
import { ACTIONS, INITIAL_DIMENSIONS } from "./data";
import { useAnimatedContainerStyles } from "./animatedStyles";
import FloatingActionModalItem from "./FloatingActionModalItem";
import { TFloatingActionModalProps, TFloatingModalDimensions } from "./types";

const FloatingActionModal = ({
  progress,
  style,
}: TFloatingActionModalProps) => {
  const [dimensions, setDimensions] =
    useState<TFloatingModalDimensions>(INITIAL_DIMENSIONS);

  const onLayout = (e: LayoutChangeEvent) => {
    if (dimensions.height === 0) {
      setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
      });
    }
  };

  const { animatedContainer } = useAnimatedContainerStyles({
    dimensions,
    progress,
  });

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, animatedContainer, style]}
    >
      {ACTIONS.map((action, key) => (
        <FloatingActionModalItem
          key={`action-${key}`}
          item={action}
          progress={progress}
          style={[
            styles.itemContainer,
            key === 0
              ? styles.firstItem
              : key === ACTIONS.length - 1
                ? styles.lastItem
                : {},
          ]}
        />
      ))}
    </Animated.View>
  );
};

export default FloatingActionModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.EERIE_BLACK,
  },
  itemContainer: {
    paddingHorizontal: 32,
    paddingVertical: 19,
  },
  firstItem: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  lastItem: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
