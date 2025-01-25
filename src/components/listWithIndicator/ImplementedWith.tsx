import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const ImplementedWith = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {bottom: insets.bottom + 16}]}>
      <Text
        style={styles.implemented}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        Implemented with:
      </Text>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        Animated API
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    zIndex: 100,
  },
  implemented: {
    fontSize: 22,
    color: 'white',
    fontFamily: typography.bold,
  },
  label: {
    fontSize: 18,
    color: 'white',
    fontFamily: typography.medium,
  },
});

export default ImplementedWith;
