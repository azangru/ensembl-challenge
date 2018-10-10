// @flow

import React, { PureComponent } from 'react';

type Props = {}

type State = {
  count: number
}

class Loading extends PureComponent<Props, State> {

  state = {
    count: 0
  }

  interval: ?IntervalID

  componentDidMount() {
    this.interval = setInterval(this.increment, 500);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  getDots() {
    return [... new Array(this.state.count % 4)]
      .map(() => '.')
      .join('');
  }

  render() {
    return (
      <div>
        Loading {this.getDots()}
      </div>
    );
  }

}

export default Loading;
