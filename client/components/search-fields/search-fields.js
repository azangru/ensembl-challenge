// @flow

import React, { PureComponent } from 'react';

import PlainSearchFields from './plain-search-fields';

type Props = {
  searchByGene: Function,
  searchByProtein: Function
}

class SearchFields extends PureComponent<Props> {

  render() {
    return (
      <div>
        <PlainSearchFields onSearch={this.props.searchByGene}/>
      </div>
    );
  }

}

export default SearchFields;
