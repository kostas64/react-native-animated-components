export const width = 300;
export const height = 180;
export const centerX = width / 2;
export const centerY = height / 2;
export const borderRadius = 36;
export const gapSize = 1;

export const data = [
  {value: 25, color: '#5a723d', label: 'React Native'},
  {value: 15, color: '#a1ac8d', label: 'Flutter'},
  {value: 10, color: '#ccd1bc', label: 'Xamarin'},
];
export const total = data.reduce((sum, item) => sum + item.value, 0);
