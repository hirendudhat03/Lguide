import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector, useDispatch} from 'react-redux';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDWJ8cC97oQYX2itSwNl1tb8Dr4T7P3AI4';
const LocationAutoComplete = (props) => {
  const dispatch = useDispatch();

   

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(details);
          dispatch({
            type : 'SELECTED_LOCATION',
            payload : details
          })
          props.navigation.navigate('AddReport')
        }}
        onFail={(error) => console.log('google api', error)}
        query={{
          key: 'AIzaSyDWJ8cC97oQYX2itSwNl1tb8Dr4T7P3AI4',
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
            textInputContainer: {
            //   backgroundColor: 'grey',
              width : '95%',
              alignSelf : 'center',
              borderWidth : 1,
              borderRadius : 10
            },
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
              borderRadius : 10
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            container: {
                flex: 1,
                marginTop : 20,
                // backgroundColor : 'red'
              },
          }}
      />
    </View>
  );
};

export default LocationAutoComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position : 'absolute',
    // backgroundColor: '#ccc',
  },
});
