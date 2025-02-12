import {StyleSheet, View} from 'react-native';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

import {TEvent} from './types';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import EventIndicator from './EventIndicator';
import {DATA} from '@components/likeInteraction/data';
import ListItem from '@components/likeInteraction/ListItem';

const Event = ({time, title, description, duration}: TEvent) => {
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown.duration(25)}
      style={styles.container}>
      <View style={styles.users}>
        {DATA.reverse().map((item, index) => (
          <ListItem key={index} item={item} index={index} liked={false} />
        ))}
      </View>
      <View>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <EventIndicator label={duration} />
    </Animated.View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 32,
    marginTop: 4,
    minHeight: 210,
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
    fontFamily: typography.medium,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    marginVertical: 8,
    fontFamily: typography.semiBold,
  },
  description: {
    fontSize: 14,
    fontFamily: typography.medium,
  },
  users: {
    position: 'absolute',
    right: 52,
    top: 16,
  },
});
