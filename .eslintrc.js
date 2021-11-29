module.exports = {
  env: {
    browser: true, // Browser global variables like `window` etc.
    commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
    es6: true, // Enable all ECMAScript 6 features except for modules.
    jest: true, // Jest global variables like `it` etc.
    node: true, // Defines things like process.env when generating through node
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
    "plugin:sonarjs/recommended",
  ],
  parser: "babel-eslint", // Uses babel-eslint transforms.
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["sonarjs"],
  root: true, // For configuration cascading.
  rules: {
    "react/prop-types": "off",
    "sonarjs/cognitive-complexity": "warn",

    "sonarjs/no-duplicate-string": "warn",
    "jsx-a11y/click-events-have-key-events": 0,
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    "no-unused-vars": "warn"
  },
  settings: {
    react: {
      version: "detect", // Detect react version
    },
  },
}
