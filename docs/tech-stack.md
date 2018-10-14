# Tech Stack

## React
React was chosen because of how easy it makes it to update the DOM in response to changes in the application state. It also encourages breaking the application up into reusable components, which helps with keeping the code modular. Its most notable drawback is the bundle size (around 30 kB of minified gzipped JavaScript), but for an application such as this one it was not an important consideration.

## Redux
Although this is a very small application, I wanted to separate React as a presentation layer from the logic for fetching and transforming data. There are several state management libraries intended to keep the app state separate from React, of which Redux is one of the most popular.

### Redux-observable
Observables are a powerful abstraction for asynchronous programming and working with streams of events (and the changing input from a form is a good example of such a stream). Observables make it easy to cancel ongoing requests as soon as the user changes the input, which helps avoid race conditions when sending requests over the network. They are also easily composable and have numerous convenience functions for processing streams of data. Redux-observable is a Redux middleware making it possible to fire up observable streams (using an observable library such as rxjs) in response to particular actions. I have long meant to try observables in action, and this app is a perfect opportunity for doing so.

## Ramda
Ramda is a library of utility functions particularly well-suited for functional programming in JavaScript. Its particular strengths are composability of functions and immutability of data (compare, for instance the `merge` function in Ramda and in Lodash: Lodash’s implementation behaves like `Object.assign` and mutates the first object passed to it, while Ramda's implementation is pure and returns a copy of the object without mutating the original).

## Stylus
This was added for convenience purposes. Despite the advances in modern CSS, preprocessors are still easier to write in than vanilla CSS, and Stylus is the most unopinionated of all preprocessors, making semicolons and curly braces optional.

I considered using a CSS-in-JS option, such as styled components, instead of Stylus, but that would have meant adding about 12 kB of minfied gzipped JavaScript to the bundle size, and the benefit seemed minimal.

## Tooling

### Flow
One of the best practices in modern Frontend development is to use static typing as a first-line defense against bugs, a help during refactoring, and a documentation of data types. The two most common choices are Typescript and Flow, of which I chose Flow due to its familiarity.

### Jest
Jest combines functionality of a test runner (such as Mocha), assertion library (such as Chai) and a mocking library (such as Sinon), and has a convenient command-line interface which makes it possible to switch between individual test files in real time.

### Enzyme
A convenience library for testing React components.

### Eslint
Added in order to keep code style consistent and to get immediate feedback about syntax errors.

### Babel
Added to transpile React’s JSX templates into standard JavaScript, as well as to use the latest features of JavaScript including those convenient ones that have not yet made it into the language spec (such as the object spread operator or class properties).

### Webpack
Used to build assets, update their names for every production build, and add links to them in the html template. It also gzips the JavaScript bundle for production build, such that the final bundle size is around 50 kB.
