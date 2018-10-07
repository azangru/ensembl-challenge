import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { tap, switchMap, mergeMap, map, catchError } from 'rxjs/operators';

import http from 'client/services/http';

import {
  SEARCH_START
} from 'client/state/constants/search-constants';

export const searchByGeneEpic = action$ => action$.pipe(
  ofType(SEARCH_START),
  tap(action => console.log('action', action)),
  switchMap(({ payload }) =>
    http.get(`/lookup/symbol/homo_sapiens/${payload.gene}?expand=1`).pipe(
      mergeMap(gene =>
        http.get(`/sequence/id/${gene.id}?multiple_sequences=1;type=protein`).pipe(
          map(sequences => ({ gene, sequences }))
        )
      )
    )
  ),
  tap(result => console.log('i am here', result)),
  catchError(error => of({ type: 'ERROR', error })) // FIXME error
);
