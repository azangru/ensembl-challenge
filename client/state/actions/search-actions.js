// @flow

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_CANCEL,
  SEARCH_ERROR
} from 'client/state/constants/search-constants';

export type SearchByGenePayload = {
  gene: string,
  aminoAcid: string,
  aminoAcidPosition: number
};

export type SearchByProteinPayload = {
  sequenceId: string,
  initialAminoAcid: string,
  newAminoAcid: string,
  position: number
};

type SearchByGeneStartAction = {
  type: typeof SEARCH_START,
  payload: SearchByGenePayload,
  meta: { searchBy: 'gene' }
};

type SearchByProteinStartAction = {
  type: typeof SEARCH_START,
  payload: SearchByProteinPayload,
  meta: { searchBy: 'gene' }
}

type SearchByGeneSuccessAction = {
  type: typeof SEARCH_SUCCESS,
  payload: {
    searchInput: SearchByGenePayload,
    transcriptIds: string[]
  },
  meta: { searchBy: 'gene' }
};

type SearchByProteinSuccessAction = {
  type: typeof SEARCH_SUCCESS,
  payload: {
    searchInput: SearchByProteinPayload,
    transcriptIds: string[]
  },
  meta: { searchBy: 'protein' }
}

type SearchCancelAction = {
  type: typeof SEARCH_CANCEL
};

type SearchErrorAction = {
  type: typeof SEARCH_ERROR,
  error: string
};

export type Action =
  | SearchByGeneStartAction
  | SearchByProteinStartAction
  | SearchByGeneSuccessAction
  | SearchByProteinSuccessAction
  | SearchCancelAction
  | SearchErrorAction


export function searchByGene(payload: SearchByGenePayload) {
  return {
    type: SEARCH_START,
    payload,
    meta: { searchBy: 'gene' }
  };
}

export function searchByProtein(payload: SearchByProteinPayload) {
  return {
    type: SEARCH_START,
    payload,
    meta: { searchBy: 'protein' }
  };
}

export function cancelSearch() {
  return {
    type: SEARCH_CANCEL
  };
}
