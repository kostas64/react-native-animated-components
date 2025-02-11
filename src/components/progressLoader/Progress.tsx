import React from 'react';
import {View, Animated, StyleSheet, LayoutChangeEvent} from 'react-native';

import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {TProgressProps} from './types';
import {typography} from '@utils/typography';

const Progress = ({step, steps, height}: TProgressProps) => {
  const [width, setWidth] = React.useState(0);
  const animValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const calcWidth = e.nativeEvent.layout.width;
    setWidth(calcWidth);
  }, []);

  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: reactive,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [width, step]);

  return (
    <>
      <Text style={styles.stepsLabel}>{`${step}/${steps}`}</Text>
      <View
        onLayout={onLayout}
        style={[styles.loaderContainer, {height, borderRadius: height}]}>
        <Animated.View
          style={[
            styles.innerLoader,
            {
              height,
              borderRadius: height,
              transform: [{translateX: animValue}],
            },
          ]}
        />
      </View>
    </>
  );
};

export default Progress;

const styles = StyleSheet.create({
  stepsLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: Colors.BLACK,
    fontFamily: typography.bold,
  },
  loaderContainer: {
    backgroundColor: Colors.POINT_ONE_BLACK,
    overflow: 'hidden',
  },
  innerLoader: {
    width: '100%',
    backgroundColor: Colors.HALF_BLACK,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
