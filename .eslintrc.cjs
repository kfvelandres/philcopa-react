module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: {
    react: { version: '18.2' },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react-refresh', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 0,
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'import/no-unresolved': 0,
    'no-new': 0,
    'no-alert': 0,
    'no-shadow': 0,
    'no-console': 0,
    'react/jsx-key': 1,
    'import/no-cycle': 0,
    'arrow-body-style': 0,
    'react/prop-types': 1,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'default-param-last': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-extra-boolean-cast': 1,
    'react/button-has-type': 1,
    'no-restricted-exports': 0,
    'react/no-children-prop': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/no-unused-prop-types': 1,
    'react-hooks/rules-of-hooks': 2,
    'no-promise-executor-return': 0,
    'no-unsafe-optional-chaining': 0,
    'react/require-default-props': 0,
    'react/no-unescaped-entities': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-duplicate-props': 0,
    'react/jsx-no-useless-fragment': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/destructuring-assignment': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-unstable-nested-components': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-constructed-context-values': 0,
  },
}