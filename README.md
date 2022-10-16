# A Simple Vite-based React/JS Polygon Calculator

## What is the use of this Repo

This project is a single-page web application which demonstrates the following:
1. Source Data from GeoJSON Objects in JSON File(s)
2. Generate a List of proposed solutions 
3. Generate an interactive work surface for a selected polygon Feature Collection (solution)
4. Provide Statistics on Selected Polygon(s) (Solutions)
5. Perform Actions on a Selected Feature Collection (Solution)
   1. Union
   2. Intersect
      1. If an intersection results in multiple polygons, they are all added to the Feature Collection.
      2. If an intersection results in no polygons, a friendly error message is displayed.

In addition to the above specs, this project also demonstrates the following technical aspects:
1. Vite based JSX React Application
2. Implementation of GeoJSON Viewer, [Leaflet 🇺🇦](https://leafletjs.com/) and [React-leaflet](https://react-leaflet.js.org/)
3. Deployment Pipeline using [Github Actions](https://github.com/bxe5056/ad-polygon/blob/main/.github/workflows/build_test_deploy_react.yml) (Zero-Cost)
4. A hosted (Zero-Cost) environment that can be viewed [here](https://bentheitguy.me/ad-polygon)
5. Basic ESLint Configuration
6. Basic CSS Stylelint Configuration

Features:
- You can select two polygons from the list and do the following operations on them: union and intersect. 
  - The resulting polygon(s) of the operation will replace the selected polygons. 
  - The app will keep the current state of the polygons until the page is reloaded. 
- You are able to switch between the proposed solutions. 
  - Edited polygons should remain in the same state they are left in when switching between solutions.
- You can view the area of a polygon by selecting it in the list. 
- When two polygons are selected, The total area of the selected polygons is displayed in the right panel.
	> :warning: The total area value is the value of each polygon summed together. It is not the same as the area of the Union of both polygons.
- When selecting a polygon, the coloring of the selected polygon is updated on the map.

## Live Application URL

### https://bentheitguy.me/ad-polygon
This URL points to the application deployed (for free) via Github Actions and GitHub Pages

## Prerequisites

### Install NodeJS
Refer to https://nodejs.org/en/ to install NodeJS 16 or higher

## Cloning and Running the Application on your local machine

### Clone the project on to your local machine

Open a terminal in the project folder and type the following command to install all necessary npm packages

If using NPM:
```bash
npm install
```
If using Yarn Package Manager:
```bash
yarn install
```

### In order to run the application, type the following command

If using NPM:
```bash
npm dev
```
If using Yarn Package Manager:
```bash
yarn dev
```

### A browser window should automatically open to the application. 
If it does not automatically open, the application should be running on [http://localhost:5173/ad-polygon/](http://127.0.0.1:5173/ad-polygon/)