// @flow

import { connect } from 'react-redux';

import SearchResults from 'client/components/search-results';

const mapStateToProps = state => ({
  ...state.search
});

export default connect(mapStateToProps)(SearchResults);
