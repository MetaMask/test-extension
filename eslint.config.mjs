import base, { createConfig } from '@metamask/eslint-config';
import browser from '@metamask/eslint-config-browser';
import nodejs from '@metamask/eslint-config-nodejs';
import typescript from '@metamask/eslint-config-typescript';

const config = createConfig([
  {
    ignores: ['dist/', '.yarn/'],
  },

  {
    extends: base,

    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'],
      },
    },

    settings: {
      'import-x/extensions': ['.js', '.mjs'],
    },
  },

  {
    files: ['src/**/*.ts'],
    extends: [typescript, browser],
    rules: {
      // Temporarily disable until the next config update is released,
      // which will loosen this rule.
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  {
    files: ['*.ts'],
    extends: [typescript],
    rules: {
      // Temporarily disable until the next config update is released,
      // which will loosen this rule.
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  {
    files: ['**/*.js', '**/*.cjs', '*.config.ts'],
    extends: nodejs,

    languageOptions: {
      sourceType: 'script',
    },
  },
]);

export default config;
