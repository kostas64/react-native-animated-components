import Animated, {
  withTiming,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '@utils/colors';
import {DATA} from '@assets/homeData';
import {HomeBodyProps} from './types';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import {THomeNavigationProps} from 'src/App';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';
import HomeButton from '@components/common/HomeButton';

const HomeBody = ({
  scrollRef,
  progress,
  isScrolling,
  isAnimating,
  lastContentOffset,
}: HomeBodyProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<THomeNavigationProps>();

  const paddingBottom = insets.bottom > 0 ? insets.bottom : 32;

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
      contentContainerStyle={[styles.containerBody, {paddingBottom}]}
      showsVerticalScrollIndicator={false}>
      {DATA?.map((mainItem, index) => {
        const props = {
          size: mainItem.iconSize,
          color: mainItem.iconColor,
          name: mainItem.iconName,
          padding: mainItem.padding,
          style: {borderRadius: mainItem.borderRadius},
          borderRadius: mainItem.borderRadius,
          overflow: 'hidden',
          backgroundColor: mainItem.backgroundColor,
        };

        const IconComp =
          mainItem.iconComp === 'FontAwesome'
            ? FontAwesome
            : mainItem.iconComp === 'MaterialCommunityIcons'
            ? MaterialCommunityIcons
            : mainItem.iconComp === 'AntDesign'
            ? AntDesign
            : mainItem.iconComp === 'MaterialIcons'
            ? MaterialIcons
            : mainItem.iconComp === 'Feather'
            ? Feather
            : mainItem.iconComp === 'Entypo'
            ? Entypo
            : Ionicons;

        return (
          <React.Fragment key={index}>
            <View style={styles.sectionContainer}>
              {/*@ts-ignore*/}
              <IconComp {...props} />
              <Text
                style={styles.listLabel}
                maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
                {mainItem.iconText}
              </Text>
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

export default HomeBody;

const styles = StyleSheet.create({
  containerBody: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 18,
    color: Colors.WHITE,
    paddingLeft: 8,
    lineHeight: 32,
    fontFamily: typography.semiBold,
  },
  separator: {
    paddingVertical: 8,
  },
});
