import images from '@assets/parallaxList';

export const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
}));
