import { ComponentProps } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type Timeout = ReturnType<typeof setTimeout>;

export type EntypoName = ComponentProps<typeof Entypo>["name"];
export type FeatherName = ComponentProps<typeof Feather>["name"];
export type IoniconName = ComponentProps<typeof Ionicons>["name"];
export type AntDesignName = ComponentProps<typeof AntDesign>["name"];
export type FontAwesomeName = ComponentProps<typeof FontAwesome>["name"];
export type MaterialIconsName = ComponentProps<typeof MaterialIcons>["name"];
