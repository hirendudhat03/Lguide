import React, {Component, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

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
  Line100,
  Cancel,
  Mapview,
  blue_marker,
  circle_center,
  location_oval,
} from '../../assets';
import axios from 'axios';
import Geocoder from 'react-native-geocoder';
import {Loader, CustomToster} from '../../component';
import {SmallButtons} from '../../component/SmallButtons';
import MapView, {Polyline} from 'react-native-maps';
import {ActionSheet} from '../../component';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../../component/bottomSheet/BottomSheet';
import MapViewDirections from 'react-native-maps-directions';
import Coordinates from '../../utils/coordinates.json';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDWJ8cC97oQYX2itSwNl1tb8Dr4T7P3AI4';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Direction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StartLocation: 'Dollop Bakeshop, 1000 N Damen Ave, Chicago, IL 60622, United States', //Dollop Bakeshop, 1000 N Damen Ave, Chicago, IL 60622, United States
      Destination: 'Podhalanka, 1549 W Division St, Chicago, IL 60642, United States', //Podhalanka, 1549 W Division St, Chicago, IL 60642, United States
      StartLocationForApi: {},
      DestinationForApi: {},
      BtnNavigation: false,
      RBSheetHeight: 320,
      coordinatesData: [],
      areaName: [],
      isLoading: false,
      sItem: false,
    };
    this.refRBSheet = null;
  }

  fetchLonAndLat = (data) => {
    console.log(
      'this.state.coordinatesData : ',
      this.state.coordinatesData.polylines,
    );

    var colors = ['#FF0000', '#00FFAC', '#800080'];
    return this.state.coordinatesData.polylines.map((item, zIndex) => {
      var clone = [];
      var lastIndex;
      item.map((data, index) => {
        clone.push({latitude: data[0], longitude: data[1]});
        lastIndex = index;
      });

      console.log('clone[0] : ', clone[0]);
      console.log('clone[lastIndex] : ', clone[lastIndex]);
      return (
        <TouchableOpacity onPress={() => alert('ok')}>
          <MapView.Polygon
            coordinates={clone}
            // strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColor={colors[zIndex]}
            strokeWidth={3}
            tappable={true}
            onPress={() => alert('onPress Polygon')}
          />
          <MapView.Marker coordinate={clone[0]}>
            <Image
              source={circle_center}
              style={{height: 25, width: 25, zIndex: 10}}
            />
          </MapView.Marker>
          <MapView.Marker coordinate={clone[lastIndex]}>
            <Image
              source={location_oval}
              style={{height: 25, width: 25, zIndex: 10}}
            />
          </MapView.Marker>
        </TouchableOpacity>
      );
    });

    //this.setState({coordinates: clone});
  };

  fetchMarker = (data) => {
    console.log(
      'this.state.coordinatesData : ',
      this.state.coordinatesData,
    );

    console.log('fetchMarker=====================');

    console.log(
      'this.state.coordinatesData.near_points : ',
      this.state.coordinatesData.near_points,
    );

    this.state.coordinatesData.near_points.map((item, zIndex) => {
      console.log('item.geometry : ', {
        latitude: item.geometry.coordinates[0],
        longitude: item.geometry.coordinates[1],
      });

      return (
        <MapView.Marker
          coordinate={{
            latitude: item.geometry.coordinates[0],
            longitude: item.geometry.coordinates[1],
          }}>
          <Image
            source={location_oval}
            style={{height: 25, width: 25, zIndex: 10}}
          />
        </MapView.Marker>
      );
    });

    //this.setState({coordinates: clone});
  };

  fetchAddLatLog = (value) => {
    //var area = 'Rajkot';
    console.log('fetchAddLatLog : ', value);

    if (value != '') {
      console.log('axios : ', value);
      axios({
        url:
          'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
          value +
          '&key=AIzaSyDWJ8cC97oQYX2itSwNl1tb8Dr4T7P3AI4&sessiontoken=1234567890',
        method: 'get',
      })
        .then((res) => {
          console.log('axios : ', value);
          if (res.status === 200) {
            console.log('res : ', res.data.predictions);
            this.setState({areaName: res.data.predictions});
          } else {
            console.log('reselse : ', res);
            // dispatch({
            //   type: GET_FIR_CRIME.FAILURE,
            // });
          }
        })
        .catch((err) => {
          console.log(err);
          // dispatch({
          //   type: GET_FIR_CRIME.FAILURE,
          // });
        });
    } else {
      this.setState({areaName: []});
    }
  };

  startNavigation = () => {
    this.setState({isLoading: true});

    console.log(
      'http://13.58.172.146:5000/points?from_lat=' +
        this.state.StartLocationForApi.lat +
        '&to_lat=' +
        this.state.DestinationForApi.lat +
        '&from_lng=' +
        this.state.StartLocationForApi.lng +
        '&to_lng=' +
        this.state.DestinationForApi.lng,
    );
    axios({
      url:
        'http://13.58.172.146:5000/points?from_lat=' +
        this.state.StartLocationForApi.lat +
        '&to_lat=' +
        this.state.DestinationForApi.lat +
        '&from_lng=' +
        this.state.StartLocationForApi.lng +
        '&to_lng=' +
        this.state.DestinationForApi.lng,
      method: 'get',
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('res.data.polylines : ', res.data.polylines);
          this.setState({isLoading: false});
          this.setState({coordinatesData: res.data});
          //this.fetchLonAndLat(res.data)
          this.setState({
            BtnNavigation: (this.state.BtnNavigation = true),
          });
        } else {
          console.log('reselse : ', res);
          this.setState({isLoading: false});
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({isLoading: false});
        // dispatch({
        //   type: GET_FIR_CRIME.FAILURE,
        // });
      });
  };

  componentDidMount = () => {
    console.log('componentDidMount');
  };

  selectItem = (value, name) => {
    // this.fetchAddLatLog(name);
    this.setState({areaName: []});

    Geocoder.geocodeAddress(name).then((res) => {
      console.log('res123_ : ', res[0].position);
    });

    if (value == true) {
      console.log('ifpart : ', value, ' || ', name);
      Geocoder.geocodeAddress(name).then((res) => {
        console.log('res123_ : ', res[0].position);
        this.setState({StartLocationForApi: res[0].position});
      });
      this.setState({StartLocation: name});
    } else {
      console.log('elsepart : ', value, ' || ', name);
      Geocoder.geocodeAddress(name).then((res) => {
        console.log('res123_ : ', res[0].position);
        this.setState({DestinationForApi: res[0].position});
      });
      this.setState({Destination: name});
    }
  };

  buttonClickListener = (value, bvalue) => {
    this.setState({sItem: bvalue});

    if (bvalue == true) {
      console.log('ifpart : ', value, ' || ', value);
      this.setState({StartLocation: value});
    } else {
      console.log('elsepart : ', value, ' || ', value);
      this.setState({Destination: value});
    }

    this.fetchAddLatLog(value);
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.mainView}>
              {/* Input Section  */}
              <View
                style={[
                  styles.boxWithShadow,
                  {
                    flexDirection: 'row',
                    paddingTop: 15,
                    // paddingBottom: 5,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    // backgroundColor: 'lightgray',
                    width: '100%',
                    paddingLeft: 20,
                  },
                ]}>
                <View style={{width: '85%'}}>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'lightgray',
                        marginLeft: '10%',
                      }}
                      value={this.state.StartLocation}
                      placeholder="Starting Location"
                      // onChangeText={(text) => setValue({ ...value, StartLocation: text })}
                      onChangeText={(value) =>
                        this.buttonClickListener(value, true)
                      }
                      underlineColorAndroid="transparent"
                    />
                    <View
                      style={{
                        width: 50,
                        marginLeft: -37,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({StartLocation: ''});
                          this.setState({BtnNavigation: false});
                        }}
                        style={{
                          top: -9,
                          left: 4,
                          // backgroundColor: 'yellow'
                        }}>
                        <Image
                          style={{marginTop: 10, height: 13, width: 13}}
                          source={Cancel}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      width: '109%',
                      // backgroundColor: 'red',
                      justifyContent: 'space-between',
                      position: 'relative',
                      top: -29,
                    }}>
                    <Image style={{}} source={Rectangle} resizeMode="contain" />

                    <TouchableOpacity
                      onPress={() => this.setState({Destination : ''})}
                      style={{
                        top: -9,
                        left: 4,
                        // backgroundColor: 'yellow'
                      }}>
                      <Image
                        style={{marginTop: 10}}
                        source={Plus}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View> */}

                  {/* Destionation Add  */}

                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '10%'}}>
                      <Image
                        style={{position: 'relative', top: '-75%'}}
                        source={addNewLocation}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={{width: '90%'}}
                      placeholder="Enter Destionation"
                      underlineColorAndroid="#E4E9F2"
                      value={this.state.Destination}
                      onChangeText={(value) =>
                        this.buttonClickListener(value, false)
                      }
                      underlineColorAndroid="transparent"
                    />
                    <Image
                      style={{marginTop: 10, marginRight: 10}}
                      source={LineVerticle}
                      resizeMode="contain"
                    />

                    {/* <TouchableOpacity onPress={() => deleteHandler(key)}>
                              <Image style={{ marginTop: 10, marginLeft: 5, }} source={minus} resizeMode="contain" />
                            </TouchableOpacity> */}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '109%',
                      // backgroundColor: 'red',
                      justifyContent: 'space-between',
                      position: 'relative',
                      top: -29,
                    }}>
                    <Image style={{}} source={Rectangle} resizeMode="contain" />

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({Destination: ''});
                        this.setState({BtnNavigation: false});
                      }}
                      style={{
                        top: -9,
                        left: 4,
                        // backgroundColor: 'yellow'
                      }}>
                      <Image
                        style={{marginTop: 10, height: 13, width: 13}}
                        source={Cancel}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {this.state.BtnNavigation == false ? (
                <>
                  {/* Starting Location  */}
                  {/* <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: 'lightgray',
                      paddingBottom: 15,
                      width: '100%',
                      marginVertical: 20,
                    }}>
                    <HomeAndWork image={direction_home} title="Home" />
                    <Line9 />
                    <HomeAndWork image={direction_work} title="Work" />
                  </View> */}

                  {/* University of Pune  */}
                  <View style={{paddingVertical: 10, width: '100%'}}>
                    {this.state.areaName == [] ? null : (
                      <FlatList
                        data={this.state.areaName}
                        renderItem={(item) => (
                          <>
                            {console.log('item : ', item)}
                            <University
                              image={location}
                              title={item.item.description}
                              detail={
                                item.item.structured_formatting.secondary_text
                              }
                              onPress={() =>
                                //console.log('onPress : ',item.item),
                                this.selectItem(
                                  this.state.sItem,
                                  item.item.description,
                                )
                              }
                            />
                            <Line9 />
                          </>
                        )}
                      />
                    )}
                  </View>

                  {/* <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#6E80F3',
                        fontFamily: 'Open Sans',
                        fontWeight: '400',
                        lineHeight: 16,
                        marginBottom: 5,
                      }}>
                      View more history
                    </Text>
                  </View> */}
                </>
              ) : (
                <>
                  {/* Map  */}
                  {this.state.StartLocation.length != 0 &&
                  this.state.Destination.length != 0 ? (
                    <MapView
                      region={{
                        latitude: this.state.StartLocationForApi.lat,
                        longitude: this.state.StartLocationForApi.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      style={{
                        width: windowWidth,
                        height: windowHeight,
                        alignSelf: 'center',
                      }}>
                      {this.fetchLonAndLat()}
                      {this.fetchMarker()}

                      {/* <MapViewDirections
                      origin={this.state.coordinates[0]}
                      destination={this.state.coordinates[1]}
                      apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
                      strokeWidth={3}
                      strokeColor="#7F0000"
                    /> */}
                    </MapView>
                  ) : null}
                </>
              )}
            </View>
          </ScrollView>

          {/* Start Navigation */}
          <View
            style={[
              styles.rowTotal,
              {
                // flexDirection: 'row',

                justifyContent: 'space-between',
                width: '100%',
                position: 'absolute',
                bottom: 20,
              },
            ]}>
            <View
              style={[
                styles.col,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 6,
                  marginBottom: 10,
                },
              ]}>
              {this.state.StartLocation.length != 0 &&
              this.state.Destination.length != 0 ? (
                <>
                  <TouchableOpacity
                    // onPress={() => this.refRBSheet.current.open()}
                    onPress={() => {
                      if (this.refRBSheet) {
                        this.refRBSheet.open();
                        // this.refRBSheet.current.open(this)
                        // console.log("refRBSheet==", this.refRBSheet)
                      }
                    }}>
                    <Image source={iButton} resizeMode="contain" />
                  </TouchableOpacity>
                  <Image source={locationButton} resizeMode="contain" />
                </>
              ) : null}
            </View>
            <View
              style={[
                styles.col,
                {flexDirection: 'row', width: '100%', paddingHorizontal: 30},
              ]}>
              {this.state.StartLocation.length != 0 &&
              this.state.Destination.length != 0 && this.state.BtnNavigation == false? (
                <SmallButtons
                  title="Start Navigation"
                  buttonStyle={{
                    width: '100%',
                    borderRadius: 50,
                    backgroundColor: '#6E80F3',
                    zIndex: 1111,
                  }}
                  btnTextStyle={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'Open Sans',
                  }}
                  // onPress={this.buttonClickListener}
                  onPress={() => this.startNavigation()}
                />
              ) : null}

              {this.state.isLoading ? (
                <Loader loading={this.state.isLoading} />
              ) : null}
            </View>
          </View>

          {/* <ActionSheet
          handleSelectedCrime={(crime) => handleSelectedCrime(crime)}
        //   {...props}
        //   AllCrimes={myArr}
        //   filteredCrimes={filteredCrimes}
        /> */}

          <RBSheet
            ref={(ref) => (this.refRBSheet = ref)}
            // height={windowHeight - 60}

            // height={this.state.RBSheetHeight}
            closeOnDragDown={true}
            openDuration={550}
            animationType="slide"
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                // backgroundColor: "transparent",
                // backgroundColor: "#000",
                // marginBottom: 70,
              },
              draggableIcon: {
                backgroundColor: '#9DB3F4',
                // display: 'none',
              },
              container: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                height: this.state.RBSheetHeight,
              },
            }}>
            <BottomSheet
              onPressClose={() => {
                if (this.refRBSheet) {
                  this.refRBSheet.current.close();
                }
              }}
              onOpenCrime={() => {
                // alert("test")
                this.setState({RBSheetHeight: 600});
              }}
            />

            {/* <BSCrimeRoute /> */}
          </RBSheet>
        </SafeAreaView>
      </>
    );
  }
}

const HomeAndWork = (props) => {
  const {image, title} = props;
  return (
    <>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            marginHorizontal: 15,
            alignItems: 'center',
          },
        ]}>
        <View style={{}}>
          <Image source={image} resizeMode="contain" style={styles.img} />
        </View>
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontSize: 18,
              color: '#222B45',
              fontFamily: 'Open Sans',
              fontWeight: '400',
              lineHeight: 24,
            }}>
            {title}
          </Text>
        </View>
      </View>
    </>
  );
};

const University = (props) => {
  const {image, title, detail, onPress} = props;
  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            flexDirection: 'row',
            marginHorizontal: 15,
            alignItems: 'center',
          },
        ]}
        onPress={onPress}>
        <View style={{}}>
          <Image source={image} resizeMode="contain" style={styles.img} />
        </View>
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontSize: 18,
              color: '#222B45',
              fontFamily: 'Open Sans',
              fontWeight: '400',
              lineHeight: 24,
              marginBottom: 5,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#ACB1C0',
              fontFamily: 'Open Sans',
              fontWeight: '400',
              lineHeight: 20,
            }}>
            {detail}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const Line9 = () => {
  return (
    <>
      <View
        style={{
          width: '80%',
          alignSelf: 'flex-end',
          marginTop: 10,
          marginBottom: 12,
        }}>
        <Image source={Line90} resizeMode="contain" style={styles.img} />
      </View>
    </>
  );
};

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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
});
