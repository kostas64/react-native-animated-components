import Animated, {
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import React from 'react';
import {faker} from '@faker-js/faker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StatusBarManager from '@components/StatusBarManager';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const AnimIcon = Animated.createAnimatedComponent(AntDesign);

//Initiallize fake lib with seed + Data
faker.seed(2);

const FACE =
  'https://img.freepik.com/premium-photo/man-with-fake-face-black-background_905510-3607.jpg';

const DATA = [...Array(4).keys()].map(_ => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number({max: 1}) === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
  };
});

const DATA_TO_ADD = [...Array(1).keys()].map(_ => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number({max: 1}) === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
  };
});

type TLikeCounter = {
  counter: number;
  liked: boolean;
  onPress: () => void;
};

const LikeCounter = ({counter, liked, onPress}: TLikeCounter) => {
  const animate = useSharedValue(0);
  const first = React.useRef(0);

  const style = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(animate.value, [0, 80, 144], [1, 1.5, 1])}],
    color: interpolateColor(animate.value, [0, 144], ['#a1a1a1', '#f85230']),
  }));

  React.useEffect(() => {
    const toValue = !!liked ? 144 : 0;

    if (first.current === 0 && !liked) {
      first.current = 1;
    } else if (first.current === 0 && liked) {
      animate.value = withTiming(toValue, {duration: 1});
      first.current = 1;
    } else {
      animate.value = withSpring(toValue, {damping: 12});
    }
  }, [liked]);

  return (
    <View onTouchStart={onPress} style={styles.counterContainer}>
      <AnimIcon name="heart" size={20} color={'#a1a1a1'} style={style} />
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

type TListItem = {
  item: {
    image: string;
  };
  index: number;
  liked: boolean;
};

const ListItem = ({item, index, liked}: TListItem) => {
  const animate = useSharedValue(0);
  const first = useSharedValue(0);

  React.useEffect(() => {
    const toValue = !!liked ? 0 : 144;

    const duration = first.value === 0 ? 0 : 300;

    if (toValue === 0) {
      animate.value =
        first.value === 0
          ? withTiming(toValue, {duration})
          : withDelay((4 - index) * 50, withTiming(toValue, {duration}));
      first.value = 1;
    } else if (toValue === 144) {
      animate.value =
        first.value === 0
          ? withTiming(toValue, {duration})
          : withDelay(index * 50, withTiming(toValue, {duration}));
      first.value = 1;
    }
  }, [liked]);

  const style = useAnimatedStyle(() => {
    if (index === 0) {
      return {
        opacity: interpolate(animate.value, [0, 144], [0, 1]),
        transform: [
          {scale: interpolate(animate.value, [0, 144], [0, 1])},
          {
            translateX: interpolate(
              animate.value,
              [0, 144],
              [(index - 1) * -26, index * -26],
            ),
          },
        ],
      };
    }

    if (index === 4) {
      return {
        opacity: interpolate(animate.value, [0, 144], [1, 0]),
        transform: [
          {scale: interpolate(animate.value, [0, 144], [1, 0.75])},
          {
            translateX: interpolate(
              animate.value,
              [0, 144],
              [(index - 1) * -26, (index - 1) * -36],
            ),
          },
        ],
      };
    }

    return {
      opacity: 1,
      transform: [
        {
          translateX: interpolate(
            animate.value,
            [0, 144],
            [(index - 1) * -26, index * -26],
          ),
        },
      ],
    };
  });

  return (
    <Animated.Image
      borderRadius={18}
      source={{uri: item.image}}
      style={[style, styles.img]}
    />
  );
};

const LikeInteractionScreen = () => {
  const listData = [...DATA, ...DATA_TO_ADD];
  const [liked, setLiked] = React.useState(false);
  const [counter, setCounter] = React.useState(139);

  const onPress = () => {
    setCounter(old => (old === 139 ? 140 : 139));
    setLiked(old => !old);
  };

  return (
    <>
      <StatusBarManager barStyle="light" />
      <View style={styles.container}>
        <Image source={{uri: FACE}} style={styles.postImg} />
        <View style={styles.textContainer}>
          <Text style={styles.caption}>Hello community 👋</Text>
          <Text>Do you like these micro interactions?</Text>
        </View>

        <View style={styles.line} />

        <View style={{marginHorizontal: 16, flexDirection: 'row'}}>
          <LikeCounter counter={counter} liked={liked} onPress={onPress} />

          <View style={{transform: [{translateX: 86}]}}>
            {listData.reverse().map((item, index) => (
              <ListItem key={index} item={item} index={index} liked={liked} />
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default LikeInteractionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postImg: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  img: {
    width: 36,
    aspectRatio: 1 / 1,
    borderWidth: 2,
    position: 'absolute',
    borderColor: 'white',
  },
  textContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  caption: {
    fontWeight: '500',
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#d3d3d3',
    width: WIDTH - 36,
    alignSelf: 'center',
    marginVertical: 16,
  },
  counterContainer: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#e9e9e9',
  },
  counter: {
    marginLeft: 10,
    color: '#666666',
  },
});
