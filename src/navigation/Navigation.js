import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  NavigationContainer,  
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Auth} from './StackNavigation';
import DrawerNavigation from './DrawerNavigation';
// import {BottomTabs} from './TabNavigation';
import {Colors, customDarkTheme, customDefaultTheme} from '../constant';
import { Loader } from '../component'
import {useSelector, useDispatch} from 'react-redux';

const Navigation = () => {
  const [isSkipAuth, setIsSkipAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const getIsDarkMode = JSON.parse(await AsyncStorage.getItem('isDarkMode'));
    const getSkipAuth = JSON.parse(await AsyncStorage.getItem('skipAuth'));
    
    if (getIsDarkMode !== null) {
      dispatch({
        type: 'CHANGE_THEME',
        payload: getIsDarkMode.isDarkMode,
      });
    }
    if (getSkipAuth !== null) {
      setIsSkipAuth(getSkipAuth.isSkipAuthentication);
    }
    setIsLoading(false)
  };

  
  let currentTheme = useSelector((state) => {
    return state.Common;
  });
  const {isDarkMode} = currentTheme;

  
  return (
    <>
    {
      isLoading ?
      <Loader loading = {isLoading} />
      :
      <NavigationContainer
        theme={isDarkMode ? customDarkTheme : customDefaultTheme}>
        {/* <DrawerNavigation /> */}
        {isSkipAuth ? <DrawerNavigation /> : <Auth />}        
        {/* <Auth /> */}
      </NavigationContainer>
    }                 
    </>
  );
};

export default Navigation;
