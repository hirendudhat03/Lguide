import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useTheme} from '@react-navigation/native';

const ThemeView = ({listen,children}) => {
    const { colors } = useTheme();
    return(children(colors))
    // const { style,backgroundColor } = props
    // return (
    //     <View style = {[{backgroundColor : colors.backgroundColor}, style]}>
    //         {props.children}
    //     </View>
    // )
}

export default ThemeView

const styles = StyleSheet.create({})
