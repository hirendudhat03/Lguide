import React, { Component, useRef } from "react";
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, StatusBar, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";

import {
    direction_work,
    direction_home,
    Line90,
    location,
    circle,
    square,
    Rectangle,
    LineVerticle,
    Plus,
    minus,
    addNewLocation,
    locationButton,
    iButton,
} from '../../assets';
import { SmallButtons } from "../../component/SmallButtons";
import MapView from 'react-native-maps';
import { ActionSheet } from "../../component";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from "../../component/bottomSheet/BottomSheet";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Direction extends Component {


    constructor(props) {
        super(props)
        this.state = {
            StartLocation: '',
            Destination: '',
            BtnNavigation: false,
            refRBSheet: null,
        }
    }

    // const refRBSheet = useRef(null);

    buttonClickListener = () => {
        const { StartLocation, Destination } = this.state;
        // Alert.alert(StartLocation);
        // Alert.alert(StartLocation + Destination);
        // console.log('StartLocation==', StartLocation)
        // let StartLocationLength = this.state.StartLocation.length+1
        // console.log('StartLocationLength==', StartLocationLength)
    }

    onChangeText = () => {
        const { StartLocation, Destination } = this.state;
        // Alert.alert(StartLocation + Destination);
    }



    render() {

        



        return (



            <>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.mainView}>

                            {/* Input Section  */}
                            <View style={[styles.boxWithShadow, {
                                flexDirection: 'row',
                                paddingTop: 15,
                                // paddingBottom: 5,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                // backgroundColor: 'lightgray',
                                width: '100%',
                                paddingLeft: 20,
                            }]}>


                                <View style={{ width: '85%', }}>
                                    <TextInput
                                        style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginLeft: '10%' }}
                                        placeholder="Starting Location"
                                        // onChangeText={(text) => setValue({ ...value, StartLocation: text })}
                                        onChangeText={StartLocation => this.buttonClickListener(this.setState({ StartLocation }))}
                                        underlineColorAndroid="transparent"
                                    />

                                    {/* Destionation Add  */}



                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        <View style={{ width: '10%', }}>
                                            <Image
                                                style={{ position: 'relative', top: '-75%' }}
                                                source={addNewLocation} resizeMode="contain" />
                                        </View>
                                        <TextInput
                                            style={{ width: '90%' }}
                                            placeholder="Enter Destionation"
                                            underlineColorAndroid="#E4E9F2"

                                            onChangeText={Destination => this.buttonClickListener(this.setState({ Destination }))}
                                            underlineColorAndroid="transparent"
                                        />
                                        <Image style={{ marginTop: 10, marginRight: 10 }} source={LineVerticle} resizeMode="contain" />

                                        {/* <TouchableOpacity onPress={() => deleteHandler(key)}>
                              <Image style={{ marginTop: 10, marginLeft: 5, }} source={minus} resizeMode="contain" />
                            </TouchableOpacity> */}

                                    </View>



                                    <View style={{
                                        flexDirection: 'row',
                                        width: '109%',
                                        // backgroundColor: 'red',
                                        justifyContent: 'space-between',
                                        position: 'relative', top: -29
                                    }}>
                                        <Image style={{}} source={Rectangle} resizeMode="contain" />

                                        <TouchableOpacity
                                            // onPress={addHandler}
                                            style={{
                                                top: -9,
                                                left: 4,
                                                // backgroundColor: 'yellow'
                                            }}
                                        >
                                            <Image style={{ marginTop: 10 }} source={Plus} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>


                                </View>

                            </View>

                            {this.state.BtnNavigation == false ? (<>

                                {/* Starting Location  */}
                                <View style={{ borderBottomWidth: 2, borderBottomColor: 'lightgray', paddingBottom: 15, width: '100%', marginVertical: 20 }}>
                                    <HomeAndWork image={direction_home} title='Home' />
                                    <Line9 />
                                    <HomeAndWork image={direction_work} title='Work' />
                                </View>

                                {/* University of Pune  */}
                                <View style={{ paddingBottom: 10, width: '100%' }}>

                                    <University image={location} title='University of Pune' detail='024 Behind SB Road, Shivajinagar, Pune' />
                                    <Line9 />
                                    <University image={location} title='University of Pune' detail='024 Behind SB Road, Shivajinagar, Pune' />
                                    <Line9 />
                                    <University image={location} title='University of Pune' detail='024 Behind SB Road, Shivajinagar, Pune' />
                                    <Line9 />
                                    <University image={location} title='University of Pune' detail='024 Behind SB Road, Shivajinagar, Pune' />
                                    <Line9 />

                                </View>

                                <View>
                                    <Text style={{ fontSize: 12, color: '#6E80F3', fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 16, marginBottom: 5 }}>View more history</Text>
                                </View>

                            </>) : (<>

                                {/* Map  */}

                                <MapView
                                    // region={initialRegion}
                                    style={{
                                        width: windowWidth,
                                        height: windowHeight,
                                        alignSelf: 'center',
                                    }}
                                // onRegionChangeComplete = {onRegionChange}
                                // onRegionChange={onRegionChange}
                                // customMapStyle={isDarkMode ? mapStyleNight : []}
                                >

                                    {/* {renderMarker} */}
                                </MapView>
                            </>)
                            }
                        </View>

                    </ScrollView>

                    {/* Start Navigation */}
                    <View
                        style={[styles.rowTotal, {
                            // flexDirection: 'row',

                            justifyContent: 'space-between',
                            width: '100%',
                            position: 'absolute',
                            bottom: 20,
                        },]}>


                        <View style={[styles.col, { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 6, marginBottom: 10 }]}>
                            {
                                this.state.StartLocation.length != 1 && this.state.Destination.length != 1 ?
                                    <>
                                        <TouchableOpacity 
                                        // onPress={() => this.refRBSheet.current.open()}
                                        onPress={() => this.refRBSheet.current.open(this)}
                                        >
                                            <Image source={iButton} resizeMode="contain" />
                                        </TouchableOpacity>
                                        <Image source={locationButton} resizeMode="contain" />
                                    </>
                                    :
                                    null
                            }

                        </View>
                        <View style={[styles.col, { flexDirection: "row", width: '100%', paddingHorizontal: 30 }]}>
                            {
                                this.state.StartLocation.length != 1 && this.state.Destination.length != 1 ?

                                    <SmallButtons title="Start Navigation"
                                        buttonStyle={{
                                            width: '100%',
                                            borderRadius: 50, backgroundColor: '#6E80F3'
                                        }}
                                        btnTextStyle={{ color: '#fff', fontSize: 16, fontFamily: 'Open Sans' }}
                                        // onPress={this.buttonClickListener}
                                        onPress={() => this.setState({ BtnNavigation: this.state.BtnNavigation = true })}
                                    />
                                    :
                                    null
                            }

                        </View>
                    </View>

                    {/* <ActionSheet
          handleSelectedCrime={(crime) => handleSelectedCrime(crime)}
        //   {...props}
        //   AllCrimes={myArr}
        //   filteredCrimes={filteredCrimes}
        /> */}


                    <RBSheet
                        ref={this.refRBSheet}
                        height={windowHeight - 60}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            wrapper: {
                                // backgroundColor: "transparent",
                                backgroundColor: "#000",
                            },
                            draggableIcon: {
                                backgroundColor: "#53A9FF",
                                display: 'none',
                            },
                            container: {
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,

                            },

                        }}
                    >

                        <BottomSheet
                            onPressClose={() => this.refRBSheet.current.close()}
                        />
                    </RBSheet>


                </SafeAreaView>
            </>
        );
    }
}




const HomeAndWork = (props) => {
    const { image, title } = props;
    return (
        <>
            <View style={[styles.container, {
                flexDirection: 'row',
                marginHorizontal: 15,
                alignItems: 'center'
            }]}>

                <View style={{

                }}>
                    <Image
                        source={image}
                        resizeMode="contain"
                        style={styles.img}
                    />
                </View>
                <View style={{ marginLeft: 15, }}>
                    <Text style={{ fontSize: 18, color: '#222B45', fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 24, }}>{title}</Text>
                </View>
            </View>
        </>
    )
}


const University = (props) => {
    const { image, title, detail } = props;
    return (
        <>
            <View style={[styles.container, {
                flexDirection: 'row',
                marginHorizontal: 15,
                alignItems: 'center'
            }]}>

                <View style={{}}>
                    <Image
                        source={image}
                        resizeMode="contain"
                        style={styles.img}
                    />
                </View>
                <View style={{ marginLeft: 15, }}>
                    <Text style={{ fontSize: 18, color: '#222B45', fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 24, marginBottom: 5 }}>{title}</Text>
                    <Text style={{ fontSize: 15, color: '#ACB1C0', fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 20, }}>{detail}</Text>
                </View>
            </View>
        </>
    )
}

const Line9 = () => {
    return (
        <>
            <View style={{
                width: '80%',
                alignSelf: 'flex-end',
                marginTop: 10,
                marginBottom: 12
            }}>
                <Image
                    source={Line90}
                    resizeMode="contain"
                    style={styles.img}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainView: {
        // marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    },
    middleView: {
        width: '90%',
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4
    }
});


