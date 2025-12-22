import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";

import { TArrow } from "./types";

const Arrow = ({ direction, onPress = () => {}, disabled = false }: TArrow) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled}>
    <Entypo
      size={24}
      name={`chevron-${direction}`}
      color={disabled ? "rgba(255,255,255, 0.20)" : "rgba(255,255,255, 0.80)"}
    />
  </TouchableOpacity>
);

export default Arrow;
