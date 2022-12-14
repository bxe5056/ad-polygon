module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [1, 4],
        "react/react-in-jsx-scope": [0],
        "no-unused-vars": [1],
        "object-curly-spacing": [1, 'always'],
        "react/prop-types": [0]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
