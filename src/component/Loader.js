import React, { Component } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';
import { Spinner } from 'native-base';
import {Colors} from '../constant'

class Loader extends  Component{
    render(){
        const {
            loading,
            ...attributes
          } = this.props;
        return(
            // <View style =  {styles.scrn_root}>
            //     <Spinner color= {Colors.primaryColor}  />
            // </View>
            <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator
            animating={loading} /> */}
            <Spinner color= {Colors.secondaryColor}  />
            <Text style = {styles.loading_txt}>Loading...</Text>
        </View>
      </View>
    </Modal>
        )
    }
}

const styles = StyleSheet.create({
    scrn_root : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 150,
        width: 150,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        // padding : 25,
        // flexDirection : 'row',
        justifyContent: 'space-around'
      },

      loading_txt :{
        fontSize : 16,
        fontWeight : '600'
      }
})

export default Loader;