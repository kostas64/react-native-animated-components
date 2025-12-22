import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { IIconProps, IItemProps } from "./types";
import { ICON_SIZE, ITEM_HEIGHT } from "./constants";

const Icon = ({ icon, color }: IIconProps) => {
  return <MaterialIcons name={icon} color={color} size={ICON_SIZE} />;
};

const Item = ({ icon, color, name, showText }: IItemProps) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontFamily: typography.bold,
    textTransform: "capitalize",
  },
});
