// @flow

import type { MultipleSequences, Sequence } from 'types/sequence-response';

// for computer scientists, indexes of letters in a string are base-0
export function queryAminoAcid(sequence: string, aminoAcid: string, position: number) {
  return sequence[position] === aminoAcid;
}

// for geneticists, amino acid positions start with 1
export function hasAminoAcid(sequence: Sequence, aminoAcid: string, position: number) {
  return queryAminoAcid(sequence.seq, aminoAcid, position - 1);
}

// for geneticists, amino acid positions start with 1
export function findSequencesWithAminoAcid(sequences: MultipleSequences, aminoAcid: string, position: number) {
  return sequences.filter(sequence => hasAminoAcid(sequence, aminoAcid, position));
}
