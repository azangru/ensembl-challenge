// @flow

import React, { PureComponent } from 'react';

import Field from 'client/components/field';

import {
  updateAminoAcidField,
  updatePositionField
} from 'client/helpers/input-helpers';

type Props = {
  onSearch: Function
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

  onGeneFieldChange(val) {
    console.log('on gene change', val);
  }

  onPositionFieldChange(val) {
    console.log('on position change', val);
  }

  onAminoAcidFieldChange(val) {
    console.log('on amino acid change', val);
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
