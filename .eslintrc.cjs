module.exports = {
  root: true,
  env: { browser: true, es2022: true, jest: true },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'react', 'react-refresh', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-void': ['error', { allowAsStatement: true }],
    "no-console": "error",
    'jsx-a11y/no-static-element-interactions': 'off',
    "react/jsx-props-no-spreading": ["off"],
    'jsx-a11y/click-events-have-key-events': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-absolute-path': 'off',
    'import/extensions': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-param-reassign': ['error', { props: false }],
    curly: ['error', 'all'],
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'off',
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'react/button-has-type': 'off',
    'react/require-default-props': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['', './public'],
          ['@', './src'],
        ],
        extensions: ['.js', '.tsx', '.ts', '.json'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  noInlineConfig: true,
};
