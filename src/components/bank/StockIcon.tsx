import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

import CommonGradient from './CommonGradient';

const StockIcon = () => {
  return (
    <Svg width={16} height={16} viewBox="6 6 52 52">
      <CommonGradient id={'icon'} />
      <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
        <Path
          fill={`url(#icon)`}
          d="M118 564 c-51 -27 -58 -56 -58 -244 0 -258 2 -260 255 -260 261 0 265 4 265 265 0 254 -2 255 -262 255 -133 -1 -179 -4 -200 -16z m350 -216 c-2 -48 -7 -63 -18 -63 -8 0 -17 12 -20 28 l-5 28 -45 -45 c-24 -26 -49 -46 -54 -46 -5 0 -20 10 -33 22 l-23 22 -33 -32 c-34 -33 -67 -42 -67 -19 0 7 22 35 50 62 l50 49 28 -27 28 -27 34 35 c30 31 32 35 13 35 -22 0 -47 23 -36 33 3 4 35 7 70 7 l64 0 -3 -62z"
        />
      </G>
    </Svg>
  );
};

export default StockIcon;
