import {StyleSheet, View} from 'react-native';

import {items} from './data';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import {SM_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

const ItemDescription = ({index}: {index: number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.spaceBottom}>
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[styles.text, {color: items[index]?.halfFontColor}]}>
          Form Factor
        </Text>
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[styles.value, {color: items[index]?.fontColor}]}>
          {items[index]?.formFactor}
        </Text>
      </View>
      <View style={styles.spaceBottom}>
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[styles.text, {color: items[index]?.halfFontColor}]}>
          Connection
        </Text>
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[styles.value, {color: items[index]?.fontColor}]}>
          {items[index]?.connection}
        </Text>
      </View>
      <View>
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[styles.text, {color: items[index]?.halfFontColor}]}>
          Power source
        </Text>
        <Text
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
          style={[styles.value, {color: items[index]?.fontColor}]}>
          {items[index]?.power}
        </Text>
      </View>
    </View>
  );
};

export default ItemDescription;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: 24,
  },
  text: {
    fontSize: WIDTH / 20,
    fontFamily: typography.regular,
  },
  value: {
    fontSize: WIDTH / 15,
    fontFamily: typography.bold,
  },
  spaceBottom: {
    paddingBottom: '10%',
  },
});
