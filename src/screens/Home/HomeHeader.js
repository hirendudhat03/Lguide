import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Menu, Filter, Search, Menu_dark, Search_dark, Filter_dark} from '../../assets';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';

const HomeHeader = (props) => {
  const {openDrawer, goToFilter} = props;
  let currentTheme = useSelector((state) => {
    return state.Common;
  });
  const {isDarkMode} = currentTheme;

  return (
    <View style={styles.subContainer}>
      <View style={{flexDirection: 'row', height : '100%', alignItems : 'center'}}>
        <TouchableOpacity underlayColor="transparent" onPress={openDrawer}>
          <Image  style={isDarkMode ? styles.header_menu_dark : styles.header_menu_light} source={isDarkMode ? Menu_dark : Menu} />
        </TouchableOpacity>

        <TouchableOpacity
          underlayColor="transparent"
          onPress={ goToFilter}
        >
          <Image
            style={{width: 48, height: 48,  marginLeft: 5}}
            source={isDarkMode ? Filter_dark : Filter}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height : '100%', alignItems : 'center', justifyContent : 'center'}}>
      <TouchableOpacity
        underlayColor="transparent"
        style = {{alignSelf : 'flex-end'}}
        //   onPress={() => this.navigateToSearch()}
      >
        <Image
          style={{width: 48, height: 48,  marginLeft: 5}}
          source={isDarkMode ? Search_dark : Search}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
