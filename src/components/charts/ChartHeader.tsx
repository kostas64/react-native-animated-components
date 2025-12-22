import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { AntDesignName } from "src/types/common";

type ChatHeaderProps = {
  iconName: AntDesignName;
  label: string;
};

const ChartHeader = ({ iconName, label }: ChatHeaderProps) => (
  <View style={styles.chartHeaderContainer}>
    <View style={styles.chartHeaderInnerContainer}>
      <View style={styles.chartHeaderIconContainer}>
        <AntDesign name={iconName} size={20} color={"#556d36"} />
      </View>
      <Text style={styles.chartHeaderLabel}>{label}</Text>
    </View>
  </View>
);

export default ChartHeader;

const styles = StyleSheet.create({
  chartHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  chartHeaderInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE_COFFEE,
    padding: 10,
    borderRadius: 16,
  },
  chartHeaderIconContainer: {
    backgroundColor: Colors.ALABASTER,
    marginRight: 10,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  chartHeaderLabel: {
    lineHeight: 20,
    color: Colors.DARK_OLIVE_GREEN,
    fontFamily: typography.bold,
  },
});
