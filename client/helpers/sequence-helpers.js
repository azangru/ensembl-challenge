// @flow

import { toSingleLetterCode } from 'client/helpers/amino-acid-helpers';

import type { MultipleSequences, Sequence } from 'types/sequence-response';

// for computer scientists, indexes of letters in a string are base-0
export function queryAminoAcid(sequence: string, aminoAcid: string, position: number) {
  return sequence[position] === aminoAcid;
}

// for geneticists, amino acid positions start with 1
export function hasAminoAcid(sequence: Sequence, aminoAcid: string, position: number) {
  return queryAminoAcid(sequence.seq, aminoAcid, position - 1);
}

// same as hasAminoAcid, but uses the 3-letter amino acid nomenclature
export function hasAminoAcid3(sequence: Sequence, aminoAcid: string, position: number) {
  return queryAminoAcid(sequence.seq, toSingleLetterCode(aminoAcid), position - 1);
}

// for geneticists, amino acid positions start with 1
export function findSequencesWithAminoAcid(sequences: MultipleSequences, aminoAcid: string, position: number) {
  return sequences.filter(sequence => hasAminoAcid(sequence, aminoAcid, position));
}
