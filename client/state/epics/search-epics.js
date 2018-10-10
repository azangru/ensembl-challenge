import { ofType } from 'redux-observable';
import { of, iif } from 'rxjs';
import { tap, switchMap, mergeMap, map, filter, catchError } from 'rxjs/operators';
import prop from 'ramda/src/prop';

import http from 'client/services/http';

import {
  findSequencesWithAminoAcid,
  hasAminoAcid3
} from 'client/helpers/sequence-helpers';
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
  filter(({ payload }) => payload.hasOwnProperty('sequenceId')),
  switchMap(isProteinSequenceValid),
  mergeMap(payload =>
    iif(
      () => payload.isValid,
      fetchDataByProteinId(payload.sequenceId).pipe(
        map(geneData => ({ payload, geneData }))
      ),
      of({ error: 'Amino acid not found' })
    )
  ),
  tap(result => console.log('result', result)),
  map((data) => ({ type: SEARCH_SUCCESS, payload: data })),
  catchError(error => of({ type: SEARCH_ERROR, error })) // FIXME error
);


function isProteinSequenceValid({ payload }) {
  return http.get(`/sequence/id/${payload.sequenceId}`).pipe(
    map(sequence => ({
      ...payload,
      isValid: hasAminoAcid3(sequence, payload.initialAminoAcid, payload.position)
    }))
  );
}

function fetchDataByProteinId(proteinId) {
  return http.get(`/lookup/id/${proteinId}`).pipe(
    mergeMap(protein =>
      // request transcript encoding the protein
      http.get(`/lookup/id/${protein.Parent}`).pipe(
        mergeMap(transcript =>
          // request the gent encoding the transcript
          http.get(`/lookup/id/${transcript.Parent}?expand=1`)
        )
      )
    )
  );
}

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
