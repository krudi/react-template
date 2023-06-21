# react-template

A template with [Next.js](https://nextjs.org) built on [React](https://reactjs.org) with focus on performance and best practices.

## Quick start

> **Note**
> You need [Node.js](https://github.com/nodejs) on your computer before running [Node.js](https://github.com/nodejs) on your computer before running

1. First clone this repository and navigate into your project directory
2. `copy .env-example .env` - copy the **.env** file
3. Install the dependencies: `npm run install`
4. Run the development server: `npm run dev`

## Starting development mode

To launch the project in development mode with hot module replacement

- `npm run dev`: to compile the [React](https://reactjs.org) application and serve it to the
  browser

_You can view the development server at <http://localhost:3000>_

## Starting production mode

Build and optimize your application with [Vite](https://github.com/vitejs/vite) for production

- `npm run build`: build for production with minification

## Exporting [React](https://reactjs.org) project

Build the application, generate every route as a HTML file and statically export to directory

- `npm run export`: to generate static project files

## Starting the project

Start the production server (after running `npm run build`)

- `npm run start`: starts a web-server with a preview of your project

## Commands for linting/fixing files

Navigate into your project directory and start linting your files

- `npm run lint:jsx`: lints [React](https://reactjs.org/docs/introducing-jsx.html) files
- `npm run lint:js`: lints [JavaScript](https://www.javascript.com) files
  - `npm run lint:js:fix`: to eliminate all possible errors
- `npm run lint:css`: lints [Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS) files
  - `npm run lint:css:fix`: to eliminate all possible errors
- `npm run lint:files`: lints configuration files with [Prettier](https://github.com/prettier/prettier)
  - `npm run lint:files:fix`: to eliminate all possible errors
- `npm run lint:markdown`: - lints markdown files with [markdownlint-cli](https://www.npmjs.com/package/markdownlint-cli)
  - `npm run lint:markdown`: to eliminate all possible errors
- `npm run lint:full` - to run all lints commands above
- `npm run lint:full:fix` - to run all lints all commands above and fix those automatically

## Testing with [Cypress](https://cypress.io)

[Cypress](https://cypress.io) is a front end testing tool for web applications. To use it, please follow the steps below.

- `npm run cy:open`: to open [Cypress](https://cypress.io) UI
- `npm run cy:run`: to run the [Cypress](https://cypress.io) server
- `npm run cy:e2e`: to run UI tests
- `npm run cy:e2e:headless`: to run UI tests, using [start-server-and-test](https://github.com/bahmutov/start-server-and-test)
- `npm run cy:component`: to run component tests
- `npm run cy:component:headless`: to run component tests, using [start-server-and-test](https://github.com/bahmutov/start-server-and-test)

## Testing with [Jest](https://jestjs.io)

[Jest](https://jestjs.io) is a testing framework that provides an easy-to-use and comprehensive testing solution for [JavaScript](https://www.javascript.com) codebases.

## What's more?

- [SASS](https://sass-lang.com)

## Additional information

- `npx npm-check-updates` - to check if some [npm](https://www.npmjs.com) packages are needed
- `npx npm-check-updates -u` - to upgrade all [npm](https://www.npmjs.com) packages
