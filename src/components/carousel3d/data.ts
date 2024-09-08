import {faker} from '@faker-js/faker';

import images from '@assets/carousel3d';
import {ICarouselDataType} from './types';

faker.seed(10);

export const DATA: ICarouselDataType[] = [...Array(images.length).keys()].map(
  (_, i) => {
    return {
      key: faker.datatype.uuid(),
      image: images[i],
      title: faker.commerce.productName(),
      subtitle: faker.company.bs(),
      price: faker.finance.amount(80, 200, 0),
    };
  },
);
