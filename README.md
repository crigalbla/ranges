# Ranges Project
Aplication created with React about 2 ranges.

# Project created with webpack

This project was created with [Webpack](https://webpack.js.org/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Run the app.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\

The build is minified.\
Your app is ready to be deployed!

### `npm run lint`

The eslint that the project has configured will be executed and it will fix the warnings that are possible.

## Project Clarifications

### General information

The project show 2 views where we see a Range component.  
It has been used React 17.0.2, Hooks and Functionals components. Other important libraries:

Dependencies:  
"bootstrap": "^5.0.2" => For quick styles.  
"react-bootstrap": "^1.6.1" => To have components created and styled.  
"react-router-dom": "^5.2.0" => To manage the routers.
"react-draggable": "^4.4.3" => To drag the bullets/balls.

Dev dependencies:  
"webpack": "^5.43.0"  
"webpack-cli": "^4.7.2"  
"webpack-dev-server": "^3.11.2"  
"eslint": "^7.29.0"  
"prettier": "2.3.0"  

### Structure

The project is structured with views and components. The views are the pages that we see and these use the components if is necessary.  
The request are called from fetch of javaScript.  
React-router-dom was use to router the web located in index.jsx.  
The project DOES NOT HAVE a file .env.  

### Views

The project only has 2 views, exercise1 and exercise1.

### Components

The project has a unique components, Range: To select a range of number.  
There are no tests.  

### Exercise1

- The user can drag two bullets through the range line.  
- The user can click on both currency number label values (min or max) and set a 
new value.  
- If the value are not in the range values, the input will be set en red and the value will not set in the range.  
- The value will never be less than min or greater than max input values.  
- When some bullet is on hover or dragging, this bullet will get bigger and the cursor will be draggable type.  
- The width of the range component can be set if we want.  
- The range values can be that we want(positive values), some examples:  
    `{ min: 1, max: 100 }  
    { min: 15, max: 75 }  
    { min: 0, max: 300 }  
    { min: 500, max: 80000 }  `
    

### Exercise2

- The range is the same that exercise1 but with two changes.  
- The user CAN NOT set on both currency number label values (min or max).  
- The range values now are a array with the values that we want(positive values), examples:  
    `[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]  
    [1.99, 5.99, 10.99, 30.99, 50.99, 70.99, 80, 91.15, 100.33]  
    [0.95, 10.99, 15, 25.11, 31.67]  `
