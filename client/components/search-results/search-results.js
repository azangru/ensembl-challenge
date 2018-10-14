// @flow

import React, { PureComponent, Fragment } from 'react';
import Loading from 'client/components/loading';

import './search-results.styl';

import type { State as SearchState } from 'client/state/reducers/search-reducer';

type Props = SearchState;

class SearchResults extends PureComponent<Props> {

  isSearchByGene() {
    return Boolean(this.props.searchByGeneInput);
  }

  isSearchByProtein() {
    return Boolean(this.props.searchByProteinInput);
  }

  isLoading() {
    return this.props.loading;
  }

  isSearchCompleted() {
    return Boolean(this.props.searchByGeneInput || this.props.searchByProteinInput);
  }

  isEmptySearch() {
    return this.props.transcriptIds.length === 0;
  }

  getSearchByGeneSuccessMessage() {
    if (!this.props.searchByGeneInput) return;
    const { gene, aminoAcid, aminoAcidPosition } = this.props.searchByGeneInput;

    return `Transcripts of the ${gene} gene that encode proteins with ${aminoAcid} at position ${aminoAcidPosition}:`;
  }

  getSearchByProteinSuccessMessage() {
    if (!this.props.searchByProteinInput) return;
    const { gene, initialAminoAcid, position } = this.props.searchByProteinInput;

    return `Transcripts of the ${gene} gene that encode proteins with ${initialAminoAcid} at position ${position}:`;
  }

  getSearchByGeneEmptyMessage() {
    if (!this.props.searchByGeneInput) return;
    const { gene, aminoAcid, aminoAcidPosition } = this.props.searchByGeneInput;

    return `Could not find transcripts of the ${gene} gene that encode proteins with ${aminoAcid} at position ${aminoAcidPosition}`;
  }

  getSearchByProteinEmptyMessage() {
    if (!this.props.searchByProteinInput) return;
    const { gene, initialAminoAcid, position } = this.props.searchByProteinInput;

    return `Could not find transcripts of the ${gene} gene that encode proteins with ${initialAminoAcid} at position ${position}`;
  }

  render() {
    let content;

    if (this.props.loading) {
      content = <Loading />;
    } else if (this.props.error) {
      content = this.renderError();
    } else {
      content = (
        <Fragment>
          { this.renderCompletedMessage() }
          { this.renderTranscriptsList() }
        </Fragment>
      );
    }

    return (
      <div className="search-results">
        { content }
      </div>
    );
  }

  renderCompletedMessage() {
    let message;
    if (this.isSearchByGene()) {
      message = this.isEmptySearch() ?
        this.getSearchByGeneEmptyMessage() :
        this.getSearchByGeneSuccessMessage();
    } else if (this.isSearchByProtein()) {
      message =  this.isEmptySearch() ?
        this.getSearchByProteinEmptyMessage() :
        this.getSearchByProteinSuccessMessage();
    }
    return (
      <div className="search-results__message">
        { message }
      </div>
    );
  }

  renderTranscriptsList() {
    return this.props.transcriptIds.map(id => (
      <a
        className="search-results__item"
        key={id}
        href={`http://www.ensembl.org/id/${id}`}
        target="_blank"
      >
        {id}
      </a>
    ));
  }

  renderError() {
    return (
      <div className="search-results__error">
        { this.props.error }
      </div>
    );
  }

}

export default SearchResults;
