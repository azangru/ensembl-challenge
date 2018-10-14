// @flow
import last from 'ramda/src/last';

import { isSingleLetterCode } from 'client/helpers/amino-acid-helpers';

import type { State } from 'client/components/input';

type UpdateStrategyParams = {
  value: string,
  state: State,
  setState: Function,
  onSetState: Function
}

export function updateAminoAcidField(params: UpdateStrategyParams) {
  const { value, setState, onSetState } = params;
  const letter = last(value).toUpperCase();
  if (isSingleLetterCode(letter)) {
    setState({ value: letter }, () => onSetState(letter));
  }
}

export function updatePositionField(params: UpdateStrategyParams) {
  const { value, setState, onSetState } = params;
  const position = parseInt(value, 10);
  if (!isNaN(position)) {
    setState({ value: position }, () => onSetState(position));
  }
}
