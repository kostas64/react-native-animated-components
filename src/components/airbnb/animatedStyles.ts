import {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

import {HEIGHT, WIDTH} from '@utils/device';

export const getAnimatedStyles = (
  progress: SharedValue<number>,
  progresWhen: SharedValue<number>,
  progressWhereTo: SharedValue<number>,
  openWho: SharedValue<number>,
  openCloseWho: SharedValue<number>,
  closeWhen: SharedValue<number>,
  translatePicker: SharedValue<number>,
  top: number,
  bottom: number,
  bottomHeight: number,
  extraHeight: number,
  insets: {bottom: number},
) => {
  const opacityStyle = useAnimatedStyle(
    () => ({opacity: interpolate(progress.value, [0, 0.8], [0, 1])}),
    [],
  );

  const opacityInputStyle = useAnimatedStyle(() => {
    if (openCloseWho.value > 0) {
      return {
        opacity: interpolate(
          openCloseWho.value,
          [0.75, 1],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      };
    }

    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(
          closeWhen.value,
          [0.75, 1],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      };
    }

    return {
      opacity: interpolate(
        progress.value,
        [0, 0.1, 0.5, 0.8],
        [1, 1, 0, 0],
        Extrapolation.CLAMP,
      ),
    };
  }, []);

  const opacityWhereToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.25, 0.8], [0, 0, 1]),
    }),
    [],
  );

  const opacityWhereToBold = useAnimatedStyle(() => {
    if (openWho.value > 0 && progress.value > 0 && progresWhen.value > 0) {
      return {};
    }

    if (openWho.value > 0) {
      return {
        opacity: interpolate(
          openWho.value,
          [0, 0.5],
          [1, 0],
          Extrapolation.CLAMP,
        ),
      };
    }

    if (progresWhen.value > 0) {
      return {
        opacity: interpolate(
          progresWhen.value,
          [0, 0.5],
          [1, 0],
          Extrapolation.CLAMP,
        ),
      };
    }

    return {
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.5],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  }, []);

  const opacityWhenToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.75, 1], [0, 0, 1]),
      height: interpolate(
        progresWhen.value,
        [0, 1],
        [67, HEIGHT - bottom - 186],
      ),
      width: interpolate(progresWhen.value, [0, 1], [WIDTH - 30, WIDTH - 20]),
      borderRadius: interpolate(progresWhen.value, [0, 1], [16, 32]),
      marginBottom: interpolate(progresWhen.value, [0, 1], [0, 64]),
      transform: [
        {translateX: interpolate(progresWhen.value, [0, 1], [0, -4])},
      ],
    }),
    [],
  );

  const arrowAnimStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progressWhereTo.value,
        [0.1, 0.25],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progressWhereTo.value,
            [0, 0.1],
            [-100, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            progressWhereTo.value,
            [0, 0.1],
            [0, 24],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const opacityWhenClose = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(closeWhen.value, [0, 0.5, 1], [1, 0, 0]),
      };
    }

    return {};
  }, []);

  const opacityClose = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(
          closeWhen.value,
          [0, 0.15],
          [1, 0],
          Extrapolation.CLAMP,
        ),
      };
    } else {
      return {};
    }
  }, []);

  const opacityWhoToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.85, 1], [0, 0, 1]),
      height: interpolate(
        openWho.value,
        [0, 0.8],
        [67, HEIGHT + extraHeight - top - bottomHeight - 230],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        openWho.value,
        [0, 0.8],
        [WIDTH - 30, WIDTH - 20],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            openWho.value,
            [0, 0.8],
            [0, -4],
            Extrapolation.CLAMP,
          ),
        },
      ],
      borderRadius: interpolate(
        openWho.value,
        [0, 0.8],
        [16, 32],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  const opacityWhen = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progresWhen.value,
        [0, 0.25],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  const opacityWhenRevStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progresWhen.value,
        [0.5, 1],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  const opacityOpenWhoStyle = useAnimatedStyle(() => {
    if (openWho.value > 0 && progresWhen.value > 0 && progress.value > 0) {
      return {
        opacity: 1,
      };
    }

    if (openWho.value > 0) {
      return {
        opacity: interpolate(openWho.value, [0, 1], [0, 1]),
      };
    }

    return {
      opacity: interpolate(progresWhen.value, [0, 1], [0, 1]),
    };
  }, []);

  const opacityOpenWhoRevStyle = useAnimatedStyle(() => {
    if (openWho.value > 0) {
      return {
        opacity: interpolate(openWho.value, [0, 1], [1, 0]),
      };
    }

    return {};
  }, []);

  const opacityOpenWhoNormalStyle = useAnimatedStyle(() => {
    if (openCloseWho.value > 0) {
      return {
        opacity: interpolate(
          openCloseWho.value,
          [0, 0.25],
          [1, 0],
          Extrapolation.CLAMP,
        ),
      };
    }

    return {
      opacity: interpolate(
        openWho.value,
        [0.5, 1],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  }, []);

  const opacityCloseWhenInput = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(closeWhen.value, [0, 1], [0, 1]),
      };
    }

    return {
      opacity: 0,
    };
  });

  const opacityOpenWhoClose = useAnimatedStyle(() => ({
    opacity: interpolate(
      openCloseWho.value,
      [0, 0.25],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const opacityOpenWhoCloseRev = useAnimatedStyle(() => {
    if (openCloseWho.value > 0) {
      return {
        opacity: interpolate(
          openCloseWho.value,
          [0, 0.15],
          [1, 0],
          Extrapolation.CLAMP,
        ),
      };
    }

    return {};
  }, []);

  const translateClose = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 0.75],
            [0, 24],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const translateCloseWhen = useAnimatedStyle(() => {
    if (progressWhereTo.value > 0) {
      return {
        opacity: interpolate(
          progressWhereTo.value,
          [0, 0.3],
          [1, 0],
          Extrapolation.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              progressWhereTo.value,
              [0.31, 0.32],
              [0, -100],
              Extrapolation.CLAMP,
            ),
          },
          {
            translateY: interpolate(
              progressWhereTo.value,
              [0.32, 0.33],
              [24, 0],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    }

    if (openCloseWho.value > 0) {
      return {
        opacity: interpolate(
          openCloseWho.value,
          [0, 0.8],
          [1, 0],
          Extrapolation.CLAMP,
        ),
        transform: [
          {translateY: interpolate(openCloseWho.value, [0, 0.8], [24, 0])},
        ],
      };
    }

    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(
          closeWhen.value,
          [0, 1],
          [1, 0],
          Extrapolation.CLAMP,
        ),
        transform: [
          {translateY: interpolate(closeWhen.value, [0, 1], [24, 0])},
        ],
      };
    }

    return {};
  }, []);

  const translateCloseWhere = useAnimatedStyle(() => {
    if (openCloseWho.value > 0) {
      return {
        transform: [
          {
            translateX: interpolate(
              openCloseWho.value,
              [0.15, 0.16],
              [0, -WIDTH],
            ),
          },
        ],
      };
    }

    if (closeWhen.value > 0) {
      return {
        transform: [
          {translateX: interpolate(closeWhen.value, [0.15, 0.16], [0, -WIDTH])},
        ],
      };
    } else {
      return {};
    }
  }, []);

  const transformCloseWhen = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: 1,
        height: interpolate(
          closeWhen.value,
          [0, 1],
          [HEIGHT - insets.bottom - 186, 60],
        ),
        borderRadius: 32,
        width: interpolate(closeWhen.value, [0, 1], [WIDTH - 20, WIDTH - 100]),
        marginTop: interpolate(closeWhen.value, [0, 1], [60, 0]),
        top: interpolate(closeWhen.value, [0, 1], [0, -67]),
        transform: [
          {translateX: interpolate(closeWhen.value, [0, 1], [-4, 10])},
        ],
      };
    } else {
      return {};
    }
  }, []);

  const transformOpenWhoClose = useAnimatedStyle(
    () => ({
      height: interpolate(
        openCloseWho.value,
        [0, 0.8],
        [HEIGHT + extraHeight - top - bottomHeight - 230, 60],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        openCloseWho.value,
        [0, 0.8],
        [WIDTH - 24, WIDTH - 100],
        Extrapolation.CLAMP,
      ),
      borderRadius: 32,
      transform: [
        {
          translateX: interpolate(
            openCloseWho.value,
            [0, 0.8],
            [-4, 10],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            openCloseWho.value,
            [0, 0.8],
            [0, -206],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const listOpacityTranslate = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.25],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progressWhereTo.value,
            [0.25, 0.251],
            [0, -WIDTH],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const listSearchStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.25],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progressWhereTo.value,
            [0, 0.01],
            [-WIDTH, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const inputStyle = useAnimatedStyle(() => {
    if (openWho.value > 0 && progress.value > 0 && progresWhen.value > 0) {
      return {
        height: 67,
        width: WIDTH - 30,
        borderRadius: 16,
        transform: [{translateX: -10}, {translateY: 48}],
      };
    }

    if (openWho.value > 0) {
      return {
        height: interpolate(
          openWho.value,
          [0, 0.8],
          [330, 67],
          Extrapolation.CLAMP,
        ),
        width: interpolate(
          openWho.value,
          [0, 0.8],
          [WIDTH - 20, WIDTH - 30],
          Extrapolation.CLAMP,
        ),
        borderRadius: interpolate(
          openWho.value,
          [0, 0.8],
          [32, 16],
          Extrapolation.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              openWho.value,
              [0, 0.8],
              [-14, -10],
              Extrapolation.CLAMP,
            ),
          },
          {translateY: 48},
        ],
      };
    }

    if (progresWhen.value > 0) {
      return {
        height: interpolate(
          progresWhen.value,
          [0, 0.8],
          [330, 67],
          Extrapolation.CLAMP,
        ),
        width: interpolate(
          progresWhen.value,
          [0, 0.8],
          [WIDTH - 20, WIDTH - 30],
          Extrapolation.CLAMP,
        ),
        borderRadius: interpolate(
          progresWhen.value,
          [0, 0.8],
          [32, 16],
          Extrapolation.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              progresWhen.value,
              [0, 0.8],
              [-14, -10],
              Extrapolation.CLAMP,
            ),
          },
          {translateY: 48},
        ],
      };
    }

    return {
      height: interpolate(
        progress.value,
        [0, 0.8],
        [60, 330],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        progress.value,
        [0, 0.8],
        [WIDTH - 100, WIDTH - 20],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 0.8],
            [0, -14],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            progress.value,
            [0, 0.8],
            [0, 48],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, []);

  const inputWhereToFocused = useAnimatedStyle(() => {
    if (progress.value !== 1) {
      return {};
    }

    return {
      height: interpolate(progressWhereTo.value, [0, 1], [330, HEIGHT]),
      width: interpolate(progressWhereTo.value, [0, 1], [WIDTH - 20, WIDTH]),
      transform: [
        {translateX: interpolate(progressWhereTo.value, [0, 1], [-14, -24])},
        {
          translateY: interpolate(
            progress.value,
            [0, 0.8],
            [0, 48],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, []);

  const innerInputWhereToFocused = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progressWhereTo.value,
      [0, 1],
      ['rgb(161,161,161)', 'rgb(247,247,247)'],
    ),
    backgroundColor: interpolateColor(
      progressWhereTo.value,
      [0, 1],
      ['rgb(255,255,255)', 'rgb(247,247,247)'],
    ),
    width: interpolate(progressWhereTo.value, [0, 1], [WIDTH - 72, WIDTH - 48]),
    transform: [
      {translateY: interpolate(progressWhereTo.value, [0, 1], [0, -60])},
    ],
  }));

  const bottomStyle = useAnimatedStyle(
    () => ({
      bottom: interpolate(progress.value, [0, 1], [-bottomHeight, 0]),
    }),
    [],
  );

  const bottomStyleWhereFocused = useAnimatedStyle(() => {
    if (openCloseWho.value > 0) {
      return {
        bottom: interpolate(
          openCloseWho.value,
          [0, 1],
          [0, -bottomHeight - 10],
        ),
      };
    }

    if (openWho.value > 0 && progresWhen.value > 0 && progress.value > 0) {
      return {
        bottom: -bottomHeight - 10,
      };
    }

    if (openWho.value > 0 && progress.value > 0) {
      return {
        bottom: 0,
      };
    }

    if (progresWhen.value > 0) {
      return {
        bottom: interpolate(progresWhen.value, [0, 1], [0, -bottomHeight - 10]),
      };
    }

    if (progressWhereTo.value > 0) {
      return {
        bottom: interpolate(
          progressWhereTo.value,
          [0, 1],
          [0, -bottomHeight - 10],
        ),
      };
    }

    return {};
  }, []);

  const translatePickerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            translatePicker.value,
            [0, 1, 2],
            [0, (WIDTH - 90) / 3, 2 * ((WIDTH - 90) / 3)],
          ),
        },
      ],
    }),
    [],
  );

  return {
    opacityStyle,
    opacityInputStyle,
    opacityWhereToStyle,
    opacityWhereToBold,
    opacityWhenToStyle,
    arrowAnimStyle,
    opacityWhenClose,
    opacityClose,
    opacityWhoToStyle,
    opacityWhen,
    opacityWhenRevStyle,
    opacityOpenWhoStyle,
    opacityOpenWhoRevStyle,
    opacityOpenWhoNormalStyle,
    opacityCloseWhenInput,
    opacityOpenWhoClose,
    opacityOpenWhoCloseRev,
    translateClose,
    translateCloseWhen,
    translateCloseWhere,
    transformCloseWhen,
    transformOpenWhoClose,
    listOpacityTranslate,
    listSearchStyle,
    inputStyle,
    inputWhereToFocused,
    innerInputWhereToFocused,
    bottomStyle,
    bottomStyleWhereFocused,
    translatePickerStyle,
  };
};
