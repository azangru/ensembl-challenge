// @flow

import React, { PureComponent } from 'react';

import PlainSearchFields from './plain-search-fields';
import HGVSSearchField from './hgvs-search-field';

type Props = {
  searchByGene: Function,
  searchByProtein: Function
}

class SearchFields extends PureComponent<Props> {

  render() {
    return (
      <div>
        <PlainSearchFields onSearch={this.props.searchByGene}/>
        <HGVSSearchField onSearch={this.props.searchByProtein} />
      </div>
    );
  }

}

export default SearchFields;
