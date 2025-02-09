import {STOCK_NAMES} from './data';

export const generateStockData = () => {
  const stocks: any = [];

  STOCK_NAMES.forEach(name => {
    const values = [];

    for (let i = 0; i < 24; i++) {
      values.push(parseFloat((Math.random() * 1000 + 50).toFixed(2)));
    }

    stocks.push({name, values});
  });

  return stocks;
};
