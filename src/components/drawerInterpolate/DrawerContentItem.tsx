import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {TDrawerContentItem} from './types';
import {typography} from '@utils/typography';

const DrawerContentItem = ({label, icon}: TDrawerContentItem) => {
  return (
    <TouchableOpacity style={styles.drawerItemContainer}>
      <AntDesign name={icon} color={'white'} size={22} />
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DrawerContentItem;

const styles = StyleSheet.create({
  drawerItemContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 16,
  },
  drawerItemLabel: {
    color: 'white',
    marginLeft: 15,
    fontSize: 16,
    fontFamily: typography.regular,
  },
});
