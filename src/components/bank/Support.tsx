import {G, Path, Svg} from 'react-native-svg';

import CommonGradient from './CommonGradient';

const Call = () => {
  return (
    <Svg width={16} height={16} viewBox="0.1 0 63.9 64.01">
      <CommonGradient id={'call'} />
      <G
        transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
        stroke="none">
        <Path
          fill={'url(#call)'}
          d="M17 622 c-21 -23 -21 -65 -2 -157 46 -220 230 -404 450 -450 152 -32 175 -19 175 97 0 83 -14 108 -63 108 -14 0 -48 5 -76 12 -50 11 -53 11 -97 -20 -24 -18 -50 -32 -57 -32 -37 1 -167 132 -167 169 0 6 14 31 32 55 31 44 31 47 20 97 -7 28 -12 63 -12 78 0 46 -27 61 -112 61 -60 0 -78 -4 -91 -18z"
        />
      </G>
    </Svg>
  );
};

export default Call;
