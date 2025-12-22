import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, TouchableOpacity } from "react-native";

import { TCounterBtn } from "./types";
import { Colors } from "@utils/colors";

const CounterBtn = ({ isPlus, onPress, disabled }: TCounterBtn) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    activeOpacity={0.75}
    style={[disabled && styles.opacity, styles.container]}
  >
    <Entypo
      size={18}
      color={Colors.SPANISH_GRAY}
      name={isPlus ? "plus" : "minus"}
    />
  </TouchableOpacity>
);

export default CounterBtn;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.SPANISH_GRAY,
    borderRadius: 50,
  },
  opacity: {
    opacity: 0.3,
  },
});
