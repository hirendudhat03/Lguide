import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { Appfonts, } from '../../config/Appfonts';
import styles from './BSStyle'

import {
    Line100, Mapview, donutGraph

} from '../../assets';
import Unorderedlist from 'react-native-unordered-list';
import { ScrollView } from 'react-native-gesture-handler';
import { FontSize } from '../../constant';
import { SmallButtons } from '../../component/SmallButtons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const BSCrimeRoute = (props) => {

    const [Crime, setCrime] = useState(false)

    const { onPressClose, onPressReserve, onOpenCrime, } = props;

    return (

        <SafeAreaView style={[styles.container, {}]}>
            {/* <ScrollView style={[styles.container1, {}]}> */}
            {/* Top */}

            {/* <View style={[styles.col, { width: '100%', paddingTop: 10, paddingRight: 15 }]}>
                    <TouchableOpacity
                        onPress={() => {
                            if (onPressClose !== undefined) {
                                onPressClose()
                            }
                        }}
                    >
                        <Text style={[styles.textClose, { color: '#53A9FF', fontSize: 14, fontWeight: 'bold', textAlign: 'right', }]}>Close</Text>
                    </TouchableOpacity>
                </View> */}

            <View style={[styles.container, { justifyContent: 'flex-start' }]}>

                {/* <View style={[styles.row, {}]}>
                        <Image source={pay} style={{ resizeMode: 'contain', marginBottom: 20 }} />
                    </View> */}
                <View style={[styles.row, {}]}>
                    <Text style={[styles.textThank, { fontFamily: 'Open Sans' }]}>Total crimes in your route</Text>
                </View>
                <View style={[styles.row, { marginBottom: 15, paddingLeft: 30 }]}>

                    <View style={[{ flexDirection: 'column', width: '50%', }]}>
                        <Image source={donutGraph} resizeMode='contain'
                            style={{ width: 150, height: 150 }}
                        />
                    </View>
                    <View style={[{ flexDirection: 'column', width: '50%', alignItems: 'flex-end', }]}>

                        {/* 1 */}
                        <Unorderedlist color='#E74A69' style={{
                            width: 14, height: 14, top: 10, left: 53, borderRadius: 100, backgroundColor: '#E74A69', alignSeft: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (onOpenCrime != undefined) { onOpenCrime() }
                                if (Crime !== undefined) { setCrime(true) }
                            }}>
                                <Text style={[styles.textReserve, {}]}>Crime1</Text>
                            </TouchableOpacity>
                        </Unorderedlist>

                        {/* 2 */}
                        <Unorderedlist color='#223790' style={{
                            width: 14, height: 14, top: 10, left: 53, borderRadius: 100, backgroundColor: '#223790', alignSeft: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (onOpenCrime != undefined) { onOpenCrime() }
                                if (Crime !== undefined) { setCrime(true) }
                            }}>
                                <Text style={[styles.textReserve, {}]}>Crime2</Text>
                            </TouchableOpacity>
                        </Unorderedlist>

                        {/* 3 */}
                        <Unorderedlist color='#FD8600' style={{
                            width: 14, height: 14, top: 10, left: 53, borderRadius: 100, backgroundColor: '#FD8600', alignSeft: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (onOpenCrime != undefined) { onOpenCrime() }
                                if (Crime !== undefined) { setCrime(true) }
                            }}>
                                <Text style={[styles.textReserve, {}]}>Crime3</Text>
                            </TouchableOpacity>
                        </Unorderedlist>

                        {/* 4 */}
                        <Unorderedlist color='#64DEA8' style={{
                            width: 14, height: 14, top: 10, left: 53, borderRadius: 100, backgroundColor: '#64DEA8', alignSeft: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (onOpenCrime != undefined) { onOpenCrime() }
                                if (Crime !== undefined) { setCrime(true) }
                            }}>
                                <Text style={[styles.textReserve, {}]}>Crime4</Text>
                            </TouchableOpacity>
                        </Unorderedlist>

                        {/* 5 */}
                        <Unorderedlist color='#007AFF' style={{
                            width: 14, height: 14, top: 10, left: 53, borderRadius: 100, backgroundColor: '#007AFF', alignSeft: 'flex-end'
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (onOpenCrime != undefined) { onOpenCrime() }
                                if (Crime !== undefined) { setCrime(true) }
                            }}>
                                <Text style={[styles.textReserve, {}]}>Crime5</Text>
                            </TouchableOpacity>
                        </Unorderedlist>


                        {/* <CrimeLInk title='Crime2'
                            ulcolor='blue'
                            Crime={()=>setCrime()}
                            onOpenCrime={() => onOpenCrime()}
                            
                        /> */}

                    </View>
                </View>

                <View style={[styles.row, { marginBottom: 20 }]}>
                    <Image source={Line100} resizeMode='contain' />
                </View>

                {Crime == true ? <>

                    <View style={[styles.row, { marginBottom: 15 }]}>
                        <Text style={[styles.textLater, {}]}>Crime 3 : Crime vs Time analytics</Text>
                    </View>
                    <View style={[styles.row, {
                        marginBottom: 30, width: '100%',
                        height: 200,
                        width: "100%",
                        marginBottom: 20
                    }]}>
                        <Image source={Mapview}
                            resizeMode='cover'
                            // style={[ {width: '100%' }]}
                            style={[{ width: "100%", height: "100%" }]}
                        />
                    </View>
                    <View style={[styles.row, { marginBottom: 90, }]}>
                        <Image source={Line100} resizeMode='contain' />
                    </View>

                </> : null}



                {/* Start Navigation */}
                <View
                    style={[styles.rowTotal, {
                        // flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        position: 'absolute',
                        bottom: 20,
                    },]}>



                    <View style={[styles.col, { flexDirection: "row", width: '100%', paddingHorizontal: 30 }]}>

                        <SmallButtons title="Start Navigation"
                            buttonStyle={{
                                width: '100%',
                                borderRadius: 50, backgroundColor: '#6E80F3',
                                zIndex: 1111
                            }}
                            btnTextStyle={{ color: '#fff', fontSize: 16, fontFamily: 'Open Sans' }}
                            // onPress={this.buttonClickListener}
                            onPress={() => this.setState({ BtnNavigation: this.state.BtnNavigation = true })}
                        />

                    </View>
                </View>




            </View>
            {/* </ScrollView> */}
        </SafeAreaView>



    );
};



const CrimeLInk = (props) => {
    const { title, onOpenCrime, ulcolor, } = props
    const [Crime, setCrime] = useState(false)
    return (
        <>
            <Unorderedlist color={ulcolor} style={{
                // fontSize: 15,
                width: 15,
                height: 15,
                top: 10,
                borderRadius: 100,
                backgroundColor: ulcolor,
                alignSeft: 'flex-end'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (onOpenCrime != undefined) {
                            onOpenCrime()
                        }
                        if (Crime != undefined) {
                            setCrime(true)
                            // setCrime() 
                        }
                    }}>
                    <Text style={[styles.textReserve, {}]}>{title}</Text>
                </TouchableOpacity>
            </Unorderedlist>


            {/* <TouchableOpacity
             onPress={() => { if (Crime !== undefined) { setCrime(true) } }}>
            <Text style={[styles.textReserve, {}]}>{title}</Text>
        </TouchableOpacity> */}

        </>
    )
}

export default BSCrimeRoute;
