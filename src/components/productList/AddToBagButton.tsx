import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {items} from './data';
import {WIDTH} from '@utils/device';
import {typography} from '@utils/typography';

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
        <Text style={styles.label}>Add to bag</Text>
        <Text style={styles.label}>$299.99</Text>
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
    color: 'white',
    fontFamily: typography.medium,
  },
});
