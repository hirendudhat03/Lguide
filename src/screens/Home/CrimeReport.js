import React from 'react'
import {
    Text,    
    View,
    Image,
  } from 'react-native';
import {circle_shadow, circle_shadow_dark} from '../../assets';
import {styles} from './style';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const CrimeReport = (props) => { 
  const {colors} = useTheme();
  let currentTheme = useSelector((state) => {
    return state.Common;
  });
  const {isDarkMode} = currentTheme;

    return (
        <View style={[styles.crimeRecordBoard, {backgroundColor : colors.secondaryColor}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.crimeData}>
              <View style={{justifyContent: 'center', marginLeft: 10}}>
                <Text style={styles.crimeTxt}>Total active crimes</Text>
                <Text style={styles.crimeTxt}>in your area.</Text>
              </View>
              <View style={styles.center}>
                <Image style={styles.crimeScoreImg} source={isDarkMode ? circle_shadow_dark : circle_shadow} />
                <Text style={{position: 'absolute', color: 'white'}}>890</Text>
              </View>
            </View>

            <View style={styles.crimeData}>
              <View style={{marginRight: 10, justifyContent: 'center'}}>
                <Text style={styles.crimeTxt}>Total active crimes</Text>
                <Text style={styles.crimeTxt}>in your zone.</Text>
              </View>
              <View>
                <View style={styles.center}>
                  <Image style={styles.crimeScoreImg} source={isDarkMode ? circle_shadow_dark : circle_shadow} />
                  <Text style={{position: 'absolute', color: 'white'}}>
                    890
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
    )
}

export default CrimeReport


