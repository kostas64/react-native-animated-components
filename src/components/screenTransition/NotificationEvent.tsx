import {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "@components/common/Text";
import { Colors } from "@utils/colors";
import { typography } from "@utils/typography";
import { TNotificationEventProps } from "./types";
import { MED_FONT_UPSCALE_FACTOR } from "@utils/device";
import { useModalContext } from "@providers/ModalProvider";
import NotificationEventModal from "./NotificationEventModal";
import { AnimatedPressable } from "@components/common/AnimatedComponents";

const NotificationEvent = ({
  event,
  containerStyle,
}: TNotificationEventProps) => {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const { setModalInfo } = useModalContext();

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [1, 0.6]),
    transform: [{ scale: interpolate(progress.value, [0, 0.5], [1, 0.93]) }],
  }));

  const bottom = insets.bottom > 0 ? insets.bottom : 64;

  const onPressIn = () => {
    progress.value = withTiming(0.5, { duration: 75 });
    setModalInfo({
      content: <NotificationEventModal event={event} />,
      modalHeight: 300 + bottom,
      lineStyle: {
        backgroundColor: Colors.SILVER_SAND,
      },
      lineStyleContainer: {
        backgroundColor: event.backgroundColor,
      },
    });
  };

  const onPressOut = () => {
    progress.value = withTiming(0, { duration: 150 });
  };

  return (
    <AnimatedPressable
      unstable_pressDelay={100}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.rowCenter,
        styles.container,
        { backgroundColor: event.backgroundColor },
        containerStyle,
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <event.component name={event.iconName} size={20} />
      </View>
      <View style={styles.gap4}>
        <Text style={styles.eventTitle}>{event.eventTitle}</Text>
        <Text
          style={styles.description}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
        >
          {event.description}
        </Text>
      </View>
    </AnimatedPressable>
  );
};

export default NotificationEvent;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
  },
  iconContainer: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
  },
  eventTitle: {
    fontFamily: typography.bold,
    fontSize: 14,
  },
  description: {
    color: Colors.QUICK_SILVER,
    fontFamily: typography.semiBold,
    fontSize: 12,
  },
  gap4: {
    gap: 4,
  },
});
