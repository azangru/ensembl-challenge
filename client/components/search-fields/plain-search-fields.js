// @flow

import React, { PureComponent } from 'react';

import Field from 'client/components/field';

import {
  updateAminoAcidField,
  updatePositionField
} from 'client/helpers/input-helpers';

type Props = {
  onSearch: Function,
  cancelSearch: Function
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

  shouldSearch() {
    return Boolean(this.state.gene && this.state.aminoAcid && this.state.aminoAcidPosition);
  }

  shouldCancel(prevState: State) {
    const wasSearching = Boolean(prevState.gene && prevState.aminoAcid && prevState.aminoAcidPosition);
    const shouldNotSearch = !this.state.gene || !this.state.aminoAcid || typeof this.state.aminoAcidPosition !== 'number';
    return wasSearching && shouldNotSearch;
  }

  onGeneFieldChange = (gene: string) => {
    const prevState = this.state;
    this.setState({ gene }, () => this.handleChange(prevState));
  }

  onPositionFieldChange = (aminoAcidPosition: ?number) => {
    const prevState = this.state;
    this.setState({ aminoAcidPosition }, () => this.handleChange(prevState));
  }

  onAminoAcidFieldChange = (aminoAcid: string) => {
    const prevState = this.state;
    this.setState({ aminoAcid }, () => this.handleChange(prevState));
  }

  handleChange(prevState: State) {
    if (this.shouldCancel(prevState)) {
      this.props.cancelSearch();
    } else if (this.shouldSearch()) {
      this.props.onSearch(this.state);
    }
  }

  render() {
    return (
      <div>
        { this.renderGeneSymbolField() }
        { this.renderPositionField() }
        { this.renderAminoAcidField() }
      </div>
    );
  }

  renderGeneSymbolField() {
    return (
      <Field
        label="Gene symbol"
        name="gene-symbol"
        onChange={this.onGeneFieldChange}
      />
    );
  }

  renderPositionField() {
    return (
      <Field
        label="Position in protein sequence"
        name="amino-acid-position"
        onChange={this.onPositionFieldChange}
        updateStrategy={updatePositionField}
      />
    );
  }

  renderAminoAcidField() {
    return (
      <Field
        label="Amino acid"
        name="amino-acid"
        onChange={this.onAminoAcidFieldChange}
        updateStrategy={updateAminoAcidField}
      />
    );
  }

}

export default SearchFields;
