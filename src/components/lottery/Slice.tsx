import React from 'react';
import {Path, Text} from 'react-native-svg';

import {TListItem, TSlice} from './types';
import {typography} from '@utils/typography';
import {calculateTextPosition, createSlicePath} from './utils';
import {BORDER_WIDTH, OUTER_BORDER_W, RADIUS} from './constants';

const Slice = ({
  item,
  index,
  isSelected,
  total,
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

  return (
    <React.Fragment>
      {/* Slice */}
      <Path
        d={path}
        fill={fill}
        x={OUTER_BORDER_W / 2}
        y={OUTER_BORDER_W / 2}
        stroke="#fff"
        onPressIn={() => selectOption(index)}
        strokeWidth={BORDER_WIDTH}
      />

      {/* Slice Value */}
      <Text
        x={x}
        y={y + 2}
        fontSize={32}
        fill="#FFFFFF"
        fontWeight={'700'}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily={typography.bold}
        onPress={() => selectOption(index)}
        transform={`rotate(${angle}, ${x}, ${y})`}>
        {item}
      </Text>
    </React.Fragment>
  );
};

export default Slice;
