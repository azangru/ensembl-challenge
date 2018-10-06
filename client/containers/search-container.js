// @flow

import React from 'react';

import SearchFields from 'client/components/search-fields';

type Props = {
  onSearch: Function
}

function Search(props: Props) {
  return (
    <SearchFields onSearch={props.onSearch} />
  );
}

export default Search;
