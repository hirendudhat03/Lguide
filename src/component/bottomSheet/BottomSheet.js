
import React, { useState, useRef } from 'react';
// import styles from './BottomSheetStyle'

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import BSCrimeRoute from '../../screens/Direction/BSCrimeRoute';








//import basic react native components
// import { BottomSheet } from 'react-native-btr';

//import to show social icons
// import { SocialIcon } from 'react-native-elements';

const BottomSheet = (props) => {

    const { onPressClose , onOpenCrime} = props;

    const [visible, setVisible] = useState(false);

    const [isReserve, setisReserve] = useState(0)
    const [isNurse, setisNurse] = useState(true)

    const [Nulldetail, setNulldetail] = useState(null)

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };


    return (
    <BSCrimeRoute
                onPressReserve={() => {  }}
                onPressClose={() => { onPressClose() }}
                onOpenCrime={onOpenCrime}
            />
    )
            
    // if (isReserve == 1) {
    //     return (
    //         <ChooseNurse
    //             onPressClose={() => { onPressClose() }}
    //             onPressNurse={(item) => {
    //                 setisReserve(2)
    //                 setNulldetail(item)
    //             }
    //             }
    //         />
    //     )
    // } 
    // else if (isReserve == 2) {
    //     return (
    //         <NurseTimeTable
    //             onPressClose={() => { onPressClose() }}
    //             onPressChange={() => { setisReserve(1) }}
    //             detail={Nulldetail}
    //         />
    //     )
    // } 
    
    // else {
    //     return (
    //         <BSCrimeRoute
    //             onPressReserve={() => { setisReserve(1) }}
    //             onPressClose={() => { onPressClose() }}
    //         />
    //     )
    // }
    // return (
    //     <>

    //         { isReserve ? (<>

    //             {/* 1   */}
    //             <Success 
    //                 onPressReserve={() => { setisReserve(false) }}
    //                 onPressClose={() => {  onPressClose() }}
    //             />

    //         </>) : (<>

    //             {/* 2 */}
    //             <ChooseNurse 
    //                 onPressClose={() => {  onPressClose() }}
    //             />
    //         </>)}

    //     </>
    // );
};








export default BottomSheet;

// const styles = StyleSheet.create({


// });
