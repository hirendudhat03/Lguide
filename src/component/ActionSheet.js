import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList,
  PanResponder,

} from 'react-native';
import {
  ScrollView,
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { FontSize } from '../constant';
import { log } from 'react-native-reanimated';
import { TextInput } from 'react-native-paper';
import { verify } from '../assets';
import CrimeButtom from './CrimeButtom';
import { setColorAndImageOnCrimes } from '../utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { filterCrimeAction, filterSubCrimeAction } from "../Redux/Action/crime.action";

var myData = []
const { width, height } = Dimensions.get('screen');
const ActionSheet = (props) => {
  const { modalizeRef, AllCrimes, handleSelectedCrime,filteredCrimes } = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [selectIndex, setSelectIndex] = useState(null);
  
  const renderCrimeTypes = () => {        
    let myIndex = 0;
    // return <Text>renderCrimeTypes</Text>
    let renderNumberOfRecord = 50
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        
        {filteredCrimes.slice(0, renderNumberOfRecord).map((val, index) => {                    
          let crimeTypeLabel = `${val[0]
            .replace(/_/g, ' ')
            .substring(0, 4)}...`;
          myIndex = ++myIndex;

          return (
            <TouchableOpacity
            key = {index}
              onPress={() => dispatch(filterCrimeAction(index))}
              style={[styles.box, { borderColor: colors.thirdColor, backgroundColor : val.isSelected ? colors.primary : colors.background, borderRadius : 4 }]}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: colors.actionSheetBg },
                ]}>
                <Text style={{ color: val.color_code, fontSize: 10 }}>{val[1].length}</Text>
              </View>
              <Text
                style={{
                  // color: colors.txtColor,
                  color: val.isSelected ? colors.white : colors.txtColor,
                  fontSize: 10,
                  marginTop: 4,
                }}>
                {crimeTypeLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

 
  
  const renderCrimeSubCategory = () => {        
    let myIndex = 0;
    // return <Text>DONE</Text>
    var groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        
        (rv[x[key]] = rv[x[key]] || []).push(x);        
        return rv;
      }, {});
    };

    let renderNumberOfRecord = 50
    return (
      <ScrollView horizontal={false}  showsVerticalScrollIndicator = {false} style = {{marginBottom : 100}} >
        {AllCrimes.slice(0, renderNumberOfRecord).map((val, i) => {              
          let crimeTypeLabel = `${val[1]}...`;
          myIndex = ++myIndex;          
          var question_sr_no_check_formula = groupBy(val[1], 'sub_type');           
          var iskeyfind = Object.keys(question_sr_no_check_formula)
          var isvals = Object.values(question_sr_no_check_formula)          
          myData = []
          Object.entries(question_sr_no_check_formula).filter((cr, index) => {   
          
            
                myData.push({
                  name : cr[0],
                  numberOfCrime : cr[1].length,
                  isSelected : cr[1][0].isSelected,
                  color_code :  cr[1][0].color_code
                })
          })    
          let Maincrime = val[0].replace(/_/g, ' ')
          return (
            <React.Fragment key={i}>
              <Text style = {{color :  colors.light_dark}}>
                Sub-Categories :
                <Text style={{ color: '#6E80F3', fontSize: 16 }}> {Maincrime}</Text>
              </Text>
              <View style = {{ flex : 1, flexDirection : 'row', flexWrap : 'wrap'}}>

                {
                  myData.map((item, index) => {                    
                    if (item.name !== null) {
                      var crimeTypeLabel = `${item.name
                        .replace(/_/g, ' ')}`;    
                    }      
                    return(
                      <TouchableOpacity key = {index}
                    style = {{width : 'auto'}}
                     onPress = {() => dispatch(filterSubCrimeAction({sub_crime:item.name, crime : val[0], index : i}))}                    
                     >
                    <CrimeButtom                      
                      style={[styles.btnView, {backgroundColor : item.isSelected ? colors.primary : colors.subCrimeBtn, borderColor : colors.subCrimeBtnBorder}]}
                      crimeName={crimeTypeLabel}
                      crimeNumber={item.numberOfCrime}
                      txtStyle= {{color: item.isSelected ? '#fff' : colors.light_dark}}
                      // backgroundColor : val.isSelected ? colors.primary : colors.background
                      numberStyle={{ color: `${item.color_code}` }}
                    />
                    </TouchableOpacity>
                    )
                  })
                }
              {/* <FlatList
                data={myData}
                renderItem={({ item, index }) => {                                    
                  return (
                    <TouchableOpacity key = {index}
                    style = {{width : 'auto'}}
                     onPress = {() => dispatch(filterSubCrimeAction({sub_crime:item.name, crime : val[0], index : i}))}                    
                     >
                    <CrimeButtom                      
                      style={[styles.btnView, {backgroundColor : item.isSelected ? colors.primary : colors.subCrimeBtn, borderColor : colors.subCrimeBtnBorder}]}
                      crimeName={item.name}
                      crimeNumber={item.numberOfCrime}
                      txtStyle= {{color: item.isSelected ? '#fff' : colors.light_dark}}
                      // backgroundColor : val.isSelected ? colors.primary : colors.background
                      numberStyle={{ color: item.color_code }}
                    />
                    </TouchableOpacity>
                  );
                }}
              /> */}
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
    );
  };

  const bottomSheetRef = useRef(null).current;

  // variables
  const snapPoints = useMemo(() => ['23%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={[styles.contentContainer, {backgroundColor : colors.background}]}>
        <View
          style={[styles.row, { height: 65, justifyContent: 'space-evenly' }]}>
          {renderCrimeTypes()}
        </View>
        <View style={{ marginTop: 20, borderBottomWidth: 0.5, marginBottom : 20 }} />
        <ScrollView style={{ paddingLeft: 5 }}>
          <View style={{ marginTop: 20 }}>{renderCrimeSubCategory()}</View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex : 50,
    // height: height / 2,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // padding : 5,
    width: width,
    padding: 10,
  },
  grabber: {
    width: 70,
    // height : 200,
    // backgroundColor : 'red',
    borderTopWidth: 5,
    borderTopColor: '#9DB3F4',
    alignSelf: 'center',
  },
  model: {
    paddingTop: 20,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    height: '100%',
    width: 60,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4.5,
    padding: 3,
  },
  circle: {
    borderRadius: 100,
    width: 25,
    height: 25,
    // backgroundColor: '#EFF4FF',
    justifyContent: 'center',
    alignItems: 'center',

    // SHADOW
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  },
  btnView: {
    // width: 'auto',
    paddingHorizontal : 0,
    height: 40,
    // alignSelf : 'flex-start',
    marginRight : '7%',
    borderRadius: 20,
    marginTop: '5%',
    marginBottom: '2%',
  },
  secondbtnView: {
    width: '30%',
    height: 40,
    borderRadius: 20,
  },
  thirdbtnView: {
    width: '60%',
    height: 40,
    borderRadius: 20,
  },
  fourthbtnView: {
    width: '80%',
    height: 40,
    borderRadius: 20,
  },
  fifthbtnView: {
    width: '70%',
    height: 40,
    borderRadius: 20,
  },
  firstColor: {
    color: '#6E80F3',
  },
  secondColor: {
    color: '#FF1745',
  },
  thirdColor: {
    color: '#FDCB04',
  },
  fourthColor: {
    color: '#FD8600',
  },
  fifthColor: {
    color: '#FF4594',
  },
  sixColor: {
    color: '#007AFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal : 5,
    
    // backgroundColor: 'red'
  },
});
export default ActionSheet;


