import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { tap, switchMap, mergeMap, map, filter, catchError } from 'rxjs/operators';
import prop from 'ramda/src/prop';

import http from 'client/services/http';

import { findSequencesWithAminoAcid } from 'client/helpers/sequence-helpers';
import { getTranscriptsByProteinIds } from 'client/helpers/transcript-helpers';

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from 'client/state/constants/search-constants';

export const searchByGeneEpic = action$ => action$.pipe(
  ofType(SEARCH_START),
  filter(({ payload }) => payload.hasOwnProperty('gene')),
  switchMap(({ payload }) =>
    http.get(`/lookup/symbol/homo_sapiens/${payload.gene}?expand=1`).pipe(
      mergeMap(gene =>
        http.get(`/sequence/id/${gene.id}?multiple_sequences=1;type=protein`).pipe(
          map(sequences => ({
            aminoAcid: payload.aminoAcid,
            aminoAcidPosition: payload.aminoAcidPosition,
            gene,
            sequences
          }))
        )
      )
    )
  ),
  map((data) => ({ type: SEARCH_SUCCESS, payload: processDataRetrievedByGene(data) })),
  catchError(error => of({ type: SEARCH_ERROR, error })) // FIXME error
);

export const searchByProteinEpic = action$ => action$.pipe(
  ofType(SEARCH_START),
  tap(action => console.log('action', action)),
  filter(({ payload }) => payload.hasOwnProperty('sequenceId')),
  switchMap(({ payload }) =>
    // FIXME: check if valid by requesting the protein sequence

    // request the protein
    http.get(`/lookup/id/${payload.sequenceId}`).pipe(
      tap(result => console.log('should check validity', result)),
      mergeMap(protein =>
        // request protein transcript
        http.get(`/lookup/id/${protein.Parent}`).pipe(
          mergeMap(transcript =>
            http.get(`/lookup/id/${transcript.Parent}`).pipe(
              mergeMap(gene =>
                http.get(`/lookup/id/${gene.id}?expand=1`).pipe(
                  map(geneData => ({ payload, geneData }))
                )
              )
            )
          )
        )
      )
    )
  ),
  tap(result => console.log('result', result)),
  map((data) => ({ type: SEARCH_SUCCESS, payload: data })),
  catchError(error => of({ type: SEARCH_ERROR, error })) // FIXME error
);


function processDataRetrievedByGene(data) {
  const {
    aminoAcid,
    aminoAcidPosition,
    gene,
    sequences
  } = data;
  const matchingSequenceIds = findSequencesWithAminoAcid(sequences, aminoAcid, aminoAcidPosition)
    .map(prop('id'));
  return getTranscriptsByProteinIds(gene, matchingSequenceIds).map(prop('id'));
}
