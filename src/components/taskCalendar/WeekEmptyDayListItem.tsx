import {StyleSheet, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {_spacing} from './constants';

const WeekEmptyDayListItem = ({onLayout}: {onLayout?: () => void}) => {
  return <View style={styles.empty} onLayout={onLayout} />;
};

export default WeekEmptyDayListItem;

const styles = StyleSheet.create({
  empty: {
    marginRight: _spacing,
    paddingVertical: 10,
    width: (WIDTH - 40 - 6 * _spacing) / 7,
    borderRadius: 48,
  },
});
