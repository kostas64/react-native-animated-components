import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";

const LessonHeader = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, styles.rowCenter]}>
      <View style={[styles.rowCenter, styles.gap12]}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            styles.chevronContainer,
          ]}
        >
          <Entypo name="chevron-left" size={18} />
        </Pressable>
      </View>
      <View style={styles.gap5}>
        <Text style={styles.label}>English grammar</Text>
        <View style={styles.rowCenter}>
          <Text style={styles.description}>{"Will start in "}</Text>
          <Text style={styles.boldDescription}>1:20 min</Text>
        </View>
      </View>
    </View>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    gap: 12,
    paddingBottom: 12,
  },
  chevronContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.PLATINUM,
  },
  label: {
    fontSize: 20,
    fontFamily: typography.bold,
  },
  description: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: Colors.QUICK_SILVER,
  },
  boldDescription: {
    fontSize: 14,
    fontFamily: typography.bold,
  },
  gap12: {
    gap: 12,
  },
  gap5: {
    gap: 5,
  },
});
