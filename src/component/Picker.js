import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export const Picker = (props) => {
  const { AllCrimeType, dropDownHandler } = props
  return (
    <DropDownPicker
      itemStyle={{}}
      items={AllCrimeType}
      defaultNull
      placeholder="Select crime type"
      placeholderStyle = {{color : 'gray'}}
      style = {{color : '#000'}}
      containerStyle={{height: 50}}
      
      customRender={true}
      onChangeItem={(item) => dropDownHandler(item)}
    />
  );
};

export default Picker;
