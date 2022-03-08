import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StatusBar, StyleSheet, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FilterHeader,
  FilterTitles,
  FilterButtons,
  CustomButton,  
} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {Colors, FontSize} from '../../constant';

import {Icon} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {slider, min_track, max_track} from '../../assets';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

let selectedSubCat = []
const Filters = (props) => {
  const handleClose = () => {
    props.navigation.navigate('Home');
  };

  const [selectedCrimeIndex, setSelectedCrimeIndex] = useState(0);
  const [selectedSubCategoriesIndex, setSelectedSubCategoriesIndex] = useState(
    0,
  );
  const [selectedCeime, setSelectedCeime] = useState('');
  const [sliderVal, setSliderVal] = useState(0);
  const [subCategories, setSubCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [rangeDate, setRangeDate] = useState(new Date());
  const [rangeTime, setRangeTime] = useState(new Date());

  let crimesState = useSelector((state) => {
    return state.crimes;
  });

  useEffect(() => {
    console.log('crimesState.AllCrimeTypes',crimesState.AllCrimeTypes);
    let AllCrimeTypes = Object.entries(crimesState.AllCrimeTypes);
    console.log('AllCrimeTypes',AllCrimeTypes);
    let selectedSubCat = AllCrimeTypes[selectedCrimeIndex];
    manageSubCategories(selectedSubCat);
  }, []);

  const selectCrime = (index) => {
    
    setSelectedCrimeIndex(index);
    let AllCrimeTypes = Object.entries(crimesState.AllCrimeTypes);
    let selectedSubCat = AllCrimeTypes[index];
    manageSubCategories(selectedSubCat);
  };

  const manageSubCategories = (selectedSubCat) => {
    
    setSelectedCeime(selectedSubCat[0])
    const { sub_types } = selectedSubCat[1]    
    if (sub_types.length > 0) {
      
      let tempArr = sub_types.map((sub_crime, index) => {
        let Obj = {
          title: sub_crime.sub_type,
          color : sub_crime.color_code,
          isSelected: false,
          crimeType: selectedSubCat[0],
        };
        // let
        return Obj;
        // setNewSubCrime(Obj)
      });
      // console.log('tempArr', tempArr);
      setSubCategories(tempArr);
    }
  };

  const renderCrime = () => {
    let AllCrimeTypes = Object.entries(crimesState.AllCrimeTypes);
    if (AllCrimeTypes.length > 0) {
      return AllCrimeTypes.map((item, index) => {
        // console.log('tempArr',tempArr);
        // setNewSubCrime(tempArr)
        var crimeTypeLabel;
        if (item[0].includes('_') === true) {
          let removeUnderscore = `${item[0].replace(/_/g, ' ')}`;
          var matches = removeUnderscore.match(/\b(\w)/g); // ['J','S','O','N']
          crimeTypeLabel = matches.join('').toUpperCase(); // JSON
        } else if (item[0].includes('/') === true) {
          let removeUnderscore = `${item[0].replace(/\//g, ' ')}`;
          var matches = removeUnderscore.match(/\b(\w)/g); // ['J','S','O','N']
          crimeTypeLabel = matches.join('/').toUpperCase(); // JSON
        } else {
          crimeTypeLabel = item[0];
        }

        return (
          
            <View style={styles.btnWidth} key={index}>
              <FilterButtons
                btnHandler={() => selectCrime(index)}
                btnTitle={crimeTypeLabel}
                btnStyle={selectedCrimeIndex !== index && styles.btn1}
                txtStyle={selectedCrimeIndex !== index && styles.txt}
              />
            </View>
          
        );
      });
    }
  };

  const selectSubCategories = (index, item) => {
    
    subCategories[index].isSelected = !subCategories[index].isSelected;
    setSubCategories(subCategories);
    setSelectedSubCategoriesIndex(index);
  };

  const renderSubCategories = () => {
    // console.log('subCategories',subCategories);
    if (subCategories.length > 0) {
      // console.log('subCategories',subCategories);
      selectedSubCat = []
      return subCategories.map((item, index) => {
        // console.log('subCategories List >>> ', item);
        var subCategoriesTitle;
        if (item.title.includes('_') === true) {
          let removeUnderscore = `${item.title.replace(/_/g, ' ')}`;
          var matches = removeUnderscore.match(/\b(\w)/g); // ['J','S','O','N']
          subCategoriesTitle = matches.join('').toUpperCase(); // JSON
        } else if (item.title.includes('/') === true) {
          let removeUnderscore = `${item.title.replace(/\//g, ' ')}`;
          var matches = removeUnderscore.match(/\b(\w)/g); // ['J','S','O','N']
          subCategoriesTitle = matches.join('/').toUpperCase(); // JSON
        } else {
          subCategoriesTitle = item.title;
        }

        if (item.isSelected) {          
          selectedSubCat.push(item)
        }

        return (
          <>
            <View style={styles.btnWidth} key={index}>
              <FilterButtons
                btnHandler={() => selectSubCategories(index, item)}
                btnTitle={subCategoriesTitle}
                btnStyle={!item.isSelected && styles.btn1}
                txtStyle={!item.isSelected && styles.txt}
                // btnStyle={styles.btn1}
                // txtStyle={ styles.txt}
              />
            </View>
          </>
        );
      });
      
    }
  };

  const handleDate = (event, selectedDate) => {
    console.log('selectedDate', selectedDate);
    setRangeDate(new Date(selectedDate));
    setShowDatePicker(false);
  };

  const handleTime = (event, selectedDate) => {
    setRangeTime(new Date(selectedDate));
    setShowTimePicker(false);
  };

  const handleFilter = () => {        
    let filterVal = {
      crime : selectedCeime,
      subCrime : selectedSubCat,
      rangeDate : rangeDate,
      rangeTime : moment(rangeTime).format('hh:mm'),
      sliderVal : sliderVal
    }
    
    props.navigation.navigate('Home',{filterVal})
  }

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <FilterHeader
          fname={'Reset'}
          middleName={'Filters'}
          iconName={'x'}
          handleClose={handleClose}
        />
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.middleView}></View>
            <View style={{width: '100%', marginTop: 25}}>
              <FilterTitles titleHeader={'Crimes'} />
            </View>
            <View style={styles.btnView}>{renderCrime()}</View>
            <View style={{width: '100%', marginTop: 25}}>
              <FilterTitles titleHeader={'Sub-categories'} />
            </View>
            <View style={styles.btnView}>{renderSubCategories()}</View>

            <View style={{width: '100%', marginTop: 25}}>
              <FilterTitles titleHeader={'Date'} />
            </View>
            <View style={[styles.middleView, {marginTop: 15}]}>
              {/* <Datepicker
                pickerTitle={'Select Date Range'}
                pickerStyle={styles.pickerView}
              /> */}
              <TouchableOpacity
                style={styles.dateTimeLayout}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateTimeTxt}>Select Date Range</Text>
                <Icon
                  type="FontAwesome"
                  name="calendar"
                  style={styles.dateTimeIcon}
                />
              </TouchableOpacity>
              {/* <DateTimePicker
          isVisible={showDatePicker}
          onConfirm={(date) => handleDate(date)}
          mode= 'date'
          onCancel={() => hideDateTimePicker()}
        /> */}
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={rangeDate}
                  mode={'date'}
                  // is24Hour={true}
                  display="default"
                  onChange={handleDate}
                />
              )}
            </View>
            <View style={[styles.btnView, {justifyContent: 'space-between'}]}>
              <View style={{width: '32%'}}>
                <FilterButtons btnTitle={'Yesterday'} btnStyle={styles.btn} />
              </View>
              <View style={{width: '32%'}}>
                <FilterButtons
                  btnTitle={'Weekly'}
                  btnStyle={styles.btn1}
                  txtStyle={styles.txt}
                />
              </View>
              <View style={{width: '32%'}}>
                <FilterButtons
                  btnTitle={'Monthly'}
                  btnStyle={styles.btn1}
                  txtStyle={styles.txt}
                />
              </View>
            </View>
            <View style={{width: '100%', marginTop: 25}}>
              <FilterTitles titleHeader={'Time'} />
            </View>
            <View style={[styles.middleView, {marginTop: 15}]}>
              <TouchableOpacity
                style={styles.dateTimeLayout}
                onPress={() => setShowTimePicker(!showTimePicker)}>
                <Text style={styles.dateTimeTxt}>Select Time Range</Text>
                <Icon
                  type="FontAwesome"
                  name="calendar"
                  style={styles.dateTimeIcon}
                />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={rangeTime}
                  mode={'time'}
                  // is24Hour={true}
                  display="default"
                  onChange={handleTime}
                />
              )}
            </View>
            <View style={[styles.btnView, {justifyContent: 'space-between'}]}>
              <View style={{width: '32%'}}>
                <FilterButtons
                  btnTitle={'12:00 to 03:00'}
                  btnStyle={styles.btn1}
                  txtStyle={styles.txt}
                />
              </View>
              <View style={{width: '32%'}}>
                <FilterButtons
                  btnTitle={'03:00 to 06:00'}
                  btnStyle={styles.btn}
                />
              </View>
              <View style={{width: '32%'}}>
                <FilterButtons
                  btnTitle={'06:00 to 09:00'}
                  btnStyle={styles.btn1}
                  txtStyle={styles.txt}
                />
              </View>
            </View>
            <View style={{width: '100%', marginTop: 25}}>
              <FilterTitles titleHeader={'Area range (in Km)'} />
            </View>
            <View style={[styles.middleView, {marginTop: 15}]}>
              <Text>Slider</Text>
            </View>
            <Slider
              style={{width: 300, height: 40}}
              minimumValue={1}
              maximumValue={100}
              value = {sliderVal}
              minimumTrackTintColor="gray"
              maximumTrackTintColor="#000000"
              thumbTintColor="blue"
              // minimumTrackImage={require('../../assets/images/min_track.png')}
              // maximumTrackImage={'../../assets/images/max_track.png'}
              // trackImage={require('../../assets/images/max_track.png')}
              onValueChange = {(val) => setSliderVal(val)}
            />
            <View style={[styles.middleView, {marginTop: 30}]}>
              <CustomButton
                btnTitle={'Apply'}
                // btnHandler={() => props.navigation.navigate('Notification')}
                btnHandler = {handleFilter}
              />
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
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  middleView: {
    width: '90%',
  },
  btnView: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // backgroundColor : 'yellow',
    width: '90%',
  },
  btnWidth: {
    width: '30%',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  btn1: {
    borderWidth: 0.5,
    borderColor: Colors.txtColor,
    elevation: 0,
    backgroundColor: null,
  },
  txt: {
    color: Colors.txtColor,
  },
  pickerView: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  dateTimeLayout: {
    // backgroundColor : 'yellow',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('7%'),
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark_grey,
  },
  dateTimeIcon: {
    color: Colors.secondaryColor,
  },
  dateTimeTxt: {
    color: Colors.txtColor,
  },
});

export default Filters;
