import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {DATA} from './data';
import {ArrowProps} from './types';
import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {IMAGE_WIDTH, SPACING} from './constants';

const Arrows = ({
  index,
  disabledLeft,
  disabledRight,
  onPressLeft,
  onPressRight,
}: ArrowProps) => {
  return (
    <View style={styles.arrowsContainer}>
      <TouchableOpacity
        disabled={disabledLeft}
        style={index === 0 ? styles.opacityQuarter : styles.fullOpacity}
        onPress={onPressLeft}>
        <View style={styles.arrowContainer}>
          <AntDesign name="swapleft" size={42} color="black" />
          <Text style={styles.arrowText}>PREV</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledRight}
        style={
          index === DATA.length - 1 ? styles.opacityQuarter : styles.fullOpacity
        }
        onPress={onPressRight}>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>NEXT</Text>
          <AntDesign name="swapright" size={42} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Arrows;

const styles = StyleSheet.create({
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: IMAGE_WIDTH + SPACING * 4,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: typography.bold,
  },
  opacityQuarter: {
    opacity: 0.25,
  },
  fullOpacity: {
    opacity: 1,
  },
});
