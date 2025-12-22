import Feather from "@expo/vector-icons/Feather";
import { FeatherName } from "src/types/common";

export const CIRCLE_SIZE = 74;
export const ICON_SIZE = 32;

export const INITIAL_DIMENSIONS = {
  height: 0,
  width: 0,
};

export const ACTIONS = [
  {
    name: "camera" as FeatherName,
    label: "PHOTO",
    component: Feather,
  },
  {
    name: "file" as FeatherName,
    label: "FILES",
    component: Feather,
  },
  {
    name: "mic" as FeatherName,
    label: "RECORD",
    component: Feather,
  },
  {
    name: "message-square" as FeatherName,
    label: "NEW EMAIL",
    component: Feather,
  },
];
