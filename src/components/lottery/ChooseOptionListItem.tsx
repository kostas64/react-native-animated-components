import {StyleSheet} from 'react-native';
import {useAnimatedStyle} from 'react-native-reanimated';

import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {TChooseOption, TListItem} from './types';
import {AnimatedPressable} from '@components/common/AnimatedComponents';

const ChooseOptionListItem = ({
  item,
  index,
  spinning,
  selectedO,
  selectOption,
}: TChooseOption & TListItem) => {
  const animStyle = useAnimatedStyle(() => ({
    elevation: spinning.value ? 0 : 5,
  }));

  return (
    <AnimatedPressable
      onPress={() => selectOption(index)}
      style={({pressed}) => [
        styles.optionContainer,
        selectedO === index ? styles.selectedBorder : styles.unselectedBorder,
        pressed && {opacity: 0.6},
        animStyle,
      ]}>
      <Text style={styles.label}>{item}</Text>
    </AnimatedPressable>
  );
};

export default ChooseOptionListItem;

const styles = StyleSheet.create({
  optionContainer: {
    minWidth: 92,
    alignItems: 'center',
    backgroundColor: Colors.SLATE_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  label: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  unselectedBorder: {
    borderWidth: 2,
    borderColor: Colors.SLATE_BLUE,
  },
});
