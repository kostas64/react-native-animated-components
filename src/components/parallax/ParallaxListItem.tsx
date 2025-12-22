import { Animated, StyleSheet, View } from "react-native";

import { WIDTH } from "@utils/device";
import { Colors } from "@utils/colors";
import { ParallaxListItemProps } from "./types";
import { shadow } from "@components/addButtonMove/styles";

const ITEM_WIDTH = WIDTH * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const ParallaxListItem = ({
  item,
  index,
  scrollX,
}: ParallaxListItemProps & {
  scrollX: Animated.Value;
}) => {
  const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];
  const outputRange = [0.7 * -WIDTH, 0, 0.7 * WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <View style={[styles.container, shadow]}>
      <View style={styles.innerContainer}>
        <View style={styles.mainImgContainer}>
          <Animated.Image
            source={item.photo}
            style={[styles.mainImg, { transform: [{ translateX }] }]}
          />
        </View>
      </View>
    </View>
  );
};

export default ParallaxListItem;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    elevation: 50,
    backgroundColor: Colors.BABY_PINK,
    borderRadius: 36,
  },
  mainImgContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    borderRadius: 36,
  },
  mainImg: {
    width: ITEM_WIDTH * 1.4,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
    alignSelf: "center",
  },
});
