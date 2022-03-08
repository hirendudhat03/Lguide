import {StyleSheet} from 'react-native'
import { setDeviceSize } from '../../config/Appfonts'

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // borderRadius: 20
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        flexDirection: 'column'
    },
 

    textThank: {
        fontSize: setDeviceSize(14), fontWeight: 'bold', color: '#2E4478', marginBottom: setDeviceSize(35),
        textAlign: 'center'
    },
    textDetail: {
        fontSize: setDeviceSize(12), color: '#403D3D', textAlign: 'center', marginBottom: setDeviceSize(50)
    },
    textReserve: {
        fontSize: setDeviceSize(14), color: '#808DAD', fontWeight: '500', marginBottom: setDeviceSize(25),
        textAlign: 'center'
    },
    textLater: {
        fontSize: setDeviceSize(14), fontWeight: 'bold', color: '#53A9FF', textAlign: 'center'
    },


    // 2 Section
    // ====================

    container2: {
        justifyContent: 'flex-start'
    },
    boxshadow: {
        shadowColor: "#707070",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boxStyle: {
        justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', marginHorizontal: setDeviceSize(20), borderRadius: setDeviceSize(10), padding: setDeviceSize(15), paddingHorizontal: setDeviceSize(25), marginBottom: setDeviceSize(20)
    },

    textName: {
        fontSize: setDeviceSize(14),
        color: '#142231',
        fontWeight: 'bold'
    }

})