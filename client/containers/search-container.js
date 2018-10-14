// @flow

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  searchByGene,
  searchByProtein
} from 'client/state/actions/search-actions';

import SearchResultsContainer from 'client/containers/search-results-container';

import SearchFields from 'client/components/search-fields';

type Props = {
  searchByGene: Function,
  searchByProtein: Function
}

class SearchContainer extends PureComponent<Props> {

  render() {
    return (
      <Fragment>
        <SearchFields
          searchByGene={this.props.searchByGene}
          searchByProtein={this.props.searchByProtein}
        />
        <SearchResultsContainer />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  searchByGene,
  searchByProtein
};

export default connect(null, mapDispatchToProps)(SearchContainer);
