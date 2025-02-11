import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {View, TextInput, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  isIOS,
  WIDTH,
  MAX_FONT_UPSCALE_FACTOR,
  MED_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import Text from '@components/Text';
import StatusBarManager from '@components/StatusBarManager';
import {AnimatedPressable} from '@components/AnimatedComponents';

const TranslateSearchIOSScreen = () => {
  const progress = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const inputRef = React.useRef<TextInput>(null);
  const [innerWidth, setInnerWidth] = React.useState(0);

  const top = insets.top < 24 ? 32 : insets.top;

  const containerStyle = useAnimatedStyle(
    () => ({
      width: interpolate(progress.value, [0, 1], [WIDTH - 60, WIDTH - 120]),
      transform: [{translateX: interpolate(progress.value, [0, 1], [0, -30])}],
    }),
    [],
  );

  const innerContainerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, -(WIDTH - 156 - innerWidth) / 2],
          ),
        },
      ],
    }),
    [innerWidth],
  );

  const cancelContainerStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      right: interpolate(progress.value, [0, 1], [-100, -38]),
    }),
    [],
  );

  const onPress = () => {
    const toValue = progress.value === 0 ? 1 : 0;
    progress.value = withTiming(toValue);

    if (toValue === 0) {
      inputRef.current?.blur();
    }
  };

  const openInput = () => {
    if (progress.value === 0) {
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <StatusBarManager />
      <View style={[styles.container, {marginTop: top}]}>
        <Animated.View style={[containerStyle, styles.searchContainer]}>
          <AnimatedPressable
            onPress={openInput}
            style={[innerContainerStyle, styles.innerSearchContainer]}>
            <Feather name="search" size={24} color={'#a69995'} />
            <TextInput
              ref={inputRef}
              onLayout={e => setInnerWidth(e.nativeEvent.layout.width + 32)}
              onFocus={onPress}
              onSubmitEditing={onPress}
              selectionColor={'white'}
              cursorColor={'white'}
              placeholder="App Library"
              returnKeyType="done"
              placeholderTextColor={'#a69995'}
              style={styles.input}
              maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
            />
          </AnimatedPressable>
        </Animated.View>
        <AnimatedPressable
          onPress={onPress}
          hitSlop={styles.hitSlop}
          style={cancelContainerStyle}>
          <Text
            style={styles.cancelLabel}
            maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
            Cancel
          </Text>
        </AnimatedPressable>
      </View>
    </>
  );
};

export default TranslateSearchIOSScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  searchContainer: {
    backgroundColor: '#5e5351',
    borderRadius: 20,
  },
  innerSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isIOS ? 16 : 4,
  },
  input: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginLeft: 8,
  },
  hitSlop: {
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
  },
  cancelLabel: {
    fontSize: 16,
  },
});
