// @flow
import path from 'ramda/src/path';

import type { Gene, Transcript } from 'types/lookup-response';
// import type { Transcript } from 'types/transcript';
//
export function getTranscriptsByProteinIds(gene: Gene, proteinIds: string[]) {
  return getTranscripts(gene)
    .filter(transcript => isAssociatedWithProteinIds(transcript, proteinIds));
}

function getTranscripts(gene: Gene) {
  return gene.Transcript || [];
}

function isAssociatedWithProteinIds(transcript: Transcript, proteinIds: string[]) {
  const proteinId = path(['Translation', 'id'], transcript);
  return proteinIds.includes(proteinId);
}
