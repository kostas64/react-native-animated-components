import {ViewStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

export type TFloatingActionButtonProps = {
  progress: SharedValue<number>;
  onPress: () => void;
};

export type TFloatingActionModalProps = {
  progress: SharedValue<number>;
  style: ViewStyle;
};

export type TFloatingModalDimensions = {
  width: number;
  height: number;
};

export type TFloatingModalItemProps = {
  style?: ViewStyle | ViewStyle[];
  item: {
    name: string;
    label: string;
    component: typeof Feather;
  };
  progress: SharedValue<number>;
};
