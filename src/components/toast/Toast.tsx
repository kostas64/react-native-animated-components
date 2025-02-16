import Animated, {
  runOnJS,
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '@utils/colors';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import {isAndroid, WIDTH} from '@utils/device';
import {shadows} from '@components/bank/styles';

const Toast = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const progress = useSharedValue(0);

  const insets = useSafeAreaInsets();
  const top = insets.top > 0 ? insets.top + 8 : 24;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(progress.value, [0, 1], [-75, top]),
    };
  });

  useEffect(() => {
    progress.value = withSpring(1, {damping: 15}, finished => {
      if (finished) {
        progress.value = withDelay(
          2500,
          withTiming(0, {}, finished => {
            if (finished) {
              runOnJS(setMessage)(null);
            }
          }),
        );
      }
    });
  }, []);

  return (
    <Animated.View
      style={[
        isAndroid ? styles.border : shadows.veryJustShadow,
        styles.container,
        animatedStyle,
      ]}>
      <Text style={styles.label}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignSelf: 'center',
    position: 'absolute',
    width: WIDTH - 48,
    padding: 16,
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.PLATINUM,
  },
  label: {
    fontFamily: typography.medium,
  },
});
