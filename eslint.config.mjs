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
			'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
			'space-infix-ops': 'error',
			'space-in-parens': ['error', 'never'],
			'quotes': ['error', 'single', { 'avoidEscape': true }],
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
			'@typescript-eslint/no-explicit-any': 'warn', // TODO: Change to error when a fix is set up
			'@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
			'indent': ['error', 4, { 'SwitchCase': 1 }],
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: '*', next: 'break' },
				{ blankLine: 'always', prev: '*', next: 'continue' },
				{ blankLine: 'always', prev: '*', next: 'throw' }
			]
		}
	},
		{
				ignores: [
					'node_modules/',
					'dist/',
					'eslint.config.mjs',
					'jest.config.cjs'
				],
		},
);