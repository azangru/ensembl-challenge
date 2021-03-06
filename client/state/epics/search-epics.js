import { ofType } from 'redux-observable';
import { of, iif, timer } from 'rxjs';
import {
  debounce,
  switchMap,
  mergeMap,
  map,
  filter,
  takeUntil,
  repeat
} from 'rxjs/operators';

import * as api from 'client/services/api';

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SEARCH_CANCEL
} from 'client/state/constants/search-constants';

export const searchByGeneEpic = action$ => action$.pipe(
  ofType(SEARCH_START),
  filter(({ meta }) => meta.searchBy === 'gene'),
  debounce(() => timer(500)),
  switchMap(action => api.fetchDataByGeneName(action.payload)),
  map(result => {
    if (result.error) {
      return {
        type: SEARCH_ERROR,
        payload: { searchInput: result.searchInput },
        error: result.error,
        meta: { searchBy: 'gene' }
      };
    } else {
      return {
        type: SEARCH_SUCCESS,
        payload: result,
        meta: { searchBy: 'gene' }
      };
    }
  }),
  takeUntil(action$.pipe(
    ofType(SEARCH_CANCEL)
  )),
  repeat()
);

export const searchByProteinEpic = action$ => action$.pipe(
  ofType(SEARCH_START),
  filter(({ meta }) => meta.searchBy === 'protein'),
  debounce(() => timer(500)),
  switchMap(action => api.isProteinSequenceValid(action.payload)),
  mergeMap(payload =>
    iif(
      () => payload.isValid,
      api.fetchDataByProteinId(payload).pipe(
        takeUntil(action$.pipe(
          ofType(SEARCH_CANCEL)
        ))
      ),
      of({ error: payload.error || `${payload.initialAminoAcid} was not found at position ${payload.position} of ${payload.sequenceId}` })
    )
  ),
  map(result => {
    if (result.error) {
      return {
        type: SEARCH_ERROR,
        payload: { searchInput: result.searchInput },
        error: result.error,
        meta: { searchBy: 'protein' }
      };
    } else {
      return {
        type: SEARCH_SUCCESS,
        payload: result,
        meta: { searchBy: 'protein' }
      };
    }
  }),
  takeUntil(action$.pipe(
    ofType(SEARCH_CANCEL)
  )),
  repeat()
);
