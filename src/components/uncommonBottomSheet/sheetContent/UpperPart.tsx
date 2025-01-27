import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {AnimatedStyle} from 'react-native-reanimated';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';

type UpperPartProps = {
  containerStyle?: AnimatedStyle;
  onLayout?: (e: LayoutChangeEvent) => void;
};

const UpperPart = ({containerStyle, onLayout}: UpperPartProps) => {
  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, containerStyle]}>
      <View>
        <Text style={styles.day}>Saturday</Text>
        <Text style={styles.date}>January 29, 2025</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="partly-sunny" size={24} />
        </View>
        <Text style={styles.temperature}>22°</Text>
      </View>
    </Animated.View>
  );
};

export default UpperPart;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 36,
    backgroundColor: '#63bb73',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day: {
    fontFamily: typography.semiBold,
    color: 'white',
  },
  date: {
    fontSize: 12,
    fontFamily: typography.medium,
    color: 'white',
  },
  weatherContainer: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 32,
  },
  temperature: {
    fontSize: 24,
    fontFamily: typography.bold,
    color: 'white',
  },
});
