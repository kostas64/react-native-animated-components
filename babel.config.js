module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
