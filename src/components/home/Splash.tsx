import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {SplashProps} from './types';
import {getAnimatedStyles} from './animatedStyles';

const Splash = ({splashProgress}: SplashProps) => {
  const {imageStyle, containerAnimStyle} = getAnimatedStyles(splashProgress);

  return (
    <Animated.View style={[containerAnimStyle, styles.bootsplashContainer]}>
      <Animated.Image
        source={require('../../assets/img/appIcon.png')}
        style={imageStyle}
      />
    </Animated.View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  bootsplashContainer: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 1000000,
  },
});
