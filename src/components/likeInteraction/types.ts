export type TListItem = {
  item: {
    image: string;
  };
  index: number;
  liked: boolean;
};

export type TLikeCounter = {
  counter: number;
  liked: boolean;
  onPress: () => void;
};
