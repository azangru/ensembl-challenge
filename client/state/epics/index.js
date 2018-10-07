import { combineEpics } from 'redux-observable';

import {
  searchByGeneEpic
} from 'client/state/epics/search-epics';

export default combineEpics(
  searchByGeneEpic
);
