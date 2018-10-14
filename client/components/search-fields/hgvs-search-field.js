// @flow

import React, { PureComponent } from 'react';

import {
  isValidSubstitutionCode,
  parseHgvsSubsctitutionCode
} from 'client/helpers/hgvs-helpers';

import Field from 'client/components/field';

type Props = {
  onSearch: Function,
  cancelSearch: Function
}

type State = {
  substitution: string,
  showError: boolean
}

class HGVSSearchField extends PureComponent<Props, State> {

  state = {
    substitution: '',
    showError: false
  }

  shouldCancel(newSubstitution: string) {
    return isValidSubstitutionCode(this.state.substitution) &&
      !isValidSubstitutionCode(newSubstitution);
  }

  handleBlur = () => {
    if (this.state.substitution && !isValidSubstitutionCode(this.state.substitution)) {
      this.setState({ showError: true });
    }
  }

  handleChange = (substitution: string) => {
    if (this.shouldCancel(substitution)) {
      this.props.cancelSearch();
    } else if (isValidSubstitutionCode(substitution)) {
      const payload = parseHgvsSubsctitutionCode(substitution);
      this.props.onSearch(payload);
    }
    this.setState({ substitution, showError: false });
  }

  getErrorMessage() {
    return 'This is not a valid substitution code';
  }

  render() {
    return (
      <Field
        label="Substitution (in HGVS notation)"
        name="hgvs-substitution"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={this.state.showError ? this.getErrorMessage() : ''}
      />
    );
  }

}

export default HGVSSearchField;
