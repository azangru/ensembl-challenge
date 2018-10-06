// @flow
import React, { PureComponent } from 'react';

type Props = {
  updateStrategy?: Function,
  onChange: string => any
};

export type State = {
  value: string
};

class Input extends PureComponent<Props, State> {

  state = {
    value: ''
  }

  boundSetState = (...args: any) => this.setState(...args)

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { updateStrategy } = this.props;

    const value = e.target.value;

    if (!value || !updateStrategy) {
      this.setState({ value });
      this.props.onChange(value);
    } else {
      updateStrategy({
        value,
        state: this.state,
        setState: this.boundSetState,
        onSetState: this.props.onChange
      });
    }
  }

  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }

}

export default Input;
