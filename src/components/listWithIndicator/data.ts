import React from 'react';

import images from '@assets/indiList';

export const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i as keyof typeof images],
  ref: React.createRef(),
}));
