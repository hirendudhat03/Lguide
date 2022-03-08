import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
// import { Appfonts } from "../config/Appfonts";
export const SmallButtons = (props) => {
  const { title ,buttonStyle , onPress, btnTextStyle} = props;


  return (
    <>
      <TouchableOpacity
        style={[styles.btnContinue, buttonStyle]}
        onPress={() => {
            if(onPress !== undefined){
                onPress()
            }
        }}

      >
        <Text style={[styles.buttonText, btnTextStyle, {}]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnContinue: {
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    // fontFamily: Appfonts.fW700,
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // width: 123,
    width: 'auto',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#349C52",
    textAlign: 'center',
    width: '100%'
  },
});
