import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInputBase,
  StatusBar,
  Platform,
} from 'react-native';
import {Colors, FontSize} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Textarea} from 'native-base';
import {
  CustomButton,
  Datepicker,
  InputLabel,
  Picker,
  TextInputBox,
  ListAccordion,
  ModalComponent,
} from '../../component';
import {Switch} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import MapView from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {addCrime} from '../../Redux/Action/crime.action';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDWJ8cC97oQYX2itSwNl1tb8Dr4T7P3AI4';

const AddNewReport = (props) => {
  const [selectCrimeType, setSelectCrimeType] = useState('Select crime type');
  const [myLocation, setMyLocation] = useState({});
  const [placeName, setPlaceName] = useState('Enter crime location');
  const [tags, setTags] = useState('');
  const [crimeDate, setCrimeDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [crimeOption, setCrimeOption] = useState([]);
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

  let crimesState = useSelector((state) => {
    return state.crimes;
  });

  let commonState = useSelector((state) => {
    return state.Common;
  });

  useEffect(() => {
    props.navigation.addListener('focus', (val) => {
      console.log('active screen', props.route);
      locationHandler();
      setCrimeOption(crimesState.AllCrimeTypeDropdown);
    });
  }, [commonState]);

  const locationHandler = () => {
    console.log('commonState', commonState);
    const {currentLocation, selectedLocation} = commonState;
    console.log(Object.keys(selectedLocation).length > 0);
    if (Object.keys(selectedLocation).length !== 0) {
      console.log('IF');
      let Obj = {
        latitude: selectedLocation.geometry.location.lat,
        longitude: selectedLocation.geometry.location.lng,
      };
      setMyLocation(Obj);
      setPlaceName(selectedLocation.formatted_address);
    } else {
      console.log('ELSE');
      let Obj = {
        latitude: Number(currentLocation.currentLatitude),
        longitude: Number(currentLocation.currentLongitude),
      };
      // latitude, longitude
      setMyLocation(Obj);
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      storageOptions: {
        skipBackup: true,
        path: null,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  const dropDownHandler = (crime) => {
    setSelectCrimeType(crime);
  };

  const validation = () => {
    let IsValid = true;

    if (!tags) {
      IsValid = false;
      // errors["firstName"] = "*please enter first name";
    }

    if (Object.keys(myLocation).length === 0) {
      IsValid = false;
      // errors["firstName"] = "*please enter first name";
    }

    if (selectCrimeType == undefined) {
      IsValid = false;
      // errors["firstName"] = "*please enter first name";
    }

    return IsValid;
  };

  const submitHandler = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('guestUser'));
    console.log('anonymous', anonymous);

    try {
      if (validation()) {
        let Obj = {
          user_id: user.user_id,
          sub_type: selectCrimeType,
          lat: myLocation.latitude,
          lng: myLocation.longitude,
          date: moment(crimeDate).format('DD-MM-YYYY'),
          time: '23-53-00',
          tags: tags,
          anonymous: anonymous,
        };
        let data = await dispatch(addCrime(Obj));
        console.log('___data', data);
        const {apiStatus, res} = data;
        if (apiStatus === true) {
          if (res.status == 201 || 200) {
            Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM);
          }
        } else {
          Toast.show('crime not added', Toast.LONG, Toast.BOTTOM);
        }
      } else {
        Toast.show('some field is missing', Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const datePickerHandler = (date) => {
    console.log('DATE >>>', date);
    if (Platform.OS === 'android') {
      if (date.type == 'set') {
        console.log(
          'EVENT-1 >>>>>>',
          moment(date.nativeEvent.timestamp).format('DD-MM-YYYY'),
        );
        console.log('EVENT-2 >>>>>>', new Date(date.nativeEvent.timestamp));
        let newDate = new Date(date.nativeEvent.timestamp);
        setCrimeDate(newDate);
        setShowDatePicker(false);
      } else {
        setShowDatePicker(false);
      }
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const changeMarkerHandler = (val) => {
    console.log('vavava', val);
    let Obj = {
      latitude: Number(val.latitude),
      longitude: Number(val.longitude),
    };
    // latitude, longitude
    setMyLocation(Obj);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const expandHandler = (val) => {
    // console.log('index',val);

    let tempArr = crimeOption;
    crimeOption[val].isExpanded = !crimeOption[val].isExpanded;
    console.log(tempArr);
    setCounter(counter + 1);
    setCrimeOption(crimeOption);
  };

  console.log('CALL COMPONENT');
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>

          <View
              style={[
                styles.middleView,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                },
              ]}>
              <View>
                <Text>Report this crime as Anonymous</Text>
              </View>
              <View>
                <Switch
                  value={anonymous}
                  color={Colors.app_theme_color}
                  onValueChange={() => setAnonymous(!anonymous)}
                />
              </View>
            </View> 


            <View style={[styles.middleView]}>
              <InputLabel lableName={'Crime Type'} icon={'*'} />
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.boxs]}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: FontSize.Regular + 0.5,
                      width: '90%',
                    }}>
                    {selectCrimeType}
                  </Text>
                </View>
              </TouchableOpacity>
              <ModalComponent
                closeModal={closeModal}
                modalVisible={modalVisible}>
                <ListAccordion
                  expandHandler={(val) => expandHandler(val)}
                  AllCrimeType={crimeOption}
                  handleSelect={(vals) => {
                    dropDownHandler(vals);
                    closeModal();
                  }}
                />
              </ModalComponent>
            </View>
            <View style={[styles.middleView, {marginTop: 20}]}>
              <InputLabel lableName={'Add Tags'} />
              <TextInputBox
                value={tags}
                onChangeText={(val) => setTags(val)}
                placeholder="Type and add multiple tags"
              />
            </View>
            <View style={[styles.middleView, {marginTop: 20}]}>
              <InputLabel lableName={'Location'} icon={'*'} />
              <TouchableOpacity
                // style={{
                //   // backgroundColor: 'red',
                //   width: '100%',
                //   height: hp('7%'),
                // }}
                onPress={() =>
                  props.navigation.navigate('LocationAutoComplete')
                }>
                <View style={[styles.boxs]}>
                  <Icon
                    type="Entypo"
                    name="direction"
                    style={{
                      fontSize: FontSize.Regular + 5,
                      display: 'flex',
                      color: 'gray',
                      // backgroundColor : 'red'
                    }}
                  />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: FontSize.Regular + 0.5,
                      width: '90%',
                    }}>
                    {placeName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.middleView,
                styles.container1,
                {height: hp('60.00%'), borderRadius: 5},
              ]}>
              <MapView
                style={styles.map}
                // onRegionChange = {(e) => console.log(e)}
                region={{
                  latitude: myLocation.latitude,
                  longitude: myLocation.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}>
                <MapView.Marker
                  draggable
                  coordinate={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                  }}
                  onDragEnd={(e) =>
                    // console.log('Marker', e.nativeEvent.coordinate)
                    changeMarkerHandler(e.nativeEvent.coordinate)
                  }
                  title="My Location"
                  description="Here i am."
                />
              </MapView>
            </View>
            <View style={[styles.middleView, {marginTop: 20}]}>
              <InputLabel lableName={'Date of Crime'} />
              <Datepicker
                openDatePicker={() => openDatePicker()}
                showDatePicker={showDatePicker}
                datePickerHandler={(val) => datePickerHandler(val)}
                crimeDate={crimeDate}
                pickerTitle={moment(crimeDate).format('DD-MM-YYYY')}
              />
            </View>
            <View style={[styles.middleView]}>
              <TouchableOpacity
                style={styles.cameraView}
                onPress={handleChoosePhoto}>
                <View>
                  <Icon
                    type="FontAwesome"
                    name="camera"
                    style={{color: Colors.app_theme_color}}
                  />
                </View>
                <View style={{paddingLeft: 10}}>
                  <Text style={{color: Colors.app_theme_color, fontSize: 18}}>
                    Add a photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.middleView, {marginTop: 20}]}>
              <InputLabel lableName={'Add your notes'} />
              <Textarea
                placeholder="Type your note here.."
                placeholderTextColor="gray"
                style={{borderWidth: 0.5, borderRadius: 5}}
                rowSpan={5}
              />
            </View>
            
            <View style={[styles.middleView, {marginTop: 35}]}>
              <CustomButton btnTitle="Add Report" btnHandler={submitHandler} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  middleView: {
    width: '90%',
  },
  cameraView: {
    marginTop: 20,
    borderWidth: 0.5,
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
});

export default AddNewReport;
