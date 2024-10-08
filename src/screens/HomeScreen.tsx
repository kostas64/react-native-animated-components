//Native Libs
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  withTiming,
  SharedValue,
  interpolate,
  AnimatedRef,
  Extrapolation,
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//My Libs
import {WIDTH} from '@utils/device';
import {DATA} from '@assets/homeData';
import {THomeNavigationProps} from 'src/App';
import {typography} from '@utils/typography';
import HomeButton from '@components/HomeButton';
import StatusBarManager from '@components/StatusBarManager';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/component/ScrollView';

const URL = 'https://www.linkedin.com/in/konstantinos-efkarpidis/';

const HomeHeader = ({progress}: {progress: SharedValue<number>}) => {
  const insets = useSafeAreaInsets();

  const nameImg = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, 32],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const animImg = useAnimatedStyle(
    () => ({
      position: 'absolute',
      width: interpolate(
        progress.value,
        [0, 1],
        [128, 36],
        Extrapolation.CLAMP,
      ),
      height: interpolate(
        progress.value,
        [0, 1],
        [128, 36],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, -(WIDTH - 36) / 2 + 8],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [0, -40],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const heightStyle = useAnimatedStyle(
    () => ({
      height: interpolate(
        progress.value,
        [0, 1],
        [120, 0],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  return (
    <View
      style={{
        paddingTop: insets.top + 24,
        paddingHorizontal: 16,
      }}>
      <View style={styles.nameProfRow}>
        <Animated.View style={nameImg}>
          <Text style={styles.name}>{`Konstantinos Efkarpidis`}</Text>
          <Text style={styles.profession}>{`Mobile engineer`}</Text>
        </Animated.View>
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          onPress={() => Linking.openURL(URL)}>
          <AntDesign name="linkedin-square" size={24} color={'#0966c2'} />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.imgContainer, heightStyle]}>
        <Animated.Image
          source={require('../assets/img/software-engineer.png')}
          style={animImg}
        />
      </Animated.View>
    </View>
  );
};

const HomeBody = ({
  scrollRef,
  progress,
  isScrolling,
  isAnimating,
  lastContentOffset,
}: {
  progress: SharedValue<number>;
  isScrolling: SharedValue<boolean>;
  isAnimating: SharedValue<boolean>;
  lastContentOffset: SharedValue<number>;
  scrollRef: AnimatedRef<AnimatedScrollView>;
}) => {
  const navigation = useNavigation<THomeNavigationProps>();

  const headerScrollHandler = () => {
    return useAnimatedScrollHandler({
      onScroll: event => {
        const DIFF = event.contentOffset.y - lastContentOffset.value;

        //Scroll up
        if (lastContentOffset.value > event.contentOffset.y && DIFF < -3) {
          if (isScrolling.value && !isAnimating.value) {
            isAnimating.value = true;
            progress.value = withTiming(0, {}, finished => {
              if (finished) {
                isAnimating.value = false;
              }
            });
          }
          //Scroll down
        } else if (
          lastContentOffset.value < event.contentOffset.y &&
          DIFF > 3
        ) {
          if (isScrolling.value && !isAnimating.value) {
            isAnimating.value = true;
            progress.value = withTiming(1, {}, finished => {
              if (finished) {
                isAnimating.value = false;
              }
            });
          }
        }

        lastContentOffset.value = event.contentOffset.y;
      },
      onBeginDrag: () => {
        isScrolling.value = true;
      },
      onEndDrag: () => {
        isScrolling.value = false;
      },
    });
  };

  const scrollHandler = headerScrollHandler();

  return (
    <Animated.ScrollView
      //@ts-ignore
      ref={scrollRef}
      bounces={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={styles.containerBody}
      showsVerticalScrollIndicator={false}>
      {DATA?.map((mainItem, index) => {
        const props =
          mainItem.iconComp === 'image'
            ? {
                style: styles.icon,
                source: mainItem.iconName,
              }
            : {
                size: mainItem.iconSize,
                color: mainItem.iconColor,
                name: mainItem.iconName,
              };

        const IconComp =
          mainItem.iconComp === 'image'
            ? Image
            : mainItem.iconComp === 'FontAwesome'
            ? FontAwesome
            : mainItem.iconComp === 'MaterialCommunityIcons'
            ? MaterialCommunityIcons
            : mainItem.iconComp === 'AntDesign'
            ? AntDesign
            : Ionicons;

        return (
          <React.Fragment key={index}>
            <View style={styles.sectionContainer}>
              {/*@ts-ignore*/}
              <IconComp {...props} />
              <Text style={styles.listLabel}>{mainItem.iconText}</Text>
            </View>
            <View style={styles.separator} />
            {mainItem?.items?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <HomeButton
                    label={item.label}
                    backgroundColor={item.backgroundColor} //@ts-ignore
                    onPress={() => navigation.navigate(item.screen)}
                  />
                  <View style={styles.separator} />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </Animated.ScrollView>
  );
};

const HomeScreen = () => {
  const scrollRef = useAnimatedRef<AnimatedScrollView>();

  const progress = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  return (
    <>
      <StatusBarManager barStyle="dark" />
      <View style={styles.container}>
        <HomeHeader progress={progress} />
        <HomeBody
          progress={progress}
          scrollRef={scrollRef}
          isScrolling={isScrolling}
          isAnimating={isAnimating}
          lastContentOffset={lastContentOffset}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2cfec',
  },
  containerBody: {
    flexGrow: 1,
    backgroundColor: '#f2f7fd',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 18,
    color: '#3f546a',
    paddingLeft: 8,
    lineHeight: 32,
    fontFamily: typography.semiBold,
  },
  separator: {
    paddingVertical: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  nameProfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    color: '#3f546a',
    fontFamily: typography.bold,
  },
  profession: {
    fontSize: 18,
    lineHeight: 22,
    color: '#819cb8',
    fontFamily: typography.bold,
  },
  imgContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  hitSlop: {
    top: 24,
    left: 24,
    right: 24,
    bottom: 24,
  },
});

export default HomeScreen;
