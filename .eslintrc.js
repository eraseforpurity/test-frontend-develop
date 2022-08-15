module.exports = {
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    },
    {
      files: ['src/graphql/types/*.ts'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ],
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'react-app',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime'
  ],
  env: {
    browser: true
  },
  ignorePatterns: ['next-env.d.ts', 'index.css'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true
      }
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'import/no-unresolved': 'off',
    'react/function-component-definition': 'off',
    'import/extensions': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': 'off',
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true
      }
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'require-jsdoc': 'off',
    'import/prefer-default-export': 'off'
  },

  plugins: ['prettier', 'react', 'react-hooks']
};
