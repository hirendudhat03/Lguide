import React, {useState, useEffect, useRef, useMemo} from 'react'
import {
  View,
  SafeAreaView,
  Dimensions,
  BackHandler,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import MapView from 'react-native-maps'
import {styles} from './style'
import HomeHeader from './HomeHeader'
import CrimeReport from './CrimeReport'
import {TabBar, ActionSheet, Loader, CustomToster} from '../../component'
import {mapStyleNight, mapStyleSilver} from './MapStyle'
import {useSelector, useDispatch} from 'react-redux'
import Geolocation from '@react-native-community/geolocation'
import {getFirCrime, getAllCrimeTypes} from '../../Redux/Action/crime.action'
import {blue_marker} from '../../assets'
import {Icon} from 'native-base'
import {useTheme} from '@react-navigation/native'
// import Tooltip from 'react-native-walkthrough-tooltip';
import messaging from '@react-native-firebase/messaging'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const Title = () => {
  return <Text>ABCD</Text>
}

const Home = props => {
  let commonState = useSelector(state => {
    return state.Common
  })

  const lat = Number(commonState.currentLocation.currentLatitude)
  const lang = Number(commonState.currentLocation.currentLongitude)

  const LATITUDE_DELTA = 0.15
  const LONGITUDE_DELTA = LATITUDE_DELTA * (windowWidth / windowHeight)

  const [selectedCrime, setSelectedCrime] = useState('')
  const [loading, setLoading] = useState(true)
  const [toolTipVisible, setToolTipVisible] = useState(false)
  const [initialRegion, setInitialRegion] = useState({
    latitude: lat,
    longitude: lang,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })
  const {colors} = useTheme()
  const dispatch = useDispatch()

  let crimesState = useSelector(state => {
    return state.crimes
  })

  // console.log('crimesState data : ',crimesState);

  const {isDarkMode} = commonState

  const openDrawer = () => {
    props.navigation.toggleDrawer()
  }

  useEffect(() => {
    // FOR NOTIFICATION
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived! 1', remoteMessage)
      if (remoteMessage) {
        dispatch({
          type: 'GET_NOTIFICATION',
          payload: {remoteMessage: remoteMessage, props: {...props}},
        })
      }
    })
    return unsubscribe
    // createGuestUser()
  }, [])

  useEffect(() => {
    renderBackHandler()
    callGetAllCrimeTypes()
    handleNotification()
    handleNotificationForQuitMode()
  }, [])

  const handleNotification = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state 2>>:',
        remoteMessage,
      )
      if (remoteMessage) {
        dispatch({
          type: 'GET_NOTIFICATION',
          payload: {remoteMessage, ...props},
        })
      }
    })
  }

  const handleNotificationForQuitMode = () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessageQ => {
        if (remoteMessageQ) {
          // notificationQuit = remoteMessageQ
          console.log(
            'Notification caused app to open from quit state 3:',
            remoteMessageQ,
          )
          if (remoteMessageQ) {
            dispatch({
              type: 'GET_NOTIFICATION',
              payload: {remoteMessage, ...props},
            })
          }
        }
      })
  }

  useEffect(() => {
    callGetFirCrime(initialRegion)
  }, [initialRegion])

  const callGetFirCrime = initialRegion => {

    console.log('callGetFirCrime',initialRegion)

    let {currentLatitude, currentLongitude} = commonState.currentLocation

    console.log('currentLatitude : ',currentLatitude)
    console.log('currentLongitude : ',currentLongitude)

    if (currentLatitude && currentLongitude) {
      console.log('callGetFirCrime if condition')
      dispatch(getFirCrime(initialRegion))
    }
  }

  const callGetAllCrimeTypes = () => {
    dispatch(getAllCrimeTypes())
  }

  const renderBackHandler = () => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp()
        return true
      },
    )
    return () => backHandler.remove()
  }

  let Obj = {
    latitude: lat,
    longitude: lang,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }
  var radius1 = 1000
  let coordinates = {
    latitude: lat,
    longitude: lang,
  }

  const goToFilter = () => {
    props.navigation.navigate('Filter')
  }

  const handleSelectedCrime = crime => {
    setSelectedCrime(crime[0])
  }
  const {params} = props.route
  let myArr = []
  let renderNumberOfRecord = 10
  const {filteredCrimes} = crimesState

  console.log('start filteredcrimes ==============================>');
  // console.log('filteredCrimes : ',filteredCrimes);
  filteredCrimes &&
    filteredCrimes &&
    filteredCrimes.map(crimerr => {
      if (params != undefined) {
        
        const {filterVal} = params
        if (filterVal.crime === crimerr[0]) {
          if (filterVal.subCrime.length > 0) {
            var pushdata = []
            let abcd = []
            filterVal.subCrime.map(subItem => {
              crimerr[1].map((cItem, index) => {
                if (subItem.title == cItem.sub_type) {
                  abcd.push(cItem)
                  pushdata = [crimerr[0], abcd]
                  // myArr.push(crimerr)

                  myArr.push(pushdata)
                }
              })
            })
          } else {
            myArr.push(crimerr)
          }
        }
      } else {
        
        if (crimerr.isSelected === true) {
          myArr.push(crimerr)
        }
      }
    })
  if (myArr.length == 0) {
    myArr = filteredCrimes
  }

  // console.log('myArr : ',myArr);

  // RENDER CRIME MARKER

  const renderMarker = useMemo(() => {
    let markerData = []
    const {params} = props.route
    var selected = false
    var defaultData = []
    return myArr.map((mainCrime, index) => {
      var crime_name = mainCrime[0]
      var crime_val = mainCrime[1]

      // mainCrime[1].filter((item) => {
      //     if (item.isSelected === true) {

      //       selected = true;
      //       // markerData.push(item)
      //     }
      // })
      defaultData = [...defaultData, ...mainCrime[1]]

      var markerData2 = mainCrime[1].filter(item => {
        return item.isSelected === true
      })
      if (markerData2.length != 0) {
        markerData = [...markerData, ...markerData2]
      }

      if (markerData.length === 0 && index == myArr.length - 1) {
        markerData = defaultData
      }
      return markerData.slice(0, 100).map((crimes, i) => {
        if (crimes.sub_type !== null) {
          var crimeTypeLabel = `${crimes.sub_type.replace(/_/g, ' ')}`
        }

        let coordinates = {
          latitude: crimes.latitude,
          longitude: crimes.longitude,
        }
        // if (crimes.sub_type == 'Gambling') {
        //   console.log('CR',crimes);
        // }
        // console.log('toolTipVisible', toolTipVisible);
        return (
          //  <Tooltip
          //    animated={true}
          //    //(Optional) When true, tooltip will animate in/out when showing/hiding
          //    arrowSize={{width: 16, height: 8}}
          //    //(Optional) Dimensions of arrow bubble pointing to the highlighted element
          //    backgroundColor="rgba(0,0,0,0.5)"
          //    //(Optional) Color of the fullscreen background beneath the tooltip.
          //    isVisible={toolTipVisible}
          //    //(Must) When true, tooltip is displayed
          //    content={<Text>Hello! AboutReact</Text>}
          //    //(Must) This is the view displayed in the tooltip
          //    placement="top"
          //    //(Must) top, bottom, left, right, auto.
          //    onClose={() => setToolTipVisible(false)}
          //    //(Optional) Callback fired when the user taps the tooltip
          //     >
          <MapView.Marker
            key={i}
            coordinate={coordinates}
            // title={crimeTypeLabel}
            // pinColor = {crimes.color_code === null ? '#FF0000' : crimes.color_code}
            isPreselected={false}
            // description={
            //   crimes.color_code === null ? '#FF0000' : crimes.color_code
            // }
            // title = {crime_name}
            stopPropagation={true}
            // opacity	 = {0.0}
            tracksViewChanges={false}
            onPress={() => setToolTipVisible(true)}>
            {/* <Icon type = 'Octicons' name = 'primitive-dot' style={{fontSize: 30, color: 'red',color : crimes.color_code === null ? '#FF0000' : crimes.color_code}}  /> */}

            <View
              style={{
                // position: 'absolute',
                width: 21,
                height: 21,
                backgroundColor: crimes.color_code,
                borderWidth: 3,
                borderColor: '#FFFFFF',
                borderRadius: 50,
                // BOX SHADOW
                // shadowColor: '#000',
                // shadowOffset: {
                //   width: 0,
                //   height: 7,
                // },
                // shadowOpacity: 0.43,
                // shadowRadius: 9.51,
                // elevation: 15,
              }}
            />

            {/* <Image source={blue_marker} style={{height: 35, width: 35, tintColor : crimes.color_code}} /> */}
          </MapView.Marker>
          // </Tooltip>
        )
      })
    })
  })

  const onRegionChange = region => {
    setInitialRegion(region)
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader
        loading={
          crimesState.isLoading === false && myArr.length > 0 ? false : false
        }
      />
      {/* <Loader loading={myArr.length < 1 ? true : false} /> */}
      <View style={styles.container}>
        <MapView
          region={initialRegion}
          // onRegionChange={(region) => onRegionChange(region)}
          onRegionChangeComplete={(region) => onRegionChange(region)}
          style={{
            width: windowWidth,
            height: windowHeight,
            alignSelf: 'center',
          }}
          // onRegionChangeComplete = {onRegionChange}
          // onRegionChange={onRegionChange}
          customMapStyle={isDarkMode ? mapStyleNight : []}>
          <MapView.Circle
            radius={radius1}
            strokeColor='rgba(157, 179, 244, 0.3)'
            fillColor='rgba(157, 179, 244, 1)'
            radius={300} // circle size
            strokeWidth={30}
            // zIndex = {1}

            center={coordinates}>
            <Image
              source={blue_marker}
              style={{height: 35, width: 35, zIndex: 10}}
            />
          </MapView.Circle>

          {renderMarker}
        </MapView>
        <HomeHeader goToFilter={goToFilter} openDrawer={openDrawer} />
        {/* <CrimeReport /> */}
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          backgroundColor: colors.white,
          position: 'absolute',
          bottom: 200,
          left: 15,
          borderRadius: 50,
          padding: 5,
          justifyContent: 'center',
          zIndex: 0,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Icon type='Entypo' name='info' />
      </TouchableOpacity>
      {/* <CustomToster /> */}
      {myArr.length > 0 && (
        <ActionSheet
          handleSelectedCrime={crime => handleSelectedCrime(crime)}
          {...props}
          AllCrimes={myArr}
          filteredCrimes={filteredCrimes}
        />
      )}

      <TabBar {...props} />
    </SafeAreaView>
  )
}

export default React.memo(Home)
