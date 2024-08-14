import {
  Text,
  View,
  Platform,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  interpolate,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {WIDTH} from '@utils/device';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const iSiOS = Platform.OS === 'ios';
const AnimPressable = Animated.createAnimatedComponent(Pressable);

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
    () => ({right: interpolate(progress.value, [0, 1], [-100, -38])}),
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
    <View style={[styles.container, {marginTop: top}]}>
      <Animated.View style={[containerStyle, styles.searchContainer]}>
        <AnimPressable
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
          />
        </AnimPressable>
      </Animated.View>
      <AnimPressable
        onPress={onPress}
        hitSlop={styles.hitSlop}
        style={[cancelContainerStyle, {position: 'absolute'}]}>
        <Text style={{fontSize: 16}}>Cancel</Text>
      </AnimPressable>
    </View>
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
    padding: iSiOS ? 16 : 4,
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
});
