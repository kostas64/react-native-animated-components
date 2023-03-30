import React from 'react';
import ParallaxList from '../components/ParallaxList';
import StatusBarManager from '../components/StatusBarManager';

const ParallaxScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <ParallaxList />
    </>
  );
};

export default ParallaxScreen;
