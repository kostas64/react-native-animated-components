import {TDataItem} from './types';

export const generateValueLabels = (data: TDataItem[]) => {
  const maxStackValue = data.reduce((max, item) => {
    const total = Object.keys(item).reduce((sum, key) => {
      if (key !== 'quarter') sum += item[key as keyof TDataItem];
      return sum;
    }, 0);
    return Math.max(max, total);
  }, 0);

  const interval = Math.pow(10, Math.floor(Math.log10(maxStackValue)));
  const maxYValue = Math.ceil(maxStackValue / interval) * interval;
  const formatter = new Intl.NumberFormat('de-DE');

  const labels = ['0'];
  for (let i = interval; i <= maxYValue; i += interval) {
    labels.push(formatter.format(i));
  }
  return labels;
};
