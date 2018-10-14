import { of, forkJoin } from 'rxjs';
import {
  mergeMap,
  map,
  catchError
} from 'rxjs/operators';
import prop from 'ramda/src/prop';

import http from 'client/services/http';

import { normalizeAminoAcidQuery } from 'client/helpers/amino-acid-helpers';
import {
  findSequencesWithAminoAcid,
  hasAminoAcid3
} from 'client/helpers/sequence-helpers';
import { getTranscriptsByProteinIds } from 'client/helpers/transcript-helpers';


export function fetchDataByGeneName(payload) {
  return http.get(`/lookup/symbol/homo_sapiens/${payload.gene}?expand=1`).pipe(
    mergeMap(gene =>
      http.get(`/sequence/id/${gene.id}?multiple_sequences=1;type=protein`).pipe(
        map(sequences => ({
          searchInput: payload,
          transcriptIds: getTranscriptIds({
            ...payload,
            gene,
            sequences
          })
        }))
      )
    ),
    catchError(error => of({ ...payload, error: error.response.error }))
  );
}

export function isProteinSequenceValid(payload) {
  return http.get(`/sequence/id/${payload.sequenceId}`).pipe(
    map(sequence => ({
      ...payload,
      isValid: hasAminoAcid3(sequence, payload.initialAminoAcid, payload.position)
    })),
    catchError(error => of({ isValid: false, error: error.response.error }))
  );
}

export function fetchDataByProteinId(payload) {
  const {
    sequenceId,
    initialAminoAcid,
    position
  } = payload;
  return http.get(`/lookup/id/${sequenceId}`).pipe(
    mergeMap(protein =>
      // request transcript encoding the protein
      http.get(`/lookup/id/${protein.Parent}`).pipe(
        mergeMap(transcript =>
          forkJoin(
            // request the expanded info about the gene encoding the transcript
            http.get(`/lookup/id/${transcript.Parent}?expand=1`),
            // request the protein sequences encoded by the gene
            http.get(`/sequence/id/${transcript.Parent}?multiple_sequences=1;type=protein`)
          )
        )
      )
    ),
    map(([geneData, proteinSequences]) => {
      return {
        searchInput: payload,
        transcriptIds: getTranscriptIds({
          aminoAcid: initialAminoAcid,
          aminoAcidPosition: position,
          gene: geneData,
          sequences: proteinSequences
        })
      };
    })
  );
}

function getTranscriptIds(data) {
  const {
    aminoAcid,
    aminoAcidPosition,
    gene,
    sequences
  } = data;

  const matchingSequenceIds = findSequencesWithAminoAcid(
    sequences,
    normalizeAminoAcidQuery(aminoAcid),
    aminoAcidPosition
  ).map(prop('id'));
  return getTranscriptsByProteinIds(gene, matchingSequenceIds).map(prop('id'));
}
