import React from "react";
import { BackHandler } from "react-native";

import { isIOS } from "@utils/device";

const useBackAction = (callback: () => boolean | null | undefined) => {
  React.useEffect(() => {
    if (isIOS) {
      return;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      callback
    );

    return () => backHandler.remove();
  }, [callback]);
};

export default useBackAction;
