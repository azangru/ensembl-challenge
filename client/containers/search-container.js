// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  searchByGene,
  searchByProtein
} from 'client/state/actions/search-actions';

import SearchFields from 'client/components/search-fields';

type Props = {
  searchByGene: Function,
  searchByProtein: Function
}

class SearchContainer extends PureComponent<Props> {

  componentDidCatch(error) {
    console.log('error', error);
  }

  render() {
    return (
      <SearchFields
      searchByGene={this.props.searchByGene}
      searchByProtein={this.props.searchByProtein}
      />
    );
  }
}

const mapDispatchToProps = {
  searchByGene,
  searchByProtein
};

export default connect(null, mapDispatchToProps)(SearchContainer);
