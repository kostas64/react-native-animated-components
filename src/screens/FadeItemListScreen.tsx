import { FlashList } from "@shopify/flash-list";
import { Image, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@utils/colors";
import { FadeItemProps } from "@components/fadeItemList/types";
import FadeListItem from "@components/fadeItemList/FadeListItem";
import StatusBarManager from "@components/common/StatusBarManager";
import { BG_IMG, DATA, SPACING } from "@components/fadeItemList/constants";

const Separator = () => <View style={{ height: SPACING }} />;

const ScrollItemListScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const renderItem = ({ item, index }: FadeItemProps) => (
    <FadeListItem item={item} index={index} scrollY={scrollY} />
  );

  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <Image
          blurRadius={50}
          source={{ uri: BG_IMG }}
          style={StyleSheet.absoluteFillObject}
        />
        <FlashList
          data={DATA}
          onScroll={(e) => {
            scrollY.value = e.nativeEvent.contentOffset.y;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 24,
            paddingHorizontal: SPACING,
            paddingBottom: 2 * SPACING,
          }}
          ItemSeparatorComponent={Separator}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});

export default ScrollItemListScreen;
