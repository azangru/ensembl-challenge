// @flow

import { isThreeLetterCode } from 'client/helpers/amino-acid-helpers';

// an amino acid substitution code, according to the HGVS nomenclature,
// as used in this app, consists of:
// protein sequence id followed by colon, then prefix (p.), then 3-letter code of amino acid,
// then position of the amino acid, then another 3-letter code of another amino acid
const HGVS_SUBSTITUTION_REGEX = /(.+):p\.(.{3})(\d+)(.{3})$/;

export function isValidSubstitutionCode(string: string) {
  if (!HGVS_SUBSTITUTION_REGEX.test(string)) {
    return false;
  }
  // also, make sure that amino acids are actually the ones from the alphabet
  const { initialAminoAcid, newAminoAcid } = parseHgvsSubsctitutionCode(string);
  return isThreeLetterCode(initialAminoAcid) && isThreeLetterCode(newAminoAcid);
}

// assumes a valid string
export function parseHgvsSubsctitutionCode(string: string) {
  const result = HGVS_SUBSTITUTION_REGEX.exec(string);
  if (!result) return {};

  const [, sequenceId, initialAminoAcid, position, newAminoAcid] = result;
  return {
    sequenceId,
    initialAminoAcid,
    newAminoAcid,
    position: parseInt(position, 10)
  };
}
