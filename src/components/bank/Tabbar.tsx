import Animated, {
  withDelay,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { WIDTH } from "@utils/device";
import { Colors } from "@utils/colors";
import Tab from "@components/bank/Tab";
import BankHome from "@screens/Bank/BankHome";
import BankStocks from "@screens/Bank/BankStocks";
import BankWallet from "@screens/Bank/BankWallet";
import BankSettings from "@screens/Bank/BankSettings";
import { TABBAR_HEIGHT, TABBAR_WIDTH } from "@components/bank/constants";

const TABS = [
  {
    ImageSource: require("@assets/img/bank/home.png"),
    screen: "BankHome",
  },
  {
    ImageSource: require("@assets/img/bank/stocks.png"),
    screen: "BankStocks",
  },
  {
    ImageSource: require("@assets/img/bank/wallet.png"),
    screen: "BankWallet",
  },
  {
    ImageSource: require("@assets/img/bank/app.png"),
    screen: "BankSettings",
  },
];

const tabs = [
  {
    name: "BankHome",
    component: BankHome,
  },
  {
    name: "BankStocks",
    component: BankStocks,
  },
  {
    name: "BankWallet",
    component: BankWallet,
  },
  {
    name: "BankSettings",
    component: BankSettings,
  },
];

const Tabbar = ({ navigation }: BottomTabBarProps) => {
  const activeTab = useSharedValue(0);
  const initialPosition = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const spacing = insets.bottom > 0 ? insets.bottom + 8 : 24;
  const tabbarContainerHeight = TABBAR_HEIGHT + 2.25 * spacing;

  const onItemPress = (index: number) => {
    navigation.navigate(tabs?.[index]?.name);
    activeTab.value = index;
  };

  const onLayout = () => {
    requestAnimationFrame(() => {
      initialPosition.value = withDelay(
        500,
        withSpring(1, { damping: 80, stiffness: 200 })
      );
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          initialPosition.value,
          [0, 1],
          [tabbarContainerHeight, 0]
        ),
      },
    ],
  }));

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.container,
        animatedStyle,
        { height: tabbarContainerHeight },
      ]}
    >
      <Svg
        width={WIDTH}
        height={tabbarContainerHeight}
        style={styles.fadeContainer}
      >
        <LinearGradient
          id={"tabbarBackground"}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop offset="0%" stopOpacity="0" stopColor={"#f7f7f7"} />
          <Stop offset="35%" stopOpacity="1" stopColor={"#f7f7f7"} />
        </LinearGradient>
        <Rect
          width={WIDTH}
          height={tabbarContainerHeight}
          fill={"url(#tabbarBackground)"}
        />
      </Svg>
      <View style={[styles.tabbarContainer, { top: 1.5 * spacing }]}>
        <Svg
          width={TABBAR_WIDTH}
          height={TABBAR_HEIGHT}
          style={styles.absolute}
        >
          <LinearGradient id={"tabbar"} x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="50%" stopOpacity="1" stopColor={"#060606"} />
            <Stop offset="100%" stopOpacity="1" stopColor={"#404040"} />
          </LinearGradient>
          <Rect
            rx={36}
            width={TABBAR_WIDTH}
            height={TABBAR_HEIGHT}
            fill={"url(#tabbar)"}
          />
        </Svg>
        <View style={styles.tabbarInnerContainer}>
          {TABS.map((tab, index) => {
            return (
              <Tab
                key={tab.screen}
                index={index}
                tab={tab}
                activeTab={activeTab}
                onItemPress={onItemPress}
              />
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: "absolute",
    width: WIDTH,
    backgroundColor: Colors.TRANSPARENT,
  },
  absolute: {
    position: "absolute",
  },
  fadeContainer: {
    position: "absolute",
    backgroundColor: Colors.TRANSPARENT,
  },
  tabbarContainer: {
    width: TABBAR_WIDTH,
    height: TABBAR_HEIGHT,
    alignSelf: "center",
  },
  tabbarInnerContainer: {
    gap: 4,
    padding: 6,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
});
