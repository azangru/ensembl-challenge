// @flow
import React, { PureComponent } from 'react';

type Props = {
  onChange: (SyntheticInputEvent<HTMLInputElement>, string) => any
};

type State = {
  value: string
};

class Input extends PureComponent<Props, State> {

  state = {
    value: ''
  }

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.target.value;
    this.setState({ value });
    this.props.onChange(e, value);
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
