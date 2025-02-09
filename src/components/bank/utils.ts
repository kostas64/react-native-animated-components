const STOCK_NAMES = [
  'AAPL',
  'GOOGL',
  'AMZN',
  'MSFT',
  'TSLA',
  'NFLX',
  'NVDA',
  'META',
  'IBM',
  'INTC',
  'AMD',
  'BABA',
  'ORCL',
  'ADBE',
  'PYPL',
  'CSCO',
  'PEP',
  'KO',
  'DIS',
  'V',
];

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
