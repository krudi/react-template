import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typeScriptConfig = [
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parser: tseslint.parser,
        },
    },
    {
        files: ['**/*.{js,cjs,mjs}'],
        ...tseslint.configs.disableTypeChecked,
    },
];

const nextConfig = {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    plugins: {
        '@next/next': nextPlugin,
    },
    rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
    },
};

export default tseslint.config(
    {
        ignores: [
            'dist',
            'dev-dist',
            'public',
            'node_modules',
            '.next',
        ],
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        plugins: {
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            '@next/next': nextPlugin,
        },
    },
    {
        files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,mts}'],
        plugins: {
            'simple-import-sort': importSortPlugin,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'quotes': [
                'error',
                'single'
            ],
            'quote-props': [
                'error',
                'consistent'
            ],
            'import/prefer-default-export': 'off',
            'import/no-anonymous-default-export': 'off'
        }
    },
    eslint.configs.recommended,
    ...typeScriptConfig,
    nextConfig,
    prettierConfig
);
