import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser' // Import the TypeScript parser
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for both JS and TS
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals like `process`, `__dirname`, etc.
      },
    },
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      '@typescript-eslint/no-require-imports': 'off', // Allow require in .cjs files
    },
  },

  // Apply CommonJS-specific rules for JS files
  {
    files: ['**/*.{cjs,js}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    }, // Set to CommonJS for .cjs files
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Allow require for .cjs files
      '@typescript-eslint/no-var-requires': 'off', // Allow require for.cjs files
    },
  },

  // Apply plugin configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, // Spread TypeScript configs

  // Add Prettier config at the end to ensure formatting rules apply last
  eslintPluginPrettierRecommended,

  // Ignore node_modules and other directories
  {
    ignores: ['node_modules', 'dist'],
  },
]
