import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, View, Text, Linking, StyleSheet} from 'react-native';

import {WIDTH} from '@utils/device';
import {HomeHeaderProps} from './types';
import {typography} from '@utils/typography';

const URL = 'https://www.linkedin.com/in/konstantinos-efkarpidis/';

const HomeHeader = ({progress}: HomeHeaderProps) => {
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
          source={require('../../assets/img/software-engineer.png')}
          style={animImg}
        />
      </Animated.View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
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
