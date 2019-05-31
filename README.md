# Color

Color is a fullscreen color picker for the web, based on Vue.js and plain old Javascript. It lets you focus on the color you are picking rather than the color palette you are choosing from.

## 0.4.0 Changelog

- Updated dependencies to safe versions
- Added transitions to menu open/close

## 0.3.4 Changelog

- Added crosshairs showing location of color when in locked mode
- Tweaked position and size of lock icon

## Getting started

If you want to play around with the project on your own machine you can follow the instructions below to set up the dev environment in just a few minutes!

### Prerequisites

You will need a recent version of [Node.js](https://nodejs.org/en/) with [NPM](https://www.npmjs.com/) installed on your machine. Follow the installation instructions on the Node.js site if you don't already have this installed.

### Installing

Download the project files or clone the github archive onto your machine (see the [GitHub help page](https://help.github.com/articles/set-up-git/) for instructions on setting up git on your machine):

```bash
git clone https://github.com/piofinn/color-picker
```

Run `npm install` to install all dependencies, and you're good to go!

## Running the dev server

This project is set up with Webpack's dev server with live reloading on save. To start the dev server, type `npm start` in your terminal, and a new browser window will open with the app running. Whenever you save a file used by the project, the dev server will automatically reload to show the changes.

## Building for deployment

Whenever you're ready to deploy, all you have to do is to run the following command in your terminal

```bash
npm run build
```

An `index.html` file will be created, along with a script and map file, in the /dist folder of the project. Be aware that **any existing files in this folder will be deleted** during the build process.
