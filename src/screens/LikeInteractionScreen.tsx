import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {Colors} from '@utils/colors';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import ListItem from '@components/likeInteraction/ListItem';
import LikeCounter from '@components/likeInteraction/LikeCounter';
import StatusBarManager from '@components/common/StatusBarManager';
import {DATA, DATA_TO_ADD, FACE} from '@components/likeInteraction/data';

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
          <Text style={styles.subtitle}>
            Do you like these micro interactions?
          </Text>
        </View>

        <View style={styles.line} />

        <View style={styles.counterContainer}>
          <LikeCounter counter={counter} liked={liked} onPress={onPress} />

          <View style={styles.listDataContainer}>
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
    backgroundColor: Colors.WHITE,
  },
  postImg: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  textContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  caption: {
    fontFamily: typography.bold,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: typography.medium,
  },
  line: {
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY,
    width: WIDTH - 36,
    alignSelf: 'center',
    marginVertical: 16,
  },
  counterContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  listDataContainer: {
    position: 'absolute',
    left: 172,
  },
});
