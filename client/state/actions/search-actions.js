// @flow

import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from 'client/state/constants/search-constants';

type SearchByGenePayload = {
  gene: string,
  aminoAcid: string,
  aminoAcidPosition: number
};

type SearchByProteinPayload = {
  sequenceId: string,
  initialAminoAcid: string,
  newAminoAcid: string,
  position: number
};

export function searchByGene(payload: SearchByGenePayload) {
  console.log('payload', payload);
  return {
    type: SEARCH_START
  };
}

export function searchByProtein(payload: SearchByProteinPayload) {
  console.log('payload', payload);
  return {
    type: SEARCH_START
  };
}
