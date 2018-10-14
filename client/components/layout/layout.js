// @flow

import React, { type Node } from 'react';

import './layout.styl';

type Props = {
  children: Node
}

function Layout (props: Props) {

  return (
    <div className="layout">
      { props.children }
    </div>
  );

}

export default Layout;
