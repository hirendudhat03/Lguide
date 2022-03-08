import React, {useState} from 'react';
import { 
  ScrollView,
} from 'react-native';
import {List} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListAccordion = (props) => {
  const {AllCrimeType, expandHandler , handleSelect } = props;

  console.log('AllCrimeType >>>>', AllCrimeType);
  // return false
  return (
    <ScrollView style={{width: wp(80), height: hp(50)}}>
      <List.Section>
        {AllCrimeType.length > 0 &&
          AllCrimeType.map((item,index) => {
            // console.log('item', item);
            return (
              <List.Accordion
              key = {index}
                title={item.label}
                // left={props => <List.Icon {...props} icon="folder" />}
                expanded={item.isExpanded}
                onPress={() => expandHandler(index)}>
                {item.sub_crime.sub_types.length > 0 &&
                  item.sub_crime.sub_types.map((val,i) => {
                    var crimeTypeLabel
                    if (val.sub_type !== null) {
                       crimeTypeLabel = val.sub_type.replace(/_/g, ' ')
                    }
                    
                    console.log('val >>>>', crimeTypeLabel);
                    return <List.Item key = {i} title={crimeTypeLabel} onPress = {() =>{
                      //  alert('dfsdf')
                      if(handleSelect !=undefined)
                      {
                      alert(crimeTypeLabel)

                        handleSelect(crimeTypeLabel)
                        expandHandler(index)
                      }
                      }} />;
                  })}
              </List.Accordion>
            );
          })}       
      </List.Section>
    </ScrollView>
  );
};

export default ListAccordion;

// const styles = StyleSheet.create({

// })
