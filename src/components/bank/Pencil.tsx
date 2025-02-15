import {G, Path, Svg} from 'react-native-svg';

import CommonGradient from './CommonGradient';

const Pencil = () => {
  return (
    <Svg width={16} height={16} viewBox="0.52 0 127.47 127.48">
      <CommonGradient id={'pencil'} />
      <G
        transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
        stroke="none">
        <Path
          fill={'url(#pencil)'}
          d="M1005 1266 c-16 -8 -54 -38 -82 -68 l-53 -53 138 -138 137 -137 57 57 c86 88 98 138 50 214 -50 78 -136 140 -194 139 -13 -1 -36 -7 -53 -14z"
        />
        <Path
          fill={'url(#pencil)'}
          d="M433 708 l-352 -353 -42 -168 c-30 -120 -39 -171 -31 -179 8 -8 59 1 180 31 l169 43 354 354 354 354 -135 135 c-74 74 -137 135 -140 135 -3 0 -163 -159 -357 -352z"
        />
      </G>
    </Svg>
  );
};

export default Pencil;
