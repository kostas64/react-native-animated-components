import Animated, {
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Text from '@components/Text';
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
    <View style={[containerStyle, styles.container]}>
      <Text style={styles.title}>Students</Text>
      <View style={styles.row}>
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
  row: {
    flexDirection: 'row',
  },
  container: {
    gap: 16,
    paddingBottom: 54,
  },
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
