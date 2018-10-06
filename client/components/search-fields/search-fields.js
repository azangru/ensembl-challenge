// @flow

import React, { PureComponent } from 'react';

import Input from 'client/components/input';

type Props = {
  onSearch: Function
}

type State = {
  gene: string,
  aminoAcid: string,
  aminoAcidPosition: ?number
};

class SearchFields extends PureComponent<Props, State> {

  state = {
    gene: '',
    aminoAcid: '',
    aminoAcidPosition: null
  }

  render() {
    return (
      <Input />
    );
  }

}

export default SearchFields;
