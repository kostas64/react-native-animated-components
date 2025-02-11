import {Pressable, StyleSheet} from 'react-native';

import Text from './Text';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

type THomeButtonProps = {
  label: string;
  onPress: (props: any) => void;
  backgroundColor: string;
};

const HomeButton = ({
  label,
  onPress,
  backgroundColor = 'rgba(0,0,0,0.2)',
}: THomeButtonProps) => {
  return (
    <Pressable style={[styles.container, {backgroundColor}]} onPress={onPress}>
      <Text
        style={styles.buttonLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 18,
    lineHeight: 24,
    color: 'white',
    fontFamily: typography.medium,
  },
});

export default HomeButton;
