import Animated, {
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";
import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";

const DATA = [
  "https://randomuser.me/api/portraits/women/9.jpg",
  "https://randomuser.me/api/portraits/men/44.jpg",
  "https://randomuser.me/api/portraits/men/50.jpg",
  "https://randomuser.me/api/portraits/women/11.jpg",
];

type LessonType = {
  item: string;
  index: number;
  progress: SharedValue<number>;
};

const Lesson = ({ item, index, progress }: LessonType) => {
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [42 + index * -24, 0]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [42, 0]),
      },
    ],
  }));

  return (
    <Animated.Image
      source={{ uri: item }}
      style={[styles.img, { left: 38 * index }, style]}
    />
  );
};

const LessonStudents = ({
  containerStyle,
}: {
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(1, { damping: 80, stiffness: 200 });
  }, [progress]);

  return (
    <View style={[containerStyle, styles.container]}>
      <Text style={styles.title}>Students</Text>
      <View style={styles.row}>
        {DATA.map((item, index) => {
          return (
            <Lesson key={index} item={item} index={index} progress={progress} />
          );
        })}
      </View>
    </View>
  );
};

export default LessonStudents;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
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
    borderColor: Colors.WHITE,
    position: "absolute",
  },
});
