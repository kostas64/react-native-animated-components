import React from 'react';
import ScrollItemList from '../components/ScrollItemList';
import StatusBarManager from '../components/StatusBarManager';

const ScrollItemListScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <ScrollItemList />
    </>
  );
};

export default ScrollItemListScreen;
