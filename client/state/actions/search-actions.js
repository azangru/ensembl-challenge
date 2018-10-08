// @flow

import {
  SEARCH_START
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
  return {
    type: SEARCH_START,
    payload
  };
}

export function searchByProtein(payload: SearchByProteinPayload) {
  return {
    type: SEARCH_START,
    payload
  };
}
