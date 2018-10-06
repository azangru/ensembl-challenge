import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { RouterProvider } from 'react-router5';
//
// import createRouter from 'client/routes/create-router';
import { configureStore } from 'client/state/store';

import App from 'client/app';

// const router = createRouter();
const store = configureStore();

function render(Root) {
  ReactDOM.render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('root')
  );
}

render(App);

// function render(Root) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <RouterProvider router={router}>
//         <Root/>
//       </RouterProvider>
//     </Provider>,
//     document.getElementById('root')
//   );
// }

// router.start(() => render(App));
