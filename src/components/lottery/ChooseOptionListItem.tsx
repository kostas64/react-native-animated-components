import {Pressable, StyleSheet} from 'react-native';

import {Colors} from '@utils/colors';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';

const ChooseOptionListItem = ({
  item,
  index,
  selectedO,
  selectOption,
}: {
  item: number;
  index: number;
  selectedO: number;
  selectOption: (index: number) => void;
}) => {
  return (
    <Pressable
      onPress={() => selectOption(index)}
      style={({pressed}) => [
        styles.optionContainer,
        selectedO === index ? styles.selectedBorder : styles.unselectedBorder,
        pressed && {opacity: 0.6},
      ]}>
      <Text style={styles.label}>{item}</Text>
    </Pressable>
  );
};

export default ChooseOptionListItem;

const styles = StyleSheet.create({
  optionContainer: {
    minWidth: 96,
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
