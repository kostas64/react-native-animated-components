import {G, Path, Svg} from 'react-native-svg';

import CommonGradient from './CommonGradient';

const WalletIcon = () => {
  return (
    <Svg width={16} height={16} viewBox="5 10 50.5 44">
      <CommonGradient id={'icon'} />
      <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
        <Path
          fill={`url(#icon)`}
          d="M120 522 c-56 -28 -70 -68 -70 -202 0 -196 27 -220 243 -220 150 0 194 10 220 52 9 12 17 34 19 48 3 22 -1 25 -37 30 -57 9 -82 25 -95 64 -9 28 -8 40 5 65 19 37 43 51 89 51 45 0 51 12 29 58 -30 61 -65 72 -228 72 -113 0 -147 -3 -175 -18z m228 -124 c3 -16 -6 -18 -92 -18 -73 0 -96 3 -96 13 0 25 13 28 99 25 72 -3 86 -6 89 -20z"
        />
        <Path
          fill={`url(#icon)`}
          d="M447 352 c-38 -42 -4 -85 64 -80 l44 3 0 45 0 45 -46 3 c-34 2 -49 -2 -62 -16z"
        />
      </G>
    </Svg>
  );
};

export default WalletIcon;
