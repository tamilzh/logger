module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  },
  plugins: [
    "mocha",
    "chai-friendly"
  ]
};
