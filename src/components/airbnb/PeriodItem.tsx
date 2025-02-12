import {Pressable, StyleSheet} from 'react-native';

import {CALENDAR_PER} from './data';
import {TPeriodItem} from './types';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const PeriodItem = ({item, onPress, isSelected, index}: TPeriodItem) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.periodItemContainer,
        isSelected ? styles.selectedPeriodItem : styles.unselectedPeriodItem,
        index === 0 ? styles.spaceLeft20 : styles.spaceLeft0,
        index !== CALENDAR_PER.length - 1
          ? styles.spaceRight10
          : styles.spaceRight20,
      ]}>
      <Text
        style={styles.itemLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {item}
      </Text>
    </Pressable>
  );
};

export default PeriodItem;

const styles = StyleSheet.create({
  periodItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  selectedPeriodItem: {
    backgroundColor: Colors.CULTURED,
    borderWidth: 2,
    borderColor: Colors.BLACK,
  },
  unselectedPeriodItem: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.CHINESE_WHITE,
  },
  itemLabel: {
    fontFamily: typography.medium,
  },
  spaceLeft20: {
    marginLeft: 20,
  },
  spaceLeft0: {
    marginLeft: 0,
  },
  spaceRight10: {
    marginRight: 10,
  },
  spaceRight20: {
    marginRight: 20,
  },
});
