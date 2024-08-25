
/** @type {import('stylelint').Config} */
export const config = {
    'extends': 'stylelint-config-standard',
    'overrides': [
        {
            'files': [
                '**/*.css'
            ],
            'customSyntax': 'postcss'
        }
    ],
    'ignoreFiles': [
        '**/*.js'
    ],
    'rules': {
        'no-duplicate-selectors': true,
        'color-hex-length': 'long',
        'color-named': 'never',
        'selector-no-qualifying-type': [
            true, {
                'ignore': [
                    'attribute',
                    'class',
                    'id'
                ]
            }
        ],
        'selector-max-id': 1,
        'selector-attribute-quotes': 'always',
        'declaration-no-important': null,
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
        'function-url-quotes': 'always',
        'font-weight-notation': 'numeric',
        'font-family-name-quotes': 'always-where-recommended',
        'comment-whitespace-inside': 'always',
        'comment-empty-line-before': [
            'always', {
                'except': [
                    'first-nested'
                ]
            }
        ],
        'at-rule-no-vendor-prefix': true,
        'rule-empty-line-before': ['always', {
            'except': [
                'after-single-line-comment',
                'first-nested'
            ]
        }],
        'selector-pseudo-element-colon-notation': 'double',
        'selector-no-vendor-prefix': true,
        'media-feature-name-no-vendor-prefix': true,
        'media-feature-range-notation': 'prefix',
        'custom-property-empty-line-before': [
            'always', {
                'except': [
                    'after-custom-property',
                    'first-nested',
                    'after-comment'
                ],
                'ignore': [
                    'after-comment',
                    'inside-single-line-block'
                ]
            }
        ],
        'no-descending-specificity': null,
        'shorthand-property-no-redundant-values': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'color-function-notation': 'modern'
    }
};
