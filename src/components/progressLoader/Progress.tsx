import React from 'react';
import {View, Animated, StyleSheet, LayoutChangeEvent} from 'react-native';

import Text from '@components/Text';
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
    color: 'black',
    fontFamily: typography.bold,
  },
  loaderContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  innerLoader: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
