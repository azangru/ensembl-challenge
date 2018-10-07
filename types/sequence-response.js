// @flow

// The types below account only for the fields relevant for this app;
// other fields returned from the REST api will be ignored
// (unfortunately, Ensembl doesn’t have a graphql api)

export type Sequence = {
  seq: 'string',
  query: string, // string that was used to query the api
  id: string, // stable id of the molecule
  molecule: 'dna' | 'protein'
}

export type MultipleSequences = Sequence[];
