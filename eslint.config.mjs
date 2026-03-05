import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...nextVitals,
  {
    rules: {
      ...prettierConfig.rules,
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
    },
  },
];
