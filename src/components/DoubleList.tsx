import {
  View,
  Text,
  Alert,
  Animated,
  FlatList,
  ViewStyle,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import data from '@assets/doubleList';
import React, {Dispatch, SetStateAction} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const {width, height} = Dimensions.get('window');

const colors = {
  yellow: '#FFE8A3',
  dark: '#2D2D2D',
};

interface IIconProps {
  icon: string;
  color: string;
}

interface IItemProps extends IIconProps {
  name: string;
  showText: boolean;
}

type TConnectButtonProps = {
  onPress: () => void;
};

type TListProps = {
  color: string;
  showText?: boolean;
  style: ViewStyle;
  onScroll?: (...args: any[]) => void;
  onItemIndexChanged?: Dispatch<SetStateAction<number>>;
};

const Icon = React.memo(({icon, color}: IIconProps) => {
  return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />;
});

const Item = React.memo(({icon, color, name, showText}: IItemProps | any) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, {color}]}>{name}</Text>
      ) : (
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = React.memo(() => {
  return (
    <View style={styles.connectWithTextContainer}>
      <Text style={styles.connectWithText}>Connect with...</Text>
    </View>
  );
});

const ConnectButton = React.memo(({onPress}: TConnectButtonProps) => {
  return (
    <View style={styles.connectButtonPosition}>
      <View style={styles.line} />
      <TouchableOpacity
        onPress={onPress}
        style={styles.connectButtonContainer}
        activeOpacity={0.8}>
        <Text style={styles.connectButton}>Done!</Text>
      </TouchableOpacity>
    </View>
  );
});

const List = React.forwardRef(
  (
    {color, showText, style, onScroll, onItemIndexChanged}: TListProps,
    ref: any,
  ) => (
    <Animated.FlatList
      ref={ref}
      data={data}
      bounces={false}
      style={style}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      scrollEnabled={!showText}
      decelerationRate={'normal'}
      snapToInterval={ITEM_HEIGHT}
      contentContainerStyle={{
        paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
        paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
        paddingHorizontal: 20,
      }}
      keyExtractor={item => `${item.name}-${item.icon}`}
      renderItem={({item}) => {
        return <Item {...item} color={color} showText={showText} />;
      }}
      onMomentumScrollEnd={e =>
        !!onItemIndexChanged &&
        onItemIndexChanged(e.nativeEvent.contentOffset.y / ITEM_HEIGHT)
      }
    />
  ),
);

const ImplementedWith = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{position: 'absolute', top: insets.top + 16, left: 20}}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
    </View>
  );
};

const DoubleList = () => {
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(() => {
    Alert.alert('Connect with:', data[index].name.toUpperCase());
  }, [index]);
  const yellowRef = React.useRef();
  const darkRef = React.useRef<FlatList>();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );
  const onItemIndexChanged = React.useCallback(setIndex, []);

  React.useEffect(() => {
    scrollY.addListener(v => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImplementedWith />
      <ConnectWithText />
      <List
        color={colors.yellow}
        ref={yellowRef}
        onScroll={onScroll}
        onItemIndexChanged={onItemIndexChanged}
        style={StyleSheet.absoluteFillObject}
      />
      <List
        showText={true}
        color={colors.dark}
        ref={darkRef}
        style={{
          position: 'absolute',
          backgroundColor: colors.yellow,
          width,
          height: ITEM_HEIGHT,
          top: height / 2 - ITEM_HEIGHT / 2,
        }}
      />
      <ConnectButton onPress={onConnectPress} />
      <Item />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  },
  implemented: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.yellow,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.yellow,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  connectWithTextContainer: {
    position: 'absolute',
    top: height / 2 - ITEM_HEIGHT * 2,
    width: width * 0.7,
    paddingHorizontal: 14,
  },
  connectWithText: {
    color: colors.yellow,
    fontSize: 52,
    fontWeight: '700',
    lineHeight: 52,
  },
  connectButtonPosition: {
    position: 'absolute',
    top: height / 2 + ITEM_HEIGHT / 2,
    paddingHorizontal: 14,
  },
  connectButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButton: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.dark,
  },
  line: {
    height: ITEM_HEIGHT * 2,
    width: 4,
    backgroundColor: colors.yellow,
  },
});

export default DoubleList;
