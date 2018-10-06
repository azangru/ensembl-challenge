// @flow

// The types below account only for the fields relevant for this app;
// other fields returned from the REST api will be ignored
// (unfortunately, Ensembl doesn’t have a graphql api)

type Translation = {
  id: string
}

export type Transcript = {
  id: string,
  Translation?: Translation
}
