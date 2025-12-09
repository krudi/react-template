# react-template

A template with [Next.js](https://nextjs.org) built on [React](https://reactjs.org) with focus on performance and best
practices.

## Quick start

> [!NOTE]
>
> You need to have [Node.js](https://github.com/nodejs) installed on your computer before running this project.

1. First clone this repository and navigate into your project directory
2. `copy .env-example .env` - copy the **.env** file
3. Install the dependencies: `npm run install`
4. Run the development server: `npm run dev`

## Starting development mode

To launch the project in development mode with hot module replacement.

- `npm run dev`: to compile the [React](https://reactjs.org) application and serve it to the browser
- `npm run dev:turbo`: to compile faster in local development

_You can view the development server at <http://localhost:3000>_

## Starting production mode

Build and optimize your application with [Vite](https://github.com/vitejs/vite) for production.

- `npm run build`: build for production with minification

## Exporting [React](https://reactjs.org) project

Build the application, generate every route as a HTML file and statically export to directory.

- `npm run export`: to generate static project files

## Starting the project

Start the production server (after running `npm run build`).

- `npm run start`: starts a web-server with a preview of your project

## Commands for linting/fixing files

Navigate into your project directory and start linting your files.

- `npm run lint:eslint`: lints [JavaScript](https://www.javascript.com) files
    - `npm run lint:eslint:fix`: to eliminate all possible errors
- `npm run lint:stylelint`: lints [Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS) files
    - `npm run lint:stylelint:fix`: to eliminate all possible errors
