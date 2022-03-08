import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Colors, FontSize} from '../constant';
import {Image, Text} from 'react-native';
import {View, Icon} from 'native-base';
import {
 home_inactive,
 map_inactive,
 Frame_inactive,
 direction_inactive,
 bell_inactive
} from '../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Home from '../screens/Home/Home';
import Notification from '../screens/Notification/Notification';
import {useTheme} from '@react-navigation/native';

var showTabBar = true;

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        
        // tabBarVisible : showTabBar,
        tabBarLabel: ({focused, color, size}) => {
          return (
            <Text
              style={{
                // fontFamily: Fonts.fontMedium,
                fontWeight: 'bold',
                fontSize: FontSize.Regular - 2,
                color: focused ? colors.secondaryColor : colors.tabTxt,
                marginBottom: 5,
                textAlign: 'center',
              }}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({focused, color, size}) => {
          // You can return any component that you like here!
          let imgUrl;
          
          let imgStyle ; 
          let imgView;
          if (route.name === 'Home') {
            imgUrl = focused ? home_inactive : home_inactive;
           
            imgStyle = {height: 25,
              backgroundColor : '#FFF',
              width : 25
              }
          } else if (route.name === 'MapView') {
            imgUrl = focused ? map_inactive : map_inactive;
           
            imgStyle = {height: 25,
              backgroundColor : '#FFF',
              width : 25
              }
          } else if (route.name === 'ReportCrime') {
            imgUrl = focused ? Frame_inactive : Frame_inactive;
           
            imgStyle = {
              // height: '100%',             
              // width : '100%',
              // marginBottom : 35,
              borderRadius : 100,
              width : 40,
                height : 40,
                backgroundColor : '#FFF',
              // margin : 10
              // paddingTop : 15
              // position : 'absolute'
              }
              imgView = {
                padding : 10,
                backgroundColor : '#fff',
                borderRadius : 50,
                // width : 150,
                // paddingHorizontal : 8,  
                // paddingVertical : 10,
                // marginBottom : 35,
              }
          } else if (route.name === 'Direction') {
            imgUrl = focused ? direction_inactive : direction_inactive;
            
            imgStyle = {height: 25,
              backgroundColor : '#FFF',
              width : 25
              }
          } else if (route.name === 'Notification') {
            imgUrl = focused ? bell_inactive : bell_inactive;
           
            imgStyle = {height: 25,
              backgroundColor : '#FFF',
              width : 25
              }
          }
          return (
            <View style = {imgView}>
            <Image
              source={imgUrl}
              resizeMode="stretch"
              style={imgStyle}
            />
            </View>
          );
        },
      })}
      tabBarOptions={{
        // activeTintColor: Colors.primaryColor,
        // inactiveTintColor: Colors.titleFont,
        // tabBarVisible : false,
        style: {
          height: hp(10),
          // paddingTop : 20,
          // backgroundColor: 'yellow',
          paddingTop : 10,
          borderTopLeftRadius : 20,
          borderTopRightRadius : 20,
          position : 'absolute'
         
          
          //   marginBottom : 15,
         
        },
        // activeBackgroundColor: Colors.white,
        // inactiveBackgroundColor: 'rgba(0, 150, 136, 0.9)',
        tabStyle: {
          // height: hp(10),
          
          // paddingTop : 20,
          // backgroundColor: 'red',
          borderTopLeftRadius : 20,
          borderTopRightRadius : 20,
          padding : 3,
          
          // marginTop : 50
        },
        // labelStyle : {fontSize : 10},
      }}
      
      >
     
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MapView" component={Home} />      
      <Tab.Screen name="ReportCrime" component={Home} />
      <Tab.Screen name="Direction" component={Home} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
};
