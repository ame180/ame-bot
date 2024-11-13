import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			}
		},
		rules: {
			'object-curly-spacing': ['error', 'always'],
			'quotes': ['error', 'single', { 'avoidEscape': true }],
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
			'@typescript-eslint/no-explicit-any': 'warn' // TODO: Change to error when a fix is set up
		}
	},
	{
		ignores: [
			'node_modules/',
			'dist/',
			'eslint.config.mjs'
		],
	}
);