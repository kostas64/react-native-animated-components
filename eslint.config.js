const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const globals = require("globals");

// Additional plugins for custom rules
const reactNativePlugin = require("eslint-plugin-react-native");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const reactCompilerPlugin = require("eslint-plugin-react-compiler");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  // Expo's recommended configuration (includes React, React Native, TypeScript support)
  ...expoConfig,

  // Custom configuration for all TypeScript/JavaScript files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-native": reactNativePlugin,
      "unused-imports": unusedImportsPlugin,
      "react-compiler": reactCompilerPlugin,
    },
    rules: {
      // Import plugin rules (Expo already includes import plugin)
      "import/named": "off", // Turn off as it has issues with TypeScript types
      "import/namespace": "error",
      "import/export": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "warn",

      // Custom rules from the original .eslintrc.json
      "unused-imports/no-unused-imports": "error",
      "react-native/no-unused-styles": "error",
      "react-native/no-inline-styles": "error",
      // "react-native/no-color-literals": "error",
      // "react-native/no-raw-text": "error",
      "react-native/no-single-element-style-arrays": "error",
      "react-compiler/react-compiler": "error",

      // Adjust some rules for better TypeScript support
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Environment configuration for Node.js config files
  {
    files: ["babel.config.js", "app.config.ts", "app.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Test files configuration
  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/__mocks__/**/*.{js,jsx,ts,tsx}",
      "**/tests/**/*.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      globals: {
        jest: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".expo/**",
      "android/**",
      "ios/**",
      "build/**",
      "dist/**",
      ".expo-shared/**",
      "coverage/**",
      "**/*.config.js",
      "babel.config.js",
      "metro.config.js",
      "jest.config.js",
    ],
  },

  // LAST: disable formatting conflicts in ESLint
  prettierConfig,
]);
