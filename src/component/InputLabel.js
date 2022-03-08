import {Label} from 'native-base';
import React, {Component} from 'react';
import {Text, View} from 'react-native';

const InputLabel = (props) => {
  const {lableName, icon} = props;
  return (
    <Label style={{marginBottom: 8}}>
      {lableName}
      <Label style={{color: 'red'}}>{icon}</Label>
    </Label>
  );
};

export default InputLabel;