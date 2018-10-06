import { selectTranslatableTranscripts } from 'client/helpers/transcript-helpers';

// sample response from the lookup/symbol/:species/:symbol endpoint (with the extended flag)
import BRCA2 from 'test/fixtures/lookup-symbol-species-symbol-response';

describe('transcripts helpers', () => {

  describe('selectTranslatableTranscripts', () => {

    it('selects translatable transcripts from a gene', () => {
      const expectedTranscriptIds = BRCA2.Transcript
        .filter(({ Translation }) => Boolean(Translation))
        .map(transcript => transcript.id);

      expect(selectTranslatableTranscripts(BRCA2).map(transcript => transcript.id))
        .toEqual(expectedTranscriptIds);
    });

  });

});
