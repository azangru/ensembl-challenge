// @flow

import type {
  SearchByGenePayload,
  SearchByProteinPayload,
  Action
} from 'client/state/actions/search-actions';

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_CANCEL,
  SEARCH_ERROR
} from 'client/state/constants/search-constants';

type SearchByProteinInput = SearchByProteinPayload & {
  gene: string
};

export type State = {
  searchByGeneInput: ?SearchByGenePayload,
  searchByProteinInput: ?SearchByProteinInput,
  transcriptIds: string[],
  error: ?string,
  loading: boolean
};

const initialState = {
  searchByGeneInput: null,
  searchByProteinInput: null,
  transcriptIds: [],
  error: null,
  loading: false
};

export default function searchReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SEARCH_START:
      return {
        ...initialState,
        loading: true
      };

    case SEARCH_SUCCESS:
      return {
        ...initialState,
        searchByGeneInput: action.meta.searchBy === 'gene' ? action.payload.searchInput : null,
        searchByProteinInput: action.meta.searchBy === 'protein' ? action.payload.searchInput : null,
        transcriptIds: action.payload.transcriptIds
      };

    case SEARCH_CANCEL:
      return initialState;

    case SEARCH_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
}
