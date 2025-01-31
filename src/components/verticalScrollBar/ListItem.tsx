import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

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
      style={[styles.container, item.isLastOfLetter && {marginBottom: 36}]}>
      {item.isFirstOfLetter && (
        <View style={styles.letterContainer}>
          <Animated.Text
            maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
            style={[styles.letter, firstLetterStyle]}>
            {item.letter}
          </Animated.Text>
        </View>
      )}
      <View style={{paddingVertical: 12}}>
        <Text
          maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
          style={styles.name}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  letterContainer: {
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#495057',
  },
  letter: {
    lineHeight: 18,
    fontFamily: typography.bold,
    color: '#6c757d',
  },
  name: {
    color: 'white',
    fontFamily: typography.medium,
    lineHeight: 18,
  },
  container: {
    borderColor: '#495057',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
