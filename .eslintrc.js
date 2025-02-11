module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
};
