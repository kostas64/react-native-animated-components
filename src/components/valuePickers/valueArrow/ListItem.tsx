import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { StyleSheet } from "react-native";

import { TListItem } from "./types";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";

const ListItem = React.memo(
  ({ item, index, unit, scrollOffset }: TListItem) => {
    const animStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        scrollOffset.value,
        [
          index * 112 - 40,
          index * 112 - 20,
          index * 112,
          index * 112 + 20,
          index * 112 + 40,
        ],
        [0.2, 0.5, 1, 0.5, 0.2]
      ),
    }));

    return (
      <Animated.View style={[animStyle, styles.itemContainer]}>
        <Text style={styles.item}>{`${item}${unit}`}</Text>
      </Animated.View>
    );
  }
);

ListItem.displayName = "ListItem";

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 112,
    justifyContent: "center",
  },
  item: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});
