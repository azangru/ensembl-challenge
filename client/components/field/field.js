// @flow

import React from 'react';

import Input from 'client/components/input';

import './field.styl';

type Props = {
  label: string,
  name: string,
  updateStrategy?: Function,
  onChange: Function,
  error?: string
}

function Field(props: Props) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={props.name}>{props.label}</label>
      <Input
        id={props.name}
        onChange={props.onChange}
        updateStrategy={props.updateStrategy}
      />
      { props.error &&
        <div className="field__error">
          { props.error }
        </div>
      }
    </div>
  );
}

export default Field;
