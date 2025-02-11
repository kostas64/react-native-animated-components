import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

import CommonGradient from './CommonGradient';

const Email = () => {
  return (
    <Svg width={16} height={16} viewBox="0 10 64 45">
      <CommonGradient id={'email'} />
      <G
        transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none">
        <Path
          fill={'url(#email)'}
          d="M178 398 l142 -143 142 143 143 142 -285 0 -285 0 143 -142z"
        />
        <Path
          fill={'url(#email)'}
          d="M0 320 l0 -195 97 98 98 97 -98 97 -97 98 0 -195z"
        />
        <Path
          fill={'url(#email)'}
          d="M540 415 l-95 -95 98 -98 97 -97 0 193 c0 105 -1 192 -3 192 -1 0 -45 -43 -97 -95z"
        />
        <Path
          fill={'url(#email)'}
          d="M131 196 c-73 -73 -89 -95 -76 -100 22 -8 508 -8 530 0 13 5 -3 27 -76 100 l-93 94 -33 -32 c-22 -21 -42 -31 -63 -31 -21 0 -41 10 -63 31 l-33 32 -93 -94z"
        />
      </G>
    </Svg>
  );
};

export default Email;
