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
      const invalidExample = 'ENSP00000419060.2:p.Val'; // ¯\_(ツ)_/¯ there are so many invalid possibilities
      expect(isValidSubstitutionCode(invalidExample)).toBe(false);
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
