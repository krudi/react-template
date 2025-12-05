/** @type {import('stylelint').Config} */
export default {
    extends: ['@krudi/stylelint-config/base'],
    ignoreFiles: [
        '**/*.js',
        '**/*.ts',
        'public/**/*.css',
        'node_modules/**/*.css',
    ],
};
