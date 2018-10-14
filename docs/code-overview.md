# Code overview

## Project folder structure
The `client` folder contains the app code.

The `test` folder contains setup files for the testing framework, and fixtures used in tests (sample responses from several Ensembl REST endpoints). Test files themselves are co-located with the modules they are testing, have a name ending in `.spec.js` and are put in dedicated `test` folders.

The `types` folder contains type definitions for certain data types used throughout the app.

## React conventions
As is a common convention, React components are divided into "smart components" (called here "containers") and "dumb components" (called here "components"). A "container" is a React component that is connected to Redux. A "component" is not connected directly to the global state and either receives its data from parent components or keeps it in the local state.

In this project, each "component" is put in its own folder, together with a style file responsible for its appearance.

## Styling conventions
CSS classes are named according to the block-element-modifier (BEM) convention, where the root node rendered by a component is considered a "block", all its child nodes defined in the component are its "elements", and various states in which the block or the element may be and that are relevant for styling are "modifiers". The element separator is a double underscore, and the modifier separator is a single underscore, which produces class names such as `search-fields__navigation-item_active` (where the hyphen is used to join words within a "block", an "element", or a "modifier").

Such a convention helps to avoid CSS class name collisions and to easily identify individual React components by looking at the HTML output.

## Redux state
The code responsible for keeping the global state of the app is kept in the `client/state` folder. The only significant difference from many react-redux-based apps is that asynchronous side effects are here managed using `rxjs`, which is connected to redux with the help of the `redux-observable` library. Redux-observable is a redux middleware that in response to specified actions runs the so-called `epics`, i.e. pieces of asynchronous code built upon the Observable primitive (e.g. imported from `rxjs`). This makes it possible to separate redux actions, which now become simple objects carrying messages, from the asynchronous side effects (such as network requests) that need to be performed as a response to such a message. Rxjs also provides numerous operators for orchestration of asynchronous code and for making user interactions cancellable, retryable, etc.

## UI/UX decisions
Being not a designer, I tried to make as few UI-related decisions as possible, and the interface of the app is very minimalistic. Still, here are some of the conscious design decisions that I made:

- The form should not have a "Submit" (or functionally similar) button; the request should be submitted as soon as the data are ready (because Task 2 specifically mentions the absence of a "Submit" button as a requirement, and I did not want the interface for Task 1 to feel different from the interface for Task 2)

- If the user updates their query and the previous request is still ongoing, it should automatically be canceled

- The interface for Task 1 and the interface for Task 2 are separated from one another by navigation menu (because otherwise what result should a user see if they enter one query in fields from Task 1 and another query into the field from Task 2? this may get confusing very quickly). Search results are cleared when switching between the two interfaces. Search results are also cleared when the query is updated.

- Search results will contain a message repeating the search query to the user.

- Since it is possible to enter syntactically invalid queries in the search field from Task 2, it will, upon blur, show an error message to the user if the string is incorrect.

## Testing
I have added unit tests for modules that deal with data fetching and processing (see the [client/helpers](../client/helpers) and [client/services](../client/services) folders). Of React components, I have added tests only for the ones with the most logic (see [client/components/search-fields]('../client/components/search-fields')).

I have manually tested the app in a recent version of Chrome (v.69) and Firefox (v.62).
