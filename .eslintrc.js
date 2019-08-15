module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    codeFrame: false
  },
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    // 'brace-style': [
    //   'error',
    //   'stroustrup'
    // ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'import/extensions': ['off', 'never'],
    'import/newline-after-import': 'off',
    'indent': 'off',
    'no-use-before-define': [
      'error',
      'nofunc'
    ],
    'quotes': ['error', 'single'],
    'semi': 'off'
  }
}