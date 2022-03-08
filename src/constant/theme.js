import {    
    DefaultTheme,
    DarkTheme,
  } from '@react-navigation/native';
  import { Colors } from './index'

  export const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      secondaryColor: '#232C57',
      background: '#161E44',
      txtColor: '#fff',
      tabTxt : '#fff',
      activeTabTxt :'#A1AEFF',
      thirdColor : Colors.thirdColor,
      actionSheetBg : '#232C57',
      white : '#fff',
      light_dark : '#fff',
      subCrimeBtn : '#232C57',
      subCrimeBtnBorder : '#A1AEFF'
    },
  };

  export const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryColor: Colors.secondaryColor,
      background: Colors.white_color,
      txtColor: Colors.txtColor,
      tabTxt : '#1F314A',
      activeTabTxt : Colors.secondaryColor,
      thirdColor : Colors.thirdColor,
      actionSheetBg : Colors.white_color,
      white : '#fff',
      light_dark : '#1F314A',
      subCrimeBtn : '#EFF4FF',
      subCrimeBtnBorder : '#EFF4FF'
    },
  };