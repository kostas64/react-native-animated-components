import AntDesign from "@expo/vector-icons/AntDesign";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerNavigationHelpers } from "node_modules/@react-navigation/drawer/lib/typescript/src/types";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import DrawerContentItem from "./DrawerContentItem";

const DrawerContent = ({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={styles.flex}>
      <View style={styles.drawerScroll}>
        <TouchableOpacity
          style={styles.marginBottom}
          onPress={() => {
            StatusBar.setBarStyle("dark-content");
            navigation.closeDrawer();
          }}
        >
          <AntDesign name="close" size={24} color={"white"} />
        </TouchableOpacity>

        <DrawerContentItem label="Home" icon="home-outline" />
        <DrawerContentItem label="My wallet" icon="wallet-outline" />
        <DrawerContentItem label="Notifications" icon="notifications-outline" />
        <DrawerContentItem label="Favourite" icon="heart-outline" />
        <View style={styles.hr} />
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>Support</Text>
          <Text style={styles.footer}>v1.0.0</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  hr: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.WHITE,
    left: 8,
  },
  marginBottom: {
    marginBottom: 32,
  },
  drawerScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footerContainer: {
    padding: 8,
    paddingVertical: 16,
    gap: 8,
  },
  footer: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: typography.medium,
  },
});
