import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { data } from "./data";
import { TTab } from "./types";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { XSM_FONT_UPSCALE_FACTOR } from "@utils/device";

const Tab = React.forwardRef<View, TTab>(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={styles.label}
          maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

Tab.displayName = "Tab";

export default Tab;

const styles = StyleSheet.create({
  label: {
    color: Colors.WHITE,
    fontSize: 84 / data.length,
    textTransform: "uppercase",
    fontFamily: typography.semiBold,
  },
});
