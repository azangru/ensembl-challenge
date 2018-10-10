// @flow

import React, { PureComponent } from 'react';
import Loading from 'client/components/loading';

import type { State as SearchState } from 'client/state/reducers/search-reducer';

type Props = SearchState;

class SearchResults extends PureComponent<Props> {

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      return this.props.transcriptIds;
    }
  }

}

export default SearchResults;
