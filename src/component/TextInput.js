import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Item, Input, Label, Icon} from 'native-base';
import {Colors, FontSize} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export class TextInputs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      value,
      onChangeText,
      placeholder,
      pass,
      refs,
      onSubmitEditing,
      returnKeyType,
      iconShow,
      iconName,
      passwordShowHandler,
    } = this.props;

    return (
      <View style={[styles.box]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="gray"
          {...this.props}
          // secureTextEntry = {pass}
          // ref={refs}

          // onSubmitEditing = {() => onSubmitEditing()}
        />
        <Icon
          onPress={passwordShowHandler}
          type="Entypo"
          name={iconName}
          style={{
            fontSize: FontSize.Regular + 5,
            display: iconShow ? 'flex' : 'none',
            color: 'gray',
          }}
        />
      </View>
    );
  }
}

export class TextInputBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      value,
      onChangeText,
      placeholder,
      pass,
      refs,
      onSubmitEditing,
      returnKeyType,
      iconShow,
      iconName,
      passwordShowHandler,
    } = this.props;

    return (
      <View style={[styles.boxs]}>
        <Icon
          onPress={passwordShowHandler}
          type="Entypo"
          name={iconName}
          style={{
            fontSize: FontSize.Regular + 5,
            display: iconShow ? 'flex' : 'none',
            color: 'gray',
          }}
        />
        <TextInput        
          style={styles.input}
          placeholderTextColor="gray"
          {...this.props}
          pointerEvents='none'
          // secureTextEntry = {pass}
          // ref={refs}
          
          // onSubmitEditing = {() => onSubmitEditing()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    alignSelf: 'center',
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  boxs: {
    width: '100%',
    alignSelf: 'center',
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#191919',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    width: '90%',
    borderWidth: 0,
    color: '#000',
    fontSize: FontSize.Regular + 0.5,
    padding: 0,
    margin: 0,
    height: '100%',
    
  },
  label: {
    fontSize: FontSize.Regular + 1,
    color: Colors.txtColor,
  },
});
