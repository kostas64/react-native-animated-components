import {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet, ViewStyle } from "react-native";

import ActionItem from "@components/addButtonMove/ActionItem";

type AddButtonMoveItemProps = {
  item: {
    source: number;
  };
  index: number;
  progress: SharedValue<number>;
  containerStyle: ViewStyle;
};

const AddButtonMoveItem = ({
  item,
  progress,
  containerStyle,
}: AddButtonMoveItemProps) => {
  const animateActionItem = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.25, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
    transform: [{ translateX: interpolate(progress.value, [0, 1], [90, 0]) }],
  }));

  return (
    <ActionItem
      source={item.source}
      containerStyle={[styles.abs, animateActionItem, containerStyle]}
    />
  );
};

export default AddButtonMoveItem;

const styles = StyleSheet.create({
  abs: {
    position: "absolute",
    right: 20,
  },
});
