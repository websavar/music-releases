module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'jsx-a11y',
        'react',
    ],
    root: true,
    rules: {
        'jsx-a11y/label-has-for': ['error', { required: { every: ['id'] } }],
        'jsx-a11y/no-onchange': 0,
        'react/display-name': 'off',
        'react/prop-types': 'off',

        'eqeqeq': 'error',
        'no-console': 'off',
        'no-var': 'error',
        'prefer-const': 'error',
    },
};