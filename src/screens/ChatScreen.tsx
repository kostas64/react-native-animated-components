import {
  View,
  LogBox,
  FlatList,
  Keyboard,
  TextInput,
  StyleSheet,
  NativeScrollEvent,
  ImageSourcePropType,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  withDelay,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedKeyboard,
} from 'react-native-reanimated';
import React, {useState} from 'react';
import Haptic from 'react-native-haptic-feedback';
import {captureScreen} from 'react-native-view-shot';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MESSAGES} from '@assets/messages';
import {typography} from '@utils/typography';
import {HAPTIC_CONFIG} from '@utils/haptics';
import Header from '@components/chat/Header';
import Wrapper from '@components/chat/Wrapper';
import {useKeyboard} from '@hooks/useKeyboard';
import {TMessage} from '@components/chat/types';
import {captureOptions} from '@components/chat/data';
import Background from '@components/chat/Background';
import {isAndroid, isIOS, WIDTH} from '@utils/device';
import MessageItem from '@components/chat/MessageItem';
import SendMessageInput from '@components/chat/SendMessageInput';

//Ignore in case you run in simulator
LogBox.ignoreLogs(['RNReactNativeHapticFeedback is not available']);

const triggerLongPressHaptik = () => {
  if (isAndroid) {
    Haptic.trigger('longPress', HAPTIC_CONFIG);
  } else {
    Haptic.trigger('impactMedium', HAPTIC_CONFIG);
  }
};

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const keyboardH = useKeyboard(true);
  const keyb = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });

  const listRef = React.useRef<FlatList>(null);
  const inputRef = React.useRef<TextInput>(null);

  const scrollY = useSharedValue(0);
  const longPress = useSharedValue(0);
  const lockedHeight = useSharedValue(0);

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [captureUri, setCaptureUri] = useState<string | null>(null);
  const [clonedItem, setClonedItem] = useState<{
    id: string;
    top: number | null;
  }>({id: '0', top: null});

  const marginTop = insets.top > 0 ? insets.top : 24;
  const paddingBottom = keyboardH > 0 ? keyboardH : 16;

  const opacity = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        longPress.value,
        [isIOS ? 0 : 0.25, 1],
        [isIOS ? 0 : 0.5, 1],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  const translateList = useAnimatedStyle(() => {
    if (lockedHeight.value && lockedHeight.value > keyb.height.value) {
      return {
        top: -lockedHeight.value,
      };
    }

    return {
      top: -keyb.height.value,
    };
  }, [keyb.height.value]);

  const clonedItemToPass = {
    ...(messages?.find(item => item?.id === clonedItem?.id) ?? messages[0]),
    animate: false,
  };

  const onPressSend = React.useCallback((message: string) => {
    if (message.length > 0) {
      setMessages(oldMessages => [
        {
          id: `${new Date()}-${Math.random()}`,
          image: require('../assets/img/guy.jpg'),
          name: 'Mark 💻',
          message,
          time: '11:25 AM',
          animate: true,
        },
        ...oldMessages,
      ]);
      setInput('');
    }
  }, []);

  const scrollToFirstItem = React.useCallback(() => {
    listRef.current?.scrollToIndex({index: 0, animated: true});
  }, []);

  const onScroll = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.value = e.nativeEvent.contentOffset.y;
    },
    [],
  );

  const capture = React.useCallback((id: string, top: number) => {
    captureScreen(captureOptions).then(uri => {
      isAndroid && triggerLongPressHaptik();
      longPress.value = withTiming(1, {duration: isIOS ? 200 : 1});
      setClonedItem({id, top});
      setCaptureUri(uri);
    });
  }, []);

  const onPressOut = React.useCallback(
    (id?: string, emoji?: ImageSourcePropType) => {
      longPress.value = withTiming(0, {duration: 100}, finished => {
        if (finished) {
          runOnJS(setCaptureUri)(null);
          runOnJS(setClonedItem)({id: '', top: null});

          if (id) {
            runOnJS(onEmojiSelection)(id, emoji);
          }
        }
      });

      if (lockedHeight.value > 0) {
        inputRef.current?.focus();
        lockedHeight.value = withDelay(500, withTiming(0, {duration: 50}));
      }
    },
    [],
  );

  const handleKeyboard = React.useCallback(() => {
    if (keyb.height.value > 0) {
      lockedHeight.value = keyb.height.value;
      Keyboard.dismiss();
    }
  }, []);

  const renderItem = ({item}: {item: TMessage}) => (
    <MessageItem
      item={item}
      scrollY={scrollY}
      capture={capture}
      handleKeyboard={handleKeyboard}
      scrollToFirstItem={scrollToFirstItem}
    />
  );

  const onEmojiSelection = React.useCallback(
    (messageId: string, emojiSelection?: ImageSourcePropType) => {
      setMessages(oldMessages =>
        oldMessages.map(item =>
          item.id === messageId ? {...item, emoji: emojiSelection} : item,
        ),
      );
    },
    [],
  );

  React.useEffect(() => {
    setMessages(MESSAGES);
  }, []);

  return (
    <>
      <Background
        opacity={opacity}
        captureUri={captureUri}
        clonedItem={clonedItem}
        onPressOut={onPressOut}
        clonedItemToPass={clonedItemToPass}
      />

      <View style={styles.container}>
        <View style={[styles.headerContainer, {paddingTop: marginTop}]}>
          <Header />
        </View>

        <Animated.View style={[translateList, {flex: 1}]}>
          <Wrapper>
            <FlatList
              inverted
              ref={listRef}
              data={messages}
              onScroll={onScroll}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{paddingBottom}}
              keyExtractor={item => `message-${item.id}`}
            />
          </Wrapper>

          {/* Input stickd to bottom */}
          <SendMessageInput
            input={input}
            inputRef={inputRef}
            setInput={setInput}
            onPressSend={onPressSend}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 24,
    zIndex: 1,
    backgroundColor: 'white',
  },
  input: {
    textAlignVertical: 'top',
    height: isIOS ? 56 : 74,
    fontSize: 16,
    width: WIDTH - 136,
    fontFamily: typography.semiBold,
    lineHeight: 20,
    color: 'black',
  },
  message: {
    fontFamily: typography.regular,
    fontSize: 16,
    lineHeight: 20,
  },
  emoji: {
    width: 32,
    height: 32,
  },
});
