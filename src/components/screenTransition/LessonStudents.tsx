import Animated, {
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

import {typography} from '@utils/typography';

const DATA = [
  'https://randomuser.me/api/portraits/women/9.jpg',
  'https://randomuser.me/api/portraits/men/44.jpg',
  'https://randomuser.me/api/portraits/men/50.jpg',
  'https://randomuser.me/api/portraits/women/11.jpg',
];

const LessonStudents = ({
  containerStyle,
}: {
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(1, {damping: 80, stiffness: 200});
  }, []);

  return (
    <View style={[containerStyle, {gap: 16, paddingBottom: 54}]}>
      <Text style={styles.title}>Students</Text>
      <View style={{flexDirection: 'row'}}>
        {DATA.map((item, index) => {
          const style = useAnimatedStyle(() => ({
            transform: [
              {
                translateX: interpolate(
                  progress.value,
                  [0, 1],
                  [42 + index * -24, 0],
                ),
              },
              {
                translateY: interpolate(progress.value, [0, 1], [42, 0]),
              },
            ],
          }));

          return (
            <Animated.Image
              key={index}
              source={{uri: item}}
              style={[styles.img, {left: 38 * index}, style]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default LessonStudents;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: typography.bold,
  },
  img: {
    width: 54,
    height: 54,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
  },
});
