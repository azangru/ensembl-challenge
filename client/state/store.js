import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from 'client/state/epics';

import * as reducers from './reducers';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  ...reducers
});

export function configureStore() {

  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
