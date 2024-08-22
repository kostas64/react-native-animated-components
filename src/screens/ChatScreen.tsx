import React, {
  memo,
  Dispatch,
  useState,
  useCallback,
  SetStateAction,
} from 'react';

import {
  Text,
  View,
  Image,
  FlatList,
  Keyboard,
  TextInput,
  Pressable,
  StyleSheet,
  NativeScrollEvent,
  ImageSourcePropType,
  NativeSyntheticEvent,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  withDelay,
  withTiming,
  interpolate,
  SharedValue,
  SlideInDown,
  Extrapolation,
  AnimatedStyle,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  useAnimatedKeyboard,
} from 'react-native-reanimated';
import Haptic from 'react-native-haptic-feedback';
import {CaptureOptions, captureScreen} from 'react-native-view-shot';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MESSAGES} from '@assets/messages';
import {typography} from '@utils/typography';
import {useKeyboard} from '@hooks/useKeyboard';
import {HAPTIC_CONFIG} from '@utils/haptics';
import {HEIGHT_SCR, isAndroid, isIOS, WIDTH} from '@utils/device';

const EMOJI = [
  require('@assets/img/emoji/happy.png'),
  require('@assets/img/emoji/crying.png'),
  require('@assets/img/emoji/in-love.png'),
  require('@assets/img/emoji/laughing.png'),
  require('@assets/img/emoji/anguish.png'),
  require('@assets/img/emoji/angry.png'),
];

const captureOptions: CaptureOptions = {
  format: 'jpg',
  quality: 0.25,
  result: 'tmpfile', //File get deleted when app is opened again
};

const BACKGROUND_BLUR_RADIUS = isIOS ? 50 : 15;
const DELAY_LONG_PRESS = isIOS ? 250 : 150; //Default is 500ms

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const triggerLongPressHaptik = () => {
  if (isAndroid) {
    Haptic.trigger('longPress', HAPTIC_CONFIG);
  } else {
    Haptic.trigger('impactMedium', HAPTIC_CONFIG);
  }
};

const triggerSelectionHaptik = () => {
  if (isAndroid) {
    Haptic.trigger('effectClick', HAPTIC_CONFIG);
  } else {
    Haptic.trigger('selection', HAPTIC_CONFIG);
  }
};

type Message = {
  id: string;
  image: ImageSourcePropType;
  name: string;
  message: string;
  time: string;
  animate?: boolean;
  isOwnerOfChat?: boolean | undefined;
  emoji?: ImageSourcePropType;
};

type MessageItem = {
  item: Message;
  capture?: (id: string, top: number) => void;
  scrollY?: SharedValue<number>;
  handleKeyboard?: () => void;
  scrollToFirstItem?: () => void;
};

type WrapperProps = {
  children: React.ReactNode;
};

type BackgroundProps = {
  captureUri: string | null;
  opacity: AnimatedStyle;
  clonedItemToPass: Message;
  clonedItem: {id: string; top: number | null};
  onPressOut: (id?: string, emoji?: ImageSourcePropType) => void;
};

type EmojiItemProps = {
  item: ImageSourcePropType;
  index: number;
};

type SearchMessageInput = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  inputRef: React.RefObject<TextInput>;
  onPressSend: (input: string) => void;
};

const Wrapper = ({children}: WrapperProps) => {
  const insets = useSafeAreaInsets();

  if (isAndroid) {
    return children;
  }

  const marginTop = insets.top > 0 ? insets.top : 24;

  return (
    <View style={{height: HEIGHT_SCR - 112 - marginTop - insets.bottom}}>
      {children}
    </View>
  );
};

const Header = memo(() => (
  <View style={styles.innerHeaderContainer}>
    <Text style={styles.chatLabel}>Chat</Text>
    <View style={styles.iconsContainer}>
      <Ionicons name={'videocam-outline'} size={24} />
      <Feather size={20} name={'phone'} />
    </View>
  </View>
));

const Background = ({
  opacity,
  captureUri,
  clonedItem,
  clonedItemToPass,
  onPressOut,
}: BackgroundProps) => {
  const animateDismiss = useSharedValue(0);

  const emojiStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animateDismiss.value, [0, 1], [0, 1]),
    transform: [{scale: interpolate(animateDismiss.value, [0, 1], [0.5, 1])}],
  }));

  const onDismiss = useCallback(
    (id?: string, emoji?: ImageSourcePropType, vibrate = false) => {
      animateDismiss.value = withTiming(0, {duration: 50});
      onPressOut(id, emoji === clonedItemToPass.emoji ? undefined : emoji);
      vibrate && triggerSelectionHaptik();
    },
    [clonedItemToPass],
  );

  const renderItem = useCallback(
    ({item, index}: EmojiItemProps) => {
      const backgroundColor =
        clonedItemToPass.emoji === item ? '#d3d3d3' : 'transparent';

      return (
        <AnimPressable
          key={`emoji-${index}`}
          entering={SlideInDown.delay(index * 50)}
          onPress={() => onDismiss(clonedItemToPass.id, item, true)}
          style={[{backgroundColor}, styles.emojiSelectedContainer]}>
          <Image source={item} style={styles.emoji} />
        </AnimPressable>
      );
    },
    [clonedItemToPass],
  );

  React.useEffect(() => {
    if (captureUri) {
      animateDismiss.value = withTiming(1);
    }
  }, [captureUri]);

  if (
    !captureUri ||
    typeof clonedItem?.id !== 'string' ||
    typeof clonedItem?.top !== 'number'
  ) {
    return null;
  }

  return (
    <>
      <AnimPressable style={styles.blurBg} onPress={() => onDismiss()}>
        <Animated.Image
          source={{uri: captureUri}}
          blurRadius={BACKGROUND_BLUR_RADIUS}
          style={[opacity, styles.capturedImg]}
        />
      </AnimPressable>
      <Animated.View
        style={[opacity, styles.clonedMessage, {top: clonedItem?.top}]}>
        <MessageItem item={{...clonedItemToPass, emoji: undefined}} />
        <Animated.View style={[emojiStyle, styles.emojiContainer]}>
          {EMOJI.map((item, index) => renderItem({item, index}))}
        </Animated.View>
      </Animated.View>
    </>
  );
};

const SendMessageInput = React.memo(
  ({input, setInput, inputRef, onPressSend}: SearchMessageInput) => {
    const insets = useSafeAreaInsets();
    const bottomStyle = insets.bottom > 0 ? insets.bottom - 20 : 16;

    return (
      <Pressable
        style={[styles.inputContainer, {marginBottom: bottomStyle}]}
        onPress={() => inputRef?.current?.focus()}>
        <TextInput
          ref={inputRef}
          multiline
          value={input}
          onChangeText={setInput}
          numberOfLines={2}
          placeholder="Message"
          placeholderTextColor={'#bbbbbb'}
          style={styles.input}
        />
        <Pressable
          style={styles.sendContainer}
          onPress={() => onPressSend(input)}>
          <Image
            tintColor={'white'}
            style={styles.send}
            source={require('../assets/img/send.png')}
          />
        </Pressable>
      </Pressable>
    );
  },
);

const MessageItem = React.memo(
  ({
    item,
    scrollY,
    capture,
    handleKeyboard,
    scrollToFirstItem,
  }: MessageItem) => {
    const scale = useSharedValue(item?.animate ? 0 : 1);

    //Handle animation finish when scrolling to top
    useAnimatedReaction(
      () => {
        return scrollY?.value ?? 0;
      },
      (newScroll, oldScroll) => {
        if (newScroll === 0 && oldScroll === 0) {
          return null;
        } else if (newScroll === 0 && oldScroll !== 0) {
          scale.value = withTiming(1);
        }
      },
    );

    const animStyle = useAnimatedStyle(() => {
      if (!item?.animate) {
        return {};
      }

      return {
        transform: [
          {
            scale: interpolate(
              scale.value,
              [0.15, 1],
              [0, 1],
              Extrapolation.CLAMP,
            ),
          },
        ],
        left: interpolate(scale.value, [0.15, 1], [-(WIDTH - 48) / 2, 0]),
        top: interpolate(scale.value, [0.15, 1], [-40, 0]),
      };
    }, []);

    const animImgStyle = useAnimatedStyle(() => ({
      transform: [{scale: !item?.animate ? 1 : scale.value}],
    }));

    const customEntering = useCallback(() => {
      'worklet';
      let animations = {
        opacity: withTiming(1),
        transform: [{scale: withTiming(1)}],
      };
      let initialValues = {
        opacity: 0,
        transform: [{scale: 0}],
      };

      return {
        initialValues,
        animations,
      };
    }, []);

    const customExiting = useCallback(() => {
      'worklet';
      const animations = {
        opacity: withTiming(0),
        transform: [{scale: withTiming(0)}],
      };
      const initialValues = {
        opacity: 1,
        transform: [{scale: 1}],
      };
      return {
        initialValues,
        animations,
      };
    }, []);

    const onLongPress = React.useCallback(
      (e: GestureResponderEvent) => {
        isIOS && triggerLongPressHaptik();

        !!handleKeyboard && handleKeyboard();

        !!capture &&
          capture(item.id, e.nativeEvent.pageY - e.nativeEvent.locationY);
      },
      [handleKeyboard, triggerLongPressHaptik],
    );

    React.useEffect(() => {
      if (item?.animate) {
        !!scrollToFirstItem && scrollToFirstItem();

        //Trigger animation if scroll position is at top
        if (scrollY?.value === 0) {
          scale.value = withTiming(1);
        }
      }
    }, []);

    return (
      <>
        <View style={styles.messageContainer}>
          {!item?.isOwnerOfChat && (
            <Animated.Image
              source={item?.image}
              style={[
                animImgStyle,
                styles.avatar,
                styles.messageRecipient,
                styles.messageSenderBorder,
              ]}
            />
          )}
          <AnimPressable
            pointerEvents={'box-only'}
            onLongPress={onLongPress}
            delayLongPress={DELAY_LONG_PRESS}
            style={[
              animStyle,
              styles.messageInnerContainer,
              item?.isOwnerOfChat
                ? styles.messageSenderBorder
                : styles.messageRecipientBorder,
            ]}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName}>{item?.name}</Text>
              <Text style={styles.messageTime}>{item?.time}</Text>
            </View>
            <Text style={styles.message}>{item?.message}</Text>
            {item.emoji && (
              <Animated.View
                exiting={customExiting}
                entering={customEntering}
                style={[
                  styles.smallEmojiContainer,
                  !item?.isOwnerOfChat && styles.leftPos,
                ]}>
                <Image source={item.emoji} style={styles.smallEmoji} />
              </Animated.View>
            )}
          </AnimPressable>
          {item?.isOwnerOfChat && (
            <Animated.Image
              source={item.image}
              style={[
                animImgStyle,
                styles.avatar,
                styles.messageSender,
                styles.messageRecipientBorder,
              ]}
            />
          )}
        </View>
      </>
    );
  },
);

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

  const [messages, setMessages] = useState<Message[]>([]);
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

  const renderItem = ({item}: {item: Message}) => (
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
            <Animated.FlatList
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
  innerHeaderContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatLabel: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: typography.bold,
  },
  iconsContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  send: {
    left: -2,
    width: 22,
    height: 22,
    transform: [{rotate: '45deg'}],
  },
  inputContainer: {
    marginTop: 8,
    borderRadius: 20,
    marginHorizontal: 24,
    backgroundColor: '#f3f3f3',
    paddingTop: isIOS ? 8 : 2,
    paddingLeft: isIOS ? 16 : 14,
    height: 66,
  },
  input: {
    textAlignVertical: 'top',
    height: isIOS ? 56 : 74,
    fontSize: 16,
    width: WIDTH - 136,
    fontFamily: typography.semiBold,
    lineHeight: 20,
  },
  sendContainer: {
    backgroundColor: '#033de6',
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
    right: 16,
    top: isIOS ? 10 : 11,
  },
  messageContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  messageInnerContainer: {
    flex: 1,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  messageName: {
    fontFamily: typography.semiBold,
  },
  messageTime: {
    fontFamily: typography.regular,
    color: '#a1a1a1',
  },
  messageRecipient: {
    marginRight: 12,
  },
  messageSender: {
    marginLeft: 12,
    marginRight: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  message: {
    fontFamily: typography.regular,
    fontSize: 16,
    lineHeight: 20,
  },
  messageSenderBorder: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  messageRecipientBorder: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  capturedImg: {
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  blurBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  clonedMessage: {
    position: 'absolute',
    width: '100%',
    zIndex: 201,
    overflow: 'hidden',
  },
  emojiContainer: {
    zIndex: 100,
    width: WIDTH - 104,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  emojiSelectedContainer: {
    padding: 4,
    borderRadius: 8,
  },
  emoji: {
    width: 32,
    height: 32,
  },
  smallEmojiContainer: {
    backgroundColor: 'white',
    borderColor: '#e7e7e7',
    borderWidth: 1,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    right: -12,
    bottom: -12,
    position: 'absolute',
  },
  smallEmoji: {
    width: 16,
    height: 16,
  },
  leftPos: {
    left: -12,
    bottom: -12,
  },
});
