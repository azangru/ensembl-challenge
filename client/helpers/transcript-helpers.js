// @flow

import type { Gene } from 'types/gene';
import type { Transcript } from 'types/transcript';

export function selectTranslatableTranscripts(gene: Gene) {
  return getTranscripts(gene).filter(isTranslatableTranscript);
}

function getTranscripts(gene: Gene) {
  return gene.Transcript || [];
}

function isTranslatableTranscript(transcript: Transcript) {
  return transcript.hasOwnProperty('Translation');
}
