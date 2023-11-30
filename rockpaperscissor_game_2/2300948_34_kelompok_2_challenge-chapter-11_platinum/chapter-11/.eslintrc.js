module.exports = {
    settings: {
      react: {
        version: 'detect', // or specify your React version (e.g., '16.8.6')
      },
    },
    ignorePatterns: [
      // Ignore a specific file
      'jest.config.js',
      'next.config.js'
    ],
    env: {
      browser: true,
      es2021: true,
      jest: true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "overrides": [
      {
        env: {
          node: true
        },
        files: [
          ".eslintrc.{js,cjs}"
        ],
        parserOptions: {
          "sourceType": "script"
        }
      }
    ],
    parserOptions: {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    plugins: [
      "react"
    ],
    rules: {
      // Your ESLint rules can go here
    }
  };
  