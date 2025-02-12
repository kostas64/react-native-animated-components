import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {ListItemProps} from './types';
import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const ListItem = ({
  item,
  firstLetterH,
  lastLetterH,
  restLetterH,
  formattedText,
}: ListItemProps) => {
  const firstLetterStyle = useAnimatedStyle(() => ({
    color: item.letter === formattedText.value ? '#01e395' : '#6c757d',
  }));

  return (
    <View
      onLayout={e => {
        if (item.isFirstOfLetter) {
          firstLetterH.value = e.nativeEvent.layout.height;
        } else if (item.isLastOfLetter) {
          lastLetterH.value = e.nativeEvent.layout.height + 36;
        } else {
          restLetterH.value = e.nativeEvent.layout.height;
        }
      }}
      style={[styles.container, item.isLastOfLetter && styles.spaceBottom]}>
      {item.isFirstOfLetter && (
        <View style={styles.letterContainer}>
          <Animated.Text
            maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
            style={[styles.letter, firstLetterStyle]}>
            {item.letter}
          </Animated.Text>
        </View>
      )}
      <View style={styles.spaceVertical}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  letterContainer: {
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.DAVYS_GREY,
  },
  letter: {
    lineHeight: 18,
    fontFamily: typography.bold,
    color: Colors.AUROMETALSAURUS,
  },
  name: {
    color: Colors.WHITE,
    fontFamily: typography.medium,
    lineHeight: 18,
  },
  container: {
    borderColor: Colors.DAVYS_GREY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  spaceVertical: {
    paddingVertical: 12,
  },
  spaceBottom: {
    marginBottom: 36,
  },
});
