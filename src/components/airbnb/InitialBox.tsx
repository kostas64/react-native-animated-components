import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR, XSM_FONT_UPSCALE_FACTOR} from '@utils/device';

const InitialBox = () => {
  return (
    <>
      <Entypo name="magnifying-glass" size={24} style={styles.lens} />
      <View>
        <Text
          style={styles.whereTo}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          Where to?
        </Text>
        <Text
          style={styles.subtitle}
          maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>
          Anywhere • Any week • Add guests
        </Text>
      </View>
    </>
  );
};

export default InitialBox;

const styles = StyleSheet.create({
  lens: {
    paddingTop: 4,
    paddingRight: 12,
    color: Colors.BLACK,
  },
  whereTo: {
    fontFamily: typography.medium,
    color: Colors.BLACK,
  },
  subtitle: {
    color: Colors.QUARTZ,
    fontSize: 12,
    fontFamily: typography.regular,
  },
});
