import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback, StatusBar
} from 'react-native';
import { tab_bg, tab_bg_dark } from '../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  home_inactive,
  map_inactive,
  Frame_inactive,
  direction_inactive,
  bell_inactive,
} from '../assets';
import { FontSize } from '../constant';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Ripple from 'react-native-material-ripple';

const TabBar = (props) => {



  const [homeTab, setHomeTab] = useState(true);
  const [mapTab, setMapTab] = useState(false);
  const [reportTab, setReportTab] = useState(false);
  const [directionTab, setDirectionTab] = useState(false);
  const [notificationTab, setNotificationTab] = useState(false);
  const { colors } = useTheme();
  let currentTheme = useSelector((state) => {
    return state.Common;
  });
  const { isDarkMode } = currentTheme;

  const tabHandler = (val) => {

    switch (val) {
      case 'homeTab':
        setHomeTab(true);
        setMapTab(false);
        setReportTab(false);
        setDirectionTab(false);
        setNotificationTab(false);
        break;

      case 'mapTab':
        setHomeTab(false);
        setMapTab(true);
        setReportTab(false);
        setDirectionTab(false);
        setNotificationTab(false);
        break;
      case 'reportTab':
        setHomeTab(false);
        setMapTab(false);
        setReportTab(true);
        setDirectionTab(false);
        setNotificationTab(false);
        props.navigation.navigate("AddReport");
        break;
      case 'directionTab':
        setHomeTab(false);
        setMapTab(false);
        setReportTab(false);
        setDirectionTab(true);
        setNotificationTab(false);
        props.navigation.navigate("Direction");
        break;
      case 'notificationTab':
        setHomeTab(false);
        setMapTab(false);
        setReportTab(false);
        setDirectionTab(false);
        setNotificationTab(true);
        props.navigation.navigate("Notification");
        break;
      default:
        break;
    }
  };

  return (
    // <View style={{
    //     // backgroundColor : 'green',
    //     // bottom : -10,
    //     width : wp(100),
    //     // bottom : 0,
    //     // height : 125
    //     }}
    //     >
    <ImageBackground
      source={isDarkMode ? tab_bg_dark : tab_bg}
      resizeMode="stretch"
      style={{
        width: '100%',
        height: 100,
        // backgroundColor : 'blue',
        bottom: 0,
        position: 'absolute',
        zIndex: 25
        // justifyContent : 'flex-end',
        // paddingBottom : 10
      }}>
      <View
        style={[
          styles.row,
          {
            height: '70%',
            marginTop: '8%',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          },
        ]}>
        {/* <View style = {[styles.row, { justifyContent : 'space-between',paddingHorizontal : 12,paddingBottom : 15, paddingTop : 5}]}> */}
        <TouchableOpacity
          onPress={() => tabHandler('homeTab')}
          style={styles.column}>
          <Image
            source={home_inactive}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={[styles.txt, { color: homeTab ? colors.activeTabTxt : colors.tabTxt }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => tabHandler('mapTab')}
          style={styles.column}>
          <Image
            source={map_inactive}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={[styles.txt, { color: mapTab ? colors.activeTabTxt : colors.tabTxt }]}>Map View</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => tabHandler('reportTab')}

          style={[styles.column, {
            justifyContent: 'flex-end',
            // height: '60%',
            height: '92%',
            top: '-3.8%',
            zIndex: 100,
            // backgroundColor: 'red',
          }]}>
          <Ripple
          rippleContainerBorderRadius={100}
          rippleSize={244}
          // rippleColor='#76ff03'
          // rippleOpacity='0.87'
          rippleDuration={2400}
            style={[
              styles.img,
              {

                width: 45, height: 45,
                position: 'absolute',
                // top: '-75%',
                top: '-7%',
                overflow: 'visible'
              },
            ]}
            onPress={() => tabHandler('reportTab')}
          >


            {/* <TouchableOpacity  > */}

            <Image
              source={Frame_inactive}
              resizeMode="contain"
              style={[
                // styles.img,
                { 
                  width: 45, 
                  height: 45,
                },
              ]}
            />

            {/* </TouchableOpacity> */}
          </Ripple>
          <Text style={[[styles.txt, { color: reportTab ? colors.activeTabTxt : colors.tabTxt }], { position: 'absolute', bottom: -4.5 }]}>
            Report Crime
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => tabHandler('directionTab')}
          style={styles.column}>
          <Image
            source={direction_inactive}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={[styles.txt, { color: directionTab ? colors.activeTabTxt : colors.tabTxt }]}>Direction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => tabHandler('notificationTab')}
          style={styles.column}>
          <Image
            source={bell_inactive}
            resizeMode="contain"
            style={styles.img}
          />
          <Text style={[styles.txt, { color: notificationTab ? colors.activeTabTxt : colors.tabTxt }]}>Notification</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>

    // </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 30,
    width: 30,
  },
  txt: {
    color: '#000',
    fontSize: FontSize.Small - 2,
    marginTop: 5,
    textAlign: 'center',
  },
  column: { alignItems: 'center', padding: 3, width: '20%' },

  btnNormal: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'blue',
    borderWidth: 1,
    height: 30,
    width: 100,
  }
});
