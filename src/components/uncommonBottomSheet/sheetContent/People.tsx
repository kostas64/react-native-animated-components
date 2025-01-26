import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import ListItem from '@components/likeInteraction/ListItem';
import {DATA, DATA_TO_ADD} from '@components/likeInteraction/data';

const listData = [...DATA, ...DATA_TO_ADD];

const People = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gap}>
        <Text style={styles.people}>80 people</Text>
        <Text style={styles.joined}>Joined camp</Text>
      </View>

      <View style={styles.peopleContainer}>
        {listData.reverse().map((item, index) => (
          <ListItem key={index} item={item} index={index} liked />
        ))}
      </View>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  gap: {
    gap: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  people: {
    fontFamily: typography.semiBold,
  },
  joined: {
    color: '#a1a1a1',
    fontSize: 12,
    fontFamily: typography.medium,
  },
  peopleContainer: {
    gap: 16,
    flexDirection: 'row',
  },
});
