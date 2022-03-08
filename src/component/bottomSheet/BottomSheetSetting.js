import React, { useState, useRef } from 'react';
import styles from './BottomSheetStyle'

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';


import Settings from '../../screens/profile/Settings';


const BottomSheetSetting = (props) => {

    const { onPressClose , navigation} = props;

    const [visible, setVisible] = useState(false);

    const [isReserve, setisReserve] = useState(0)
    const [isNurse, setisNurse] = useState(true)

    const [Nulldetail, setNulldetail] = useState(null)

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };


    return (
        <Settings
            onPressReserve={() => { setisReserve(1) }}
            onPressClose={() => { onPressClose() }}
            navigation={navigation}
        />
    )


};



export default BottomSheetSetting;


