import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ListItemProps} from './types';
import {typography} from '@utils/typography';

const ListItem = ({
  item,
  firstLetterH,
  lastLetterH,
  restLetterH,
}: ListItemProps) => {
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
          <Text style={styles.letter}>{item.letter}</Text>
        </View>
      )}
      <View style={{paddingVertical: 12}}>
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
