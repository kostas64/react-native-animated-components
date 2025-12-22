import { View, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { Colors } from "@utils/colors";
import { SearchBarProps } from "./types";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";

const SearchBar = ({ containerStyle }: SearchBarProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Feather name={"search"} size={20} style={styles.search} />
      <Text style={styles.label}>Search</Text>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.CULTURED,
    borderRadius: 100,
  },
  search: {
    marginRight: 10,
  },
  label: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: Colors.QUICK_SILVER,
  },
});
