import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {items} from './data';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

const AddToBagButton = ({index}: {index: number}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + 24,
          backgroundColor: items[index].halfFontColor,
        },
      ]}>
      <View style={styles.innerContainer}>
        <Image source={require('@assets/img/apple.png')} style={styles.icon} />
        <Text
          style={styles.label}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          Add to bag
        </Text>
        <Text
          style={styles.label}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          $109.99
        </Text>
      </View>
    </View>
  );
};

export default AddToBagButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  innerContainer: {
    width: WIDTH - 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.75,
  },
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    fontSize: 18,
    color: Colors.WHITE,
    fontFamily: typography.medium,
  },
});
