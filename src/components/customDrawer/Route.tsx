import {StyleSheet} from 'react-native';

import Button from './Button';
import {colors} from './data';
import {TRouteProps} from './types';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';

const Route = ({index, route, selectedRoute, onPress}: TRouteProps) => {
  return (
    <Button
      title={route}
      style={[
        styles.button,
        route === selectedRoute ? styles.lineThrough : styles.noLine,
        {color: colors[index]},
      ]}
      onPress={onPress}
    />
  );
};

export default Route;

const styles = StyleSheet.create({
  button: {
    fontSize: 32,
    color: Colors.LOTION,
    lineHeight: 32 * 1.5,
    fontFamily: typography.medium,
  },
  lineThrough: {
    textDecorationLine: 'underline',
  },
  noLine: {
    textDecorationLine: 'none',
  },
});
