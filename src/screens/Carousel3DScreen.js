import React from 'react';
import Carousel3D from '../components/Carousel3D';
import StatusBarManager from '../components/StatusBarManager';

const Carousel3DScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <Carousel3D />
    </>
  );
};

export default Carousel3DScreen;
