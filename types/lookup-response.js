// @flow

// The types below account only for the fields relevant for this app;
// other fields returned from the REST api will be ignored
// (unfortunately, Ensembl doesn’t have a graphql api)

export type Gene = {
  Transcript: Transcript[],
  object_type: "Gene"
}

export type Transcript = {
  id: string,
  Parent: string,
  Translation?: Translation,
  object_type: "Transcript"
}

export type Translation = {
  id: string,
  Parent: string,
  object_type: "Translation"
}
