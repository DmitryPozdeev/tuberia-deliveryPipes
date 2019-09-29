module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:vue/essential',
    'airbnb',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'plugins': [
    'vue',
  ],
  'rules': {
    "no-console": "off",
    "linebreak-style": 0,
    "indent": ["error", 4]
  },
};
