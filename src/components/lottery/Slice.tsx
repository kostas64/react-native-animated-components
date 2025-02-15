import {Path, Text} from 'react-native-svg';
import React, {memo, useCallback} from 'react';

import {Colors} from '@utils/colors';
import {TListItem, TSlice} from './types';
import {typography} from '@utils/typography';
import {OUTER_BORDER_W, RADIUS} from './constants';
import {calculateTextPosition, createSlicePath} from './utils';

const Slice = memo(
  ({
    item,
    index,
    isSelected,
    total,
    spinning,
    selectOption,
  }: TSlice & TListItem) => {
    const startAngle = total === 1 ? 0 : (360 / total) * index;
    const endAngle = total === 1 ? 360 : startAngle + 360 / total;

    const path = createSlicePath(
      startAngle,
      endAngle,
      RADIUS - OUTER_BORDER_W / 2,
    );

    const fill = isSelected
      ? 'url(#centerCircle)'
      : index % 2 === 0
      ? 'url(#sliceGradint)'
      : '#7a54cd';

    const {x, y, angle} = calculateTextPosition(startAngle, endAngle, RADIUS);

    const onPress = useCallback(() => {
      if (spinning.value) {
        return;
      }

      selectOption(index);
    }, []);

    return (
      <React.Fragment>
        {/* Slice */}
        <Path
          d={path}
          fill={fill}
          onPressIn={onPress}
          x={OUTER_BORDER_W / 2}
          y={OUTER_BORDER_W / 2}
        />

        {/* Slice Value */}
        <Text
          x={x + 16}
          y={y + 4}
          fontSize={38}
          fill={Colors.WHITE}
          fontWeight={'700'}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontFamily={typography.bold}
          onPress={onPress}
          transform={`rotate(${angle}, ${x}, ${y})`}>
          {item}
        </Text>
      </React.Fragment>
    );
  },
);

Slice.displayName = 'Slice';

export default Slice;
