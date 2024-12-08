import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {typography} from '@utils/typography';
import {TNotificationEventProps} from './types';
import {useModalContext} from '@providers/ModalProvider';
import NotificationEventModal from './NotificationEventModal';

const AnimatedTouch = Animated.createAnimatedComponent(Pressable);

const NotificationEvent = ({
  event,
  containerStyle,
}: TNotificationEventProps) => {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const {setModalInfo} = useModalContext();

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [1, 0.6]),
    transform: [{scale: interpolate(progress.value, [0, 0.5], [1, 0.93])}],
  }));

  const bottom = insets.bottom > 0 ? insets.bottom : 64;

  const onPressIn = () => {
    progress.value = withTiming(0.5, {duration: 75});
    setModalInfo({
      content: <NotificationEventModal event={event} />,
      modalHeight: 300 + bottom,
      lineStyle: {
        backgroundColor: '#c3c3c3',
      },
      lineStyleContainer: {
        backgroundColor: event.backgroundColor,
      },
    });
  };

  const onPressOut = () => {
    progress.value = withTiming(0, {duration: 150});
  };

  return (
    <AnimatedTouch
      unstable_pressDelay={100}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.rowCenter,
        styles.container,
        {backgroundColor: event.backgroundColor},
        containerStyle,
        style,
      ]}>
      <View style={styles.iconContainer}>
        <event.component name={event.iconName} size={20} />
      </View>
      <View style={{gap: 4}}>
        <Text style={styles.eventTitle}>{event.eventTitle}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </AnimatedTouch>
  );
};

export default NotificationEvent;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
  },
  iconContainer: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  eventTitle: {
    fontFamily: typography.bold,
    fontSize: 14,
  },
  description: {
    color: '#a1a1a1',
    fontFamily: typography.semiBold,
    fontSize: 12,
  },
});
