import React from 'react';
import Animated from 'react-native-reanimated';
import {Pressable, StyleSheet} from 'react-native';

import {typography} from '@utils/typography';
import {TFloatingModalItemProps} from './types';
import {getAnimatedItemStyles} from './animatedStyles';

const FloatingActionModalItem = ({
  item,
  progress,
  style,
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
      <Animated.Text style={[styles.label, animatedText]}>
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
    color: 'white',
    fontFamily: typography.semiBold,
  },
  touch: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
