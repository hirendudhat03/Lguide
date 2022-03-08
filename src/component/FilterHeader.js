import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontSize} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'native-base';

export const FilterHeader = (props) => {
  const {iconName, fname, middleName, handleClose} = props;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems : 'center',paddingHorizontal : 10, marginTop : 10, paddingVertical : 7}}>
      <View>
        <Text style={styles.finame}>{fname}</Text>
      </View>
      <View>
        <Text style={styles.miName}>{middleName}</Text>
      </View>
      <View>
        <Icon type="Feather" name={iconName} onPress = {handleClose} />
      </View>
    </View>
  );
};

export const NotificationHeader = (props) => {
  const {iconName, fname, middleName} = props;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.fname}>{fname}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.sname}>{middleName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  finame: {
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
    fontSize: FontSize.Medium - 2,
  },
  miName: {
    color: Colors.txtColor,
    fontSize: FontSize.Large,
  },
  fname: {
    color: Colors.txtColor,
    fontSize: FontSize.Large,
  },
  sname: {
    color: Colors.secondaryColor,
    textDecorationLine: 'underline',
    fontSize:FontSize.Medium - 2
  },
});

// export default FilterHeader;
