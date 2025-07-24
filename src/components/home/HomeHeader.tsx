import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, View, Linking, StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {HomeHeaderProps} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

const URL = 'https://www.linkedin.com/in/konstantinos-efkarpidis/';

const HomeHeader = ({progress}: HomeHeaderProps) => {
  const insets = useSafeAreaInsets();

  const nameImg = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [0, 42]),
        },
      ],
    }),
    [],
  );

  const animImg = useAnimatedStyle(
    () => ({
      position: 'absolute',
      width: interpolate(progress.value, [0, 1], [128, 36]),
      height: interpolate(progress.value, [0, 1], [128, 36]),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, -(WIDTH - 36) / 2 + 16],
          ),
        },
        {
          translateY: interpolate(progress.value, [0, 1], [0, -40]),
        },
      ],
    }),
    [],
  );

  const heightStyle = useAnimatedStyle(
    () => ({
      height: interpolate(progress.value, [0, 1], [120, 0]),
    }),
    [],
  );

  return (
    <View style={[styles.spaceHorizontal, {paddingTop: insets.top + 24}]}>
      <View>
        <View style={styles.nameProfRow}>
          <Animated.View style={nameImg}>
            <Text
              maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
              style={styles.name}>{`Konstantinos Efkarpidis`}</Text>
          </Animated.View>
          <TouchableOpacity
            style={styles.linkedIn}
            hitSlop={styles.hitSlop}
            onPress={() => Linking.openURL(URL)}>
            <AntDesign name="linkedin-square" size={24} color={'#0966c2'} />
          </TouchableOpacity>
        </View>
        <Animated.Text
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
          style={[
            styles.profession,
            nameImg,
          ]}>{`Mobile engineer`}</Animated.Text>
      </View>
      <Animated.View style={[styles.imgContainer, heightStyle]}>
        <Animated.Image
          source={require('@assets/img/software-engineer.png')}
          style={animImg}
        />
      </Animated.View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  spaceHorizontal: {
    paddingHorizontal: 16,
  },
  nameProfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.WHITE,
    fontFamily: typography.bold,
  },
  profession: {
    fontSize: 16,
    lineHeight: 18,
    color: Colors.WELDON_BLUE,
    fontFamily: typography.bold,
  },
  linkedIn: {
    padding: 2,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
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
