import { IoniconName } from "src/types/common";

export type TDrawerList = {
  DrawerInterpolateNested: undefined;
};

export type TDrawerContentItem = {
  label: string;
  icon: IoniconName;
};

export type DrawerTypes = "front" | "back" | "slide" | "permanent";
