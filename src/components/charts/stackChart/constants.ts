import {WIDTH} from '@utils/device';

export const DATA = [
  {
    quarter: 1,
    payroll: 12000,
    operations: 8500,
    electricity: 3500,
    travel: 4500,
  },
  {
    quarter: 2,
    payroll: 10000,
    operations: 7500,
    electricity: 2250,
    travel: 1500,
  },
  {
    quarter: 3,
    payroll: 20000,
    operations: 10000,
    electricity: 2600,
    travel: 5000,
  },
  {
    quarter: 4,
    payroll: 5000,
    operations: 1000,
    electricity: 3000,
    travel: 9500,
  },
];

export const maxQuarter = Math.max(
  ...DATA.map(
    item => item.electricity + item.operations + item.payroll + item.travel,
  ),
);

export const colors = {
  payroll: '#5a723d',
  operations: '#708849',
  electricity: '#8f9a6b',
  travel: '#a1ac8d',
};

export const EXPENSES_TYPES = [
  'Payroll',
  'Operations',
  'Electricity',
  'Travel',
];

export const barHeight = Math.round(WIDTH / 2.5 / DATA.length);
export const chartWidth = WIDTH - 96;
export const chartHeight = 240;

export const tooltipInitState = {
  x: null,
  y: null,
  quarter: 0,
  electricity: 0,
  operations: 0,
  payroll: 0,
  travel: 0,
};
