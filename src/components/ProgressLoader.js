import React from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

const Progress = ({step, steps, height}) => {
  const [width, setWidth] = React.useState(0);
  const animValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

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
        onLayout={e => {
          const calcWidth = e.nativeEvent.layout.width;
          setWidth(calcWidth);
        }}
        style={[styles.loaderContainer, {height, borderRadius: height}]}>
        <Animated.View
          style={[
            styles.innerLoader,
            {
              height,
              borderRadius: height,
              transform: [
                {
                  translateX: animValue,
                },
              ],
            },
          ]}
        />
      </View>
    </>
  );
};

const ProgressLoader = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <Progress step={index} steps={10} height={25} />
    </View>
  );
};

export default ProgressLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  stepsLabel: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
    color: 'black',
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
