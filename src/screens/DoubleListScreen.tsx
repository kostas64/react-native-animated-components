import {
  View,
  Alert,
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useEffect, useRef} from 'react';

import data from '@assets/doubleList';
import List from '@components/doubleList/List';
import {HEIGHT_SCR, WIDTH} from '@utils/device';
import Item from '@components/doubleList/ConnectListItem';
import StatusBarManager from '@components/common/StatusBarManager';
import ConnectWithText from '@components/doubleList/ConnectWithText';
import {colors, ITEM_HEIGHT} from '@components/doubleList/constants';

const DoubleListScreen = () => {
  const yellowRef = useRef();
  const darkRef = useRef<FlatList>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const onMomentumScrollEnd = (index: number) => {
    Alert.alert('Pay with:', data?.[index]?.name?.toUpperCase());
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  useEffect(() => {
    scrollY.addListener(v => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, []);

  return (
    <>
      <StatusBarManager barStyle="light" />

      <View style={styles.container}>
        <ConnectWithText />
        <List
          color={colors.yellow}
          ref={yellowRef}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          style={StyleSheet.absoluteFillObject}
        />
        <List
          showText={true}
          color={colors.dark}
          ref={darkRef}
          style={styles.list}
        />
        <Item />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  },
  list: {
    position: 'absolute',
    backgroundColor: colors.yellow,
    width: WIDTH,
    height: ITEM_HEIGHT,
    top: HEIGHT_SCR / 2 - ITEM_HEIGHT / 2,
  },
});

export default DoubleListScreen;
