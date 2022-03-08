import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Header, Content, List, ListItem} from 'native-base';
import {Colors, FontSize} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FilterTitles = (props) => {
  const {titleHeader} = props;
  return (
    <List>
      <ListItem itemDivider>
        <Text style={styles.headers}>{titleHeader}</Text>
      </ListItem>
    </List>
  );
};

const styles = StyleSheet.create({
  headers: {
    color: Colors.txtColor,
    fontSize: wp('4.5%'),
  },
});

export default FilterTitles;
