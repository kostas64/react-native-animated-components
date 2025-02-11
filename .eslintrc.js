module.exports = {
  root: true,
  plugins: ['unused-imports'],
  extends: [
    '@react-native-community',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-color-literals': 2,
  },
};
