import { combineEpics } from 'redux-observable';

import {
  searchByGeneEpic,
  searchByProteinEpic
} from 'client/state/epics/search-epics';

export default combineEpics(
  searchByGeneEpic,
  searchByProteinEpic
);
