// @flow

import React, { PureComponent } from 'react';

import {
  isValidSubstitutionCode,
  parseHgvsSubsctitutionCode
} from 'client/helpers/hgvs-helpers';

import Field from 'client/components/field';

type Props = {
  onSearch: Function
}

class HGVSSearchField extends PureComponent<Props> {

  handleChange = (substitution: string) => {
    if (isValidSubstitutionCode(substitution)) {
      const payload = parseHgvsSubsctitutionCode(substitution);
      this.props.onSearch(payload);
    }
  }

  render() {
    return (
      <Field
        label="Amino acid substitution in HGVS notation"
        name="hgvs-substitution"
        onChange={this.handleChange}
      />
    );
  }

}

export default HGVSSearchField;
