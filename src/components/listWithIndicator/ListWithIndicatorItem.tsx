import {Image, StyleSheet, View} from 'react-native';

import {ListItem} from './types';
import {Colors} from '@utils/colors';
import {HEIGHT_SCR, WIDTH} from '@utils/device';

const ListWithIndicatorItem = ({item}: ListItem) => {
  return (
    <View style={{width: WIDTH, height: HEIGHT_SCR}}>
      <Image source={{uri: item.image}} style={styles.img} />
      <View style={[StyleSheet.absoluteFillObject, styles.bg]} />
    </View>
  );
};

export default ListWithIndicatorItem;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
  bg: {
    backgroundColor: Colors.THREE_POINT_BLACK,
  },
});
