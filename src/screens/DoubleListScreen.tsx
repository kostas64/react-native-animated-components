import React from 'react';
import DoubleList from '../components/DoubleList';
import StatusBarManager from '../components/StatusBarManager';

const DoubleListScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="light" />
      <DoubleList />
    </>
  );
};

export default DoubleListScreen;
