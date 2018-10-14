// @flow

import React, { PureComponent } from 'react';
import Loading from 'client/components/loading';

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

    return `Transcripts of ${gene} that encode proteins with ${aminoAcid} at ${aminoAcidPosition}:`;
  }

  getSearchByProteinSuccessMessage() {
    if (!this.props.searchByProteinInput) return;
    const { gene, initialAminoAcid, position } = this.props.searchByProteinInput;

    return `Transcripts of ${gene} that encode proteins with ${initialAminoAcid} at ${position}:`;
  }

  getSearchByGeneEmptyMessage() {
    if (!this.props.searchByGeneInput) return;
    const { gene, aminoAcid, aminoAcidPosition } = this.props.searchByGeneInput;

    return `Could not find transcripts of ${gene} that encode proteins with ${aminoAcid} at ${aminoAcidPosition}:`;
  }

  getSearchByProteinEmptyMessage() {
    if (!this.props.searchByProteinInput) return;
    const { gene, initialAminoAcid, position } = this.props.searchByProteinInput;

    return `Could not find transcripts of ${gene} that encode proteins with ${initialAminoAcid} at ${position}:`;
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="search-results">
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="search-results">
          { this.renderCompletedMessage() }
          { this.renderTranscriptsList() }
        </div>
      );
    }
  }

  renderCompletedMessage() {
    if (this.isSearchByGene()) {
      return this.isEmptySearch() ?
        this.getSearchByGeneEmptyMessage() :
        this.getSearchByGeneSuccessMessage();
    } else if (this.isSearchByProtein()) {
      return this.isEmptySearch() ?
        this.getSearchByProteinEmptyMessage() :
        this.getSearchByProteinSuccessMessage();
    }
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

}

export default SearchResults;
