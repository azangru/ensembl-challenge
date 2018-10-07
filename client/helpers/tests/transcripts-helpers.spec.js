import prop from 'ramda/src/prop';

import { getTranscriptsByProteinIds } from 'client/helpers/transcript-helpers';

import BRCA2 from 'test/fixtures/lookup-gene-expanded-response';
import multipleProteinSequences from 'test/fixtures/sequence-protein-multiple-response';

describe('transcripts helpers', () => {

  describe('getTranscriptsByProteinIds', () => {

    it('selects gene transcripts by ids of their proteins', () => {
      const proteinIds = multipleProteinSequences.map(prop('id'));
      const expectedTranscriptIds = [
        'ENST00000380152',
        'ENST00000528762',
        'ENST00000470094',
        'ENST00000544455'
      ];

      expect(getTranscriptsByProteinIds(BRCA2, proteinIds).map(prop('id')))
        .toEqual(expectedTranscriptIds);
    });

  });

});
