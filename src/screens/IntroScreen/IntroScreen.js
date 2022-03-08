import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Rate, Journey, Incident, Bg_one, Bg_two, Bg_three, Right_arrow} from '../../assets';
import {Icon} from 'native-base';
import {Colors, FontSize} from '../../constant';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const data = [
  {
    title: 'View crime rate',
    text:
      'View number of crime rate happend every day in your area. Filter it out by crimes and range form your actual location.',
    image: Rate,
    bgImg: Bg_one,
    imgStyle : {
        height: '60%',
        width: '72%',
        bottom: 13,
        //   backgroundColor: 'red',
        alignSelf: 'flex-end',
        //   marginRight : -50,
        // marginLeft : 60,
        position: 'absolute',
        zIndex: 1,
      }
  },
  {
    title: 'Take safe journey',
    text:
      'Take the direction, so that system will automatically suggest you safest route to rach your destination',
    image: Journey,
    bgImg: Bg_two,
    imgStyle : {
        height: '60%',
        width: '72%',
        top: 13,
        //   backgroundColor: 'red',
        alignSelf: 'flex-end',
        //   marginRight : -50,
        // marginLeft : 60,
        position: 'absolute',
        zIndex: 1,
      }
  },
  {
    title: 'Add report for incidents',
    text: 'You can add report of crimes or accidents happened near you',
    image: Incident,
    bgImg: Bg_three,
    imgStyle : {
        height: '60%',
        width: '72%',
        top: 1,
        //   backgroundColor: 'red',
        alignSelf: 'flex-start',
        //   marginRight : -50,
        // marginLeft : 60,
        position: 'absolute',
        zIndex: 1,
      }
  },
];

class IntroScreen extends Component {
  onNextScreen = () => {
    // const Obj = {
    //   isIntroScreenShow: true
    // }
    // alert('test')
    // alert(JSON.stringify(Obj))
    // AsyncStorage.setItem('introScreen','true')
    this.props.navigation.navigate('DrawerNavigation');
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: Colors.bgColor,
          },
        ]}>
        <View style={styles.top}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.bottom}>
          <Image
            source={item.bgImg}
            resizeMode="contain"
            style={item.imgStyle}
          />
          <View style = {{ marginTop : 50, width : '100%', alignItems : 'center'}}>
          <Text style={styles.title}>{item.title}</Text>
          <View style = {{width : '80%', alignSelf : 'center'}}>
            
            <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        </View>

        {/* <Text style={styles.title}>{item.title}</Text>
            <View style = {{width : '80%', alignSelf : 'center'}}>
            
            <Text style={styles.text}>{item.text}</Text>
            </View> */}
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        {/* <Icon
          type="AntDesign"
          name="arrowright"
          style={{color: Colors.white_color}}
          size={30}
        /> */}
        <Image source= {Right_arrow} resizeMode = 'contain' style = {{height : '55%',}} />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          type="AntDesign"
          name="check"
          style={{color: Colors.txtColor}}
          size={30}
          onPress={this.onNextScreen}
        />
      </View>
    );
  };

  _renderSkipBtn = () => {
    return (
      <TouchableOpacity
        style={{
         paddingHorizontal : 15,
        //  paddingVertical : 5,
        //   backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}>
        <Text style={{fontSize: FontSize.Medium, color: Colors.txtColor}}>
          Skip
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.bgColor}}>
        <AppIntroSlider
          keyExtractor={(item, index) => item.title}
          renderDoneButton={this._renderDoneButton}
          renderSkipButton={this._renderSkipBtn}
          showSkipButton={true}
            renderNextButton={this._renderNextButton}
            showNextButton = {true}
          renderItem={this._renderItem}
          showDoneButton={true}
          data={data}
          bottomButton={false}
          activeDotStyle={{
            backgroundColor: Colors.secondaryColor,
            // marginHorizontal: 20,
            marginBottom: 25,
            // marginBottom: '160%',
          }}
          dotStyle={{
            // marginHorizontal: 20,
            top: 0,
            marginBottom: 25,
            backgroundColor: 'gray',
            // marginBottom: hp(75),
            
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    // resizeMode: 'stretch',
    borderRadius: 5,
    marginVertical: 32,
    width: '90%',
    height: '80%',
    // backgroundColor : 'red'
  },
  text: {
    color: Colors.dark_grey,
    textAlign: 'center',

    fontSize: FontSize.Medium,
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: '#EFF4FF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  title: {
    fontSize: FontSize.Large + 5 ,
    color: Colors.txtColor,
    // fontWeight: 'bold',
    marginBottom: 3,
  },
  top: {
    flex: 1,
    //   backgroundColor : 'yellow',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    backgroundColor: Colors.white_color,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    zIndex: 10,
    //   elevation : 5
    //   marginTop : -5
  },
});

export default IntroScreen;
