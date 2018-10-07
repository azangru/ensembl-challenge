import without from 'ramda/src/without';

import {
  findSequencesWithAminoAcid,
  hasAminoAcid
} from 'client/helpers/sequence-helpers';
import { aminoAcidDictionary } from 'client/helpers/amino-acids-helpers';

import singleProteinSequence from 'test/fixtures/sequence-protein-single-response';
import multipleProteinSequences from 'test/fixtures/sequence-protein-multiple-response';

describe('sequence helpers', () => {

  describe('hasAminoAcid', () => {

    test('returns true if the sequence has the queried amino acid in a particular position', () => {
      const { seq } = singleProteinSequence;
      const position =  Math.floor(Math.random() * seq.length);
      const aminoAcid = seq[position];
      const conventionalPosition = position + 1; // convert from base-0 to base-1 indexing

      expect(hasAminoAcid(singleProteinSequence, aminoAcid, conventionalPosition)).toBe(true);
    });

    test('returns false if the sequence has a different amino acid in a particular position', () => {
      const { seq } = singleProteinSequence;
      const position =  Math.floor(Math.random() * seq.length); // convert from base-0 to base-1 indexing
      const aminoAcid = seq[position];
      const conventionalPosition = position + 1; // convert from base-0 to base-1 indexing
      const otherAminoAcids = without([aminoAcid], Object.keys(aminoAcidDictionary));
      const randomAminoAcidIndex = Math.floor(Math.random() * otherAminoAcids.length);
      const otherAminoAcid = otherAminoAcids[randomAminoAcidIndex];

      expect(hasAminoAcid(singleProteinSequence, otherAminoAcid, conventionalPosition)).toBe(false);
    });

  });

  describe('findSequencesWithAminoAcid', () => {

    test('returns a list of sequence objects that have the queried amino acid', () => {
      const aminoAcid = 'F';
      const position = 12; // start counting positions from 1
      const expectedIds = ['ENSP00000369497', 'ENSP00000439902'];

      expect(
        findSequencesWithAminoAcid(multipleProteinSequences, aminoAcid, position)
          .map(({ id }) => id)
      ).toEqual(expectedIds);
    });

  });

});
