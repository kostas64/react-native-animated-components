import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  useDrawerStatus,
  useDrawerProgress,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  DrawerNavigationHelpers,
  DrawerContentComponentProps,
} from "node_modules/@react-navigation/drawer/lib/typescript/src/types";
import { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import StatusBarManager from "@components/common/StatusBarManager";
import DrawerContent from "@components/drawerInterpolate/DrawerContent";
import { DrawerTypes, TDrawerList } from "@components/drawerInterpolate/types";

const Drawer = createDrawerNavigator<TDrawerList>();

const DrawerContentCustom = (props: DrawerContentComponentProps) => (
  <DrawerContent navigation={props.navigation} />
);

const DrawerInterpolateScreen = () => {
  const screenOptions = {
    headerShown: false,
    drawerType: "slide" as DrawerTypes,
    overlayColor: "transparent",
    sceneContainerStyle: styles.sceneContainerStyle,
    drawerStyle: styles.drawerStyle,
  };

  return (
    <View style={styles.navigatorContainer}>
      <Drawer.Navigator
        screenOptions={screenOptions}
        drawerContent={DrawerContentCustom}
      >
        <Drawer.Screen
          name="DrawerInterpolateNested"
          options={{
            sceneStyle: {
              backgroundColor: Colors.RICH_ELECTRIC_BLUE,
            },
          }}
        >
          {(props: { navigation: DrawerNavigationHelpers }) => (
            <DrawerInterpolate {...props} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const DrawerInterpolate = ({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) => {
  const insets = useSafeAreaInsets();
  const drawerStatus = useDrawerStatus();
  const drawerProgress = useDrawerProgress();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);

    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 34]);

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  useEffect(() => {
    if (drawerStatus === "open") {
      StatusBar.setBarStyle("light-content");
    } else if (drawerStatus === "closed") {
      StatusBar.setBarStyle("dark-content");
    }
  }, [drawerStatus]);

  return (
    <>
      <StatusBarManager />
      <Animated.View style={[styles.container, animatedStyles]}>
        <TouchableOpacity
          onPress={() => {
            StatusBar.setBarStyle("light-content");
            navigation.openDrawer();
          }}
          style={[
            styles.menuContainer,
            insets.top > 0 ? { paddingTop: insets.top + 8 } : styles.spaceTop,
          ]}
        >
          <Entypo name="menu" size={26} />
          <Text style={styles.label}>Menu</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  navigatorContainer: {
    flex: 1,
    backgroundColor: Colors.RICH_ELECTRIC_BLUE,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
  },
  label: {
    fontSize: 18,
    paddingLeft: 8,
    fontFamily: typography.semiBold,
  },
  sceneContainerStyle: {
    backgroundColor: Colors.TRANSPARENT,
  },
  drawerStyle: {
    flex: 1,
    width: "65%",
    paddingRight: 20,
    backgroundColor: Colors.TRANSPARENT,
  },
  spaceTop: {
    paddingTop: 28,
  },
});

export default DrawerInterpolateScreen;
