import {
  isValidSubstitutionCode,
  parseHgvsSubsctitutionCode
} from 'client/helpers/hgvs-helpers';

describe('hgvs-helpers', () => {

  describe('isValidSubstitutionCode', () => {

    it('returns true for a valid code', () => {
      const validExample = 'ENSP00000419060.2:p.Val600Glu';
      expect(isValidSubstitutionCode(validExample)).toBe(true);
    });

    it('returns false for a non-valid code', () => {
      const invalidExample1 = 'ENSP00000419060.2:p.Val'; // only first amino acid entered
      const invalidExample2 = 'ENSP00000419060.2:p.Val600Gl'; // last amino acid incomplete
      const invalidExample3 = 'ENSP00000419060.2:p.Val600Gll'; // last amino acid misspelled

      // ¯\_(ツ)_/¯ there are so many invalid possibilities

      [invalidExample1, invalidExample2, invalidExample3].forEach(example => {
        expect(isValidSubstitutionCode(example)).toBe(false);
      });

    });

  });

  describe('parseHgvsSubsctitutionCode', () => {

    it('parses HDVS substitution code into parts', () => {
      const example = 'ENSP00000419060.2:p.Val600Glu';
      const expectedResult = {
        sequenceId: 'ENSP00000419060.2',
        initialAminoAcid: 'Val',
        newAminoAcid: 'Glu',
        position: 600
      };

      expect(parseHgvsSubsctitutionCode(example)).toEqual(expectedResult);
    });

  });

});
