module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "process": "readonly",
    "jest": "readonly",
    "test": "readonly",
    "expect": "readonly",
    "beforeEach": "readonly",
    "Buffer": "readonly",
    "io": "readonly",
    "Mustache": "readonly",
    "moment": "readonly",
    "Qs": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "semi": ["error", "always"],
  }
};