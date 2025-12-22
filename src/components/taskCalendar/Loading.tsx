import { useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { TLoading } from "./types";
import { Colors } from "@utils/colors";
import { Timeout } from "src/types/common";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";

const Loading = ({ loading, stopLoading }: TLoading) => {
  let timeout = useRef<Timeout>(null);

  useEffect(() => {
    if (!loading) {
      return;
    }

    !!timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      !!stopLoading && stopLoading();
    }, 600);

    return () => {
      !!timeout.current && clearTimeout(timeout.current);
    };
  }, [loading, stopLoading]);

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"small"} color={"white"} />

      <Text style={styles.label}>Retrieving tasks</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 400,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    zIndex: 1,
  },
  label: {
    fontSize: 15,
    fontFamily: typography.medium,
    color: Colors.WHITE,
  },
});
