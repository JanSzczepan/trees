module.exports = {
   env: {
      browser: true,
      es2021: true,
      jest: true,
   },
   extends: [
      'react-app',
      'react-app/jest',
      'airbnb',
      'airbnb-typescript',
      'plugin:import/typescript',
      'plugin:testing-library/react',
      'plugin:jest-dom/recommended',
      'plugin:prettier/recommended',
   ],
   overrides: [],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 'latest',
      project: './tsconfig.eslint.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
   },
   plugins: [
      'react',
      '@typescript-eslint',
      'testing-library',
      'jest-dom',
      'prettier',
   ],
   rules: {
      'react/jsx-uses-react': ['off'],
      'react/react-in-jsx-scope': ['off'],
      'react/jsx-props-no-spreading': ['off'],
      'no-shadow': ['off'],
   },
}
