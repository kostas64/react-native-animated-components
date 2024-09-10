import {faker} from '@faker-js/faker';

export const BG_IMG =
  'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg';
export const SPACING = 20;
export const AVATAR_SIZE = 70;
export const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

faker.seed(10);

export const DATA = [...Array(500).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number({max: 1}) === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
    name: faker.name.firstName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
