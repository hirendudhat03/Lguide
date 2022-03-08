import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Journey,
  light_bell,
  light_home,
  light_logout,
  light_settings,
  light_sun,
} from '../assets';
import {Colors, FontSize} from '../constant';
import {Avatar, Text, Switch} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

var arrayListOption = [
  {
    title: 'Home',
    Image: light_home,
  },
  {
    title: 'Notifications',
    Image: light_bell,
  },
  {
    title: 'Settings',
    Image: light_settings,
  },
  {
    title: 'Logout',
    Image: light_logout,
  },
];

const optionsList = () => {
  const {colors} = useTheme();
  return arrayListOption.map((data, i) => {
    return (
      <TouchableOpacity
      key = {i}
        style={[styles.row, {marginTop: 20, paddingVertical: 7}]}>
        <Image
          style={styles.optionImg}
          resizeMode="contain"
          source={data.Image}
        />
        <Text style={[styles.optionTxt, {color: colors.txtColor}]}>
          {data.title}
        </Text>
      </TouchableOpacity>
    );
  });
};

const SideBar = (props) => {
  let currentTheme = useSelector((state) => { 
    return state.Common;
  });
    
  const [darkThemeOn, setDarkThemeOn] = useState(currentTheme.isDarkMode);

  useEffect(() => {    
    setDarkThemeOn(currentTheme.isDarkMode);    
  });

  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onToggleSwitch = (val) => {
    setDarkThemeOn(val);    
    AsyncStorage.setItem('isDarkMode', JSON.stringify({isDarkMode : val}));
    dispatch({
      type: 'CHANGE_THEME',
      payload: val,
    });        
  };  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={[styles.header, {backgroundColor: colors.secondaryColor}]}>
          <View style={styles.row}>
            <Avatar.Image size={60} source={Journey} />
            <View style={{marginHorizontal: 15}}>
              <Text style={styles.title}>Aneesh Sarkar</Text>
              <Text style={styles.userEmail}>s.aneesh@gmail.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>{optionsList()}</ScrollView>
        </View>
        <View style={[styles.footer, styles.row]}>
          <View style={styles.row}>
            <Image
              style={styles.optionImg}
              resizeMode="contain"
              source={light_sun}
            />
            <Text style={[styles.optionTxt, {color: colors.txtColor}]}>
              Dark Mode
            </Text>
          </View>
          <View>
            <Switch
              value={darkThemeOn}
              color = {colors.activeTabTxt}
              onValueChange={() => onToggleSwitch(!darkThemeOn)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white_color,
  },
  header: {
    height: '25%',
    // backgroundColor : 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '65%',
    // backgroundColor : 'blue',
    paddingHorizontal: 20,
  },
  footer: {
    height: '10%',
    // backgroundColor : 'green',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.white_color,
    fontSize: FontSize.Large - 1,
  },
  userEmail: {
    color: Colors.white_color,
    fontSize: FontSize.Medium - 1.5,
  },
  optionTxt: {fontSize: FontSize.Medium - 1, fontWeight: '900'},
  optionImg: {height: 25, width: 25, marginRight: 13},
});

export default SideBar;
