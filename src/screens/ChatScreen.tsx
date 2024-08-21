import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  NativeScrollEvent,
  ImageSourcePropType,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  withTiming,
  interpolate,
  SharedValue,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {captureScreen} from 'react-native-view-shot';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MESSAGES} from '@assets/messages';
import {typography} from '@utils/typography';
import {useKeyboard} from '@hooks/useKeybaord';
import {HEIGHT_SCR, isAndroid, isIOS, WIDTH} from '@utils/device';

const AnimPressable = Animated.createAnimatedComponent(Pressable);

type Message = {
  id: string;
  image: ImageSourcePropType;
  name: string;
  message: string;
  time: string;
  animate?: boolean;
  isOwnerOfChat?: boolean | undefined;
};

type MessageItem = {
  item: Message;
  index: number;
  capture?: (id: string, top: number) => void;
  scrollY?: SharedValue<number>;
  scrollToFirstItem?: () => void;
};

type Wrapper = {
  children: React.ReactNode;
};

type SearchMessageInput = {
  input: string;
  onPressSend: (input: string) => void;
  setInput: Dispatch<SetStateAction<string>>;
};

const Wrapper = ({children}: Wrapper) => {
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

const Header = () => (
  <View style={styles.innerHeaderContainer}>
    <Text style={styles.chatLabel}>Chat</Text>
    <View style={styles.iconsContainer}>
      <Ionicons name={'videocam-outline'} size={24} />
      <Feather size={20} name={'phone'} />
    </View>
  </View>
);

const SendMessageInput = React.memo(
  ({input, setInput, onPressSend}: SearchMessageInput) => {
    const insets = useSafeAreaInsets();
    const inputRef = React.createRef<TextInput>();
    const bottomStyle = insets.bottom > 0 ? insets.bottom - 20 : 16;

    return (
      <Pressable
        style={[
          styles.inputContainer,
          {marginBottom: bottomStyle, marginTop: 8},
        ]}
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

const MessageItem = ({
  item,
  index,
  scrollY,
  capture,
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

  const onLongPress = React.useCallback((e: GestureResponderEvent) => {
    console.log('longPress item ', index, item.message);

    !!capture &&
      capture(item.id, e.nativeEvent.pageY - e.nativeEvent.locationY);
  }, []);

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
        delayLongPress={250}
        onLongPress={onLongPress}
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
  );
};

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const keyboardH = useKeyboard();

  const listRef = React.useRef<FlatList>(null);
  const scrollY = useSharedValue(0);
  const longPress = useSharedValue(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [captureUri, setCaptureUri] = useState<string | null>(null);
  const [clonedItem, setClonedItem] = useState<{
    id: string;
    top: number | null;
  }>({id: '0', top: null});

  const marginTop = insets.top > 0 ? insets.top : 24;
  const paddingBottom = keyboardH > 0 ? keyboardH : 16;

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(longPress.value, [0, 1], [isIOS ? 0 : 0.5, 1]),
  }));

  const clonedItemToPass = {
    ...(messages?.find(item => item?.id === clonedItem?.id) ?? messages[0]),
    animate: false,
  };

  React.useEffect(() => {
    setMessages(MESSAGES);
  }, []);

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
    captureScreen({
      format: 'jpg',
      quality: 0.4,
      result: 'tmpfile',
    }).then(uri => {
      longPress.value = withTiming(1, {duration: isIOS ? 200 : 1});
      setClonedItem({id, top});
      setCaptureUri(uri);
    });
  }, []);

  const onPressOut = React.useCallback(() => {
    longPress.value = withTiming(0, {duration: 100}, finished => {
      if (finished) {
        runOnJS(setCaptureUri)(null);
        runOnJS(setClonedItem)({id: '', top: null});
      }
    });
  }, []);

  const renderItem = ({item, index}: {item: Message; index: number}) => (
    <MessageItem
      item={item}
      index={index}
      scrollY={scrollY}
      capture={capture}
      scrollToFirstItem={scrollToFirstItem}
    />
  );

  return (
    <>
      {captureUri &&
        typeof clonedItem?.id === 'string' &&
        typeof clonedItem?.top === 'number' && (
          <>
            <AnimPressable style={styles.blurBg} onPress={onPressOut}>
              <Animated.Image
                source={{uri: captureUri}}
                blurRadius={isIOS ? 50 : 15}
                style={[opacity, styles.capturedImg]}
              />
            </AnimPressable>
            <Animated.View
              style={[opacity, styles.clonedMessage, {top: clonedItem?.top}]}>
              <MessageItem item={clonedItemToPass} index={Math.random()} />
            </Animated.View>
          </>
        )}
      <View style={styles.container}>
        <View style={[styles.headerContainer, {paddingTop: marginTop}]}>
          <Header />
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={isIOS ? -20 : 0}
          behavior={isIOS ? 'position' : undefined}>
          <Wrapper>
            <Animated.FlatList
              inverted
              ref={listRef}
              data={messages}
              onScroll={onScroll}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              keyExtractor={item => `message-${item.id}`}
              contentContainerStyle={{paddingBottom}}
            />
          </Wrapper>

          {/* Input stickd to bottom */}
          <SendMessageInput
            input={input}
            setInput={setInput}
            onPressSend={onPressSend}
          />
        </KeyboardAvoidingView>
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
  },
});
