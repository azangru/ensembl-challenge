// @flow
import React, { PureComponent } from 'react';

type Props = {
  id?: string,
  name?: string,
  updateStrategy?: Function,
  onChange: string => any,
  onFocus: Function,
  onBlur: Function
};

export type State = {
  value: string
};

class Input extends PureComponent<Props, State> {

  static defaultProps = {
    onFocus: () => {},
    onBlur: () => {}
  }

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
        id={this.props.id}
        name={this.props.name}
        value={this.state.value}
        onChange={this.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    );
  }

}

export default Input;
