import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { DATA } from "./data";
import { ArrowProps } from "./types";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { IMAGE_WIDTH, SPACING } from "./constants";

const Arrows = ({
  index,
  disabledLeft,
  disabledRight,
  onPressLeft,
  onPressRight,
}: ArrowProps) => {
  return (
    <View style={styles.arrowsContainer}>
      <TouchableOpacity
        disabled={disabledLeft}
        style={index === 0 ? styles.opacityQuarter : styles.fullOpacity}
        onPress={onPressLeft}
      >
        <View style={styles.arrowContainer}>
          <Feather name="arrow-left-circle" size={28} color="black" />
          <Text style={styles.arrowText}>PREV</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledRight}
        style={
          index === DATA.length - 1 ? styles.opacityQuarter : styles.fullOpacity
        }
        onPress={onPressRight}
      >
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>NEXT</Text>
          <Feather name="arrow-right-circle" size={28} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Arrows;

const styles = StyleSheet.create({
  arrowsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: IMAGE_WIDTH + SPACING * 4,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  arrowText: {
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: typography.bold,
  },
  opacityQuarter: {
    opacity: 0.25,
  },
  fullOpacity: {
    opacity: 1,
  },
});
