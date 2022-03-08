import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  Image, Alert
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NotificationHeader, NotificationList } from '../../component';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'

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
  addNewLocation
} from '../../assets';
import { SmallButtons } from '../../component/SmallButtons';




const Direction = (props) => {

  // let commonState = useSelector((state) => {
  //   return state.Common;
  // });

  useEffect(() => {
    getValueFromAsyncStorage()
  }, [])

  const getValueFromAsyncStorage = async () => {
    let user = await AsyncStorage.getItem('guestUser');
    console.log('user', user);
  }

  // console.log('commonState in notification', commonState.notificationArr);


  // DynamicInput Start
  const [inputs, setInputs] = useState([{ key: '', value: '' }]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: '', value: '' });
    setInputs(_inputs);
  }

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  }

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);

  }

  // DynamicInput End


  // Hide/Show Submit Button 


  const [value, setValue] = useState({
    StartLocation: '',
    Destination: ''
  })

  // const onPress = () => {
  //   rn.Alert.alert(JSON.stringify(value))
  //   setValue({
  //     StartLocation: '',
  //     Destination: ''
  //   })
  // }


  buttonClickListener = () => {
    const { StartLocation, Destination } = props;

    // Alert.alert(StartLocation);
    Alert.alert(StartLocation + Destination);
    console.log('StartLocation==', StartLocation)
    // let StartLocationLength = state.StartLocation.length+1
    // console.log('StartLocationLength==', StartLocationLength)
  }

  onChangeText = () => {
    const { StartLocation, Destination } = prop;
    Alert.alert(StartLocation + Destination);
  } 


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
                  onChangeText={StartLocation => buttonClickListener(setValue({ StartLocation }))}
                  underlineColorAndroid="transparent"
                />

                {/* Destionation Add  */}

                {inputs.map((input, key) => (

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
                      // onChangeText={Destination => setValue({ Destination })}
                      // onChangeText={(text) => setValue({ ...value, Destination: text })}
                      onChangeText={Destination => buttonClickListener(setValue({ Destination })) }
                      // Making the Under line Transparent.
                      underlineColorAndroid="transparent"
                    />
                    <Image style={{ marginTop: 10, marginRight: 10 }} source={LineVerticle} resizeMode="contain" />

                    {/* <TouchableOpacity onPress={() => deleteHandler(key)}>
                      <Image style={{ marginTop: 10, marginLeft: 5, }} source={minus} resizeMode="contain" />
                    </TouchableOpacity> */}

                  </View>

                ))}

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



          </View>

        </ScrollView>

        {/* Start Navigation */}
        <View
          style={[styles.rowTotal, {
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            width: '100%',
            position: 'absolute',
            bottom: 20,
          },]}>


          <View style={[styles.col, { flexDirection: "row", width: '100%' }]}>


            <SmallButtons title="Start Navigation"
              buttonStyle={{ width: '100%', paddingHorizontal: 20, borderRadius: 50, backgroundColor: '#6E80F3' }}
              btnTextStyle={{ color: '#fff', fontSize: 16, fontFamily: 'Open Sans' }}
              // onPress={() => refRBSheet.current.open()}

              // onPress={onPress} 
            />

          </View>
        </View>



      </SafeAreaView>
    </>
  );
};




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
    marginBottom: 40,
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

export default Direction;
