import {
  withTiming,
  useSharedValue,
  cancelAnimation,
} from 'react-native-reanimated';
import {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import FloatingActionButton, {
  RefProps,
} from '@components/floatingActionsButton/FloatingActionButton';
import {Colors} from '@utils/colors';
import StatusBarManager from '@components/StatusBarManager';
import FloatingActionModal from '@components/floatingActionsButton/FloatingActionModal';

const FloatingActionButtonScreen = () => {
  const floatingRef = useRef<RefProps>(null);
  const progress = useSharedValue(0);

  const animate = () => {
    if (progress.value === 0) {
      progress.value = withTiming(0.5, {duration: 750});
    } else if (progress.value === 0.5) {
      progress.value = withTiming(1, {duration: 500}, finished => {
        if (finished) {
          progress.value = 0;
        }
      });
    } else {
      cancelAnimation(progress);
      progress.value = withTiming(0, {duration: 500});
    }
  };

  const onTouchOut = () => {
    if (progress.value > 0) {
      floatingRef.current?.close();
    }
  };

  return (
    <>
      <StatusBarManager barStyle="dark" />
      <View style={styles.container} onTouchStart={onTouchOut}>
        <View style={styles.buttonPosition}>
          <View style={styles.buttonContainer}>
            <FloatingActionButton
              ref={floatingRef}
              progress={progress}
              onPress={animate}
            />
            <FloatingActionModal progress={progress} style={styles.absolute} />
          </View>
        </View>
      </View>
    </>
  );
};

export default FloatingActionButtonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BABY_PINK,
  },
  buttonPosition: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    bottom: 36,
    right: 24,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  absolute: {
    position: 'absolute',
  },
});
