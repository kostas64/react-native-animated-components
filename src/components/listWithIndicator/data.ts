import React from "react";

import images from "@assets/indiList";
import { TData } from "@components/listWithIndicator/types";
import { ImageSourcePropType } from "react-native";

export const data: TData[] = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i as keyof typeof images] as ImageSourcePropType,
  ref: React.createRef(),
}));
