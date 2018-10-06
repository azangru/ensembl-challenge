// @flow

import type { Transcript } from 'types/transcript';

// A gene (an entity returned from lookup/symbol/:species/:symbol endpoint)
// has a Transcript field that contains an array of transcripts
export type Gene = {
  Transcript: Transcript[]
}
