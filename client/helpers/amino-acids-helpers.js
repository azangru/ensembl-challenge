// @flow

import values from 'ramda/src/values';
import invertObj from 'ramda/src/values';

// map between single-letter and 3-letter amino acid codes
const aminoAcidDictionary = {
  A: 'Ala', // Alanine
  C: 'Cys', // Cysteine
  D: 'Asp', // Aspartic acid
  E: 'Glu', // Glutamic acid
  F: 'Phe', // Phenylalanine
  G: 'Gly', // Glycine
  H: 'His', // Histidine
  I: 'Ile', // Isoleucine
  K: 'Lys', // Lysine
  L: 'Leu', // Leucine
  M: 'Met', // Methionine
  N: 'Asn', // Asparagine
  P: 'Pro', // Proline
  Q: 'Gln', // Glutamine
  R: 'Arg', // Arginine
  S: 'Ser', // Serine
  T: 'Thr', // Threonine
  V: 'Val', // Valine
  W: 'Trp', // Tryptophan
  Y: 'Tyr' // Tyrosine
};

// invert the amino acid dictionary to create the three-letter to single-letter map
const reverseAminoAcidDictionary = invertObj(aminoAcidDictionary);

const singleLetterCodes = Object.keys(aminoAcidDictionary);

const threeLetterCodes = values(aminoAcidDictionary);

const isSingleLetterCode = (letter: string) => singleLetterCodes.includes(letter.toUpperCase());

const isThreeLetterCode = (string: string) => threeLetterCodes.includes(string);

// assume the passed string is a valid three-letter code
const toSingleLetterCode = (string: string) => reverseAminoAcidDictionary[string];

export {
  isSingleLetterCode,
  isThreeLetterCode,
  toSingleLetterCode
};
