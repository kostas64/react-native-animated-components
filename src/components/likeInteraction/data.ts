import {faker} from '@faker-js/faker';

//Initiallize fake lib with seed + Data
faker.seed(2);

export const FACE =
  'https://img.freepik.com/premium-photo/man-with-fake-face-black-background_905510-3607.jpg';

export const DATA = [...Array(4).keys()].map(_ => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number({max: 1}) === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
  };
});

export const DATA_TO_ADD = [...Array(1).keys()].map(_ => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number({max: 1}) === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
  };
});
