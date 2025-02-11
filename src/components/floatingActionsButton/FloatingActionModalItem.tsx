import Animated from 'react-native-reanimated';
import {Pressable, StyleSheet} from 'react-native';

import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {TFloatingModalItemProps} from './types';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';
import {getAnimatedItemStyles} from './animatedStyles';

const FloatingActionModalItem = ({
  item,
  style,
  progress,
}: TFloatingModalItemProps) => {
  const Icon = Animated.createAnimatedComponent(item.component);

  const {animatedIcon, animatedText} = getAnimatedItemStyles({progress});

  return (
    <Pressable
      onPress={() => {
        if (progress.value === 0) {
          return;
        }

        //On item press action
      }}
      style={({pressed}) => [
        pressed && progress.value !== 0 && styles.touch,
        styles.itemContainer,
        style,
      ]}>
      <Icon name={item.name} color={'white'} size={24} style={animatedIcon} />
      <Animated.Text
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
        style={[styles.label, animatedText]}>
        {item.label}
      </Animated.Text>
    </Pressable>
  );
};

export default FloatingActionModalItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  label: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: typography.semiBold,
  },
  touch: {
    backgroundColor: Colors.TWO_POINT_HALF_WHITE,
  },
});
