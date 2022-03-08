import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'

const ModalComponent = (props) => {
    const {  modalVisible, closeModal } = props
    return (
        // <View  style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        //   onRequestClose={() => 
        // //     {
        // //     Alert.alert("Modal has been closed.");
        // //     this.setModalVisible(!modalVisible);
        // //   }
        // closeModal
        // }
        >
          <TouchableOpacity activeOpacity = {1} onPress = {() => closeModal()} style={styles.centeredView}>
            <View style={styles.modalView}>
              {props.children}
            </View>
          </TouchableOpacity>
        </Modal>
      // {/* </View> */}
    )
}

export default ModalComponent

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width : '100%',
        // backgroundColor : 'red', 
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
