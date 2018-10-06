import { createStore, combineReducers } from 'redux';

import * as reducers from './reducers';

export function configureStore() {

  const rootReducer = combineReducers({
    ...reducers
  });

  // const middlewares = [
  //   thunk,
  //   router5Middleware(router)
  // ];

  return createStore(rootReducer);
}
