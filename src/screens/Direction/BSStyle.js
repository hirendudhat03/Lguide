import {StyleSheet} from 'react-native'
// import { } rom '../../config/Appfonts'

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
        fontSize: 16, fontWeight: '600', color: '#1F314A', marginBottom: 10,
        textAlign: 'center'
    },
    textDetail: {
        fontSize: 12, color: '#403D3D', textAlign: 'center', marginBottom: 50
    },
    textReserve: {
        fontSize: 14, color: '#1F314A', fontWeight: '600', 
        // marginBottom: 15,
        lineHeight: 31.5,
        textAlign: 'right',
        fontFamily: 'Open Sans',
        paddingRight: 40,
    },
   
    textLater: {
        fontSize: 16, fontWeight: '600', color: '#1F314A', textAlign: 'center',
        fontFamily: 'Open Sans'
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
        justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 20, borderRadius: 10, padding: 15, paddingHorizontal: 25, marginBottom: 20
    },
    boxStyle1: {
        justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', 
        // marginHorizontal: 20, 
        borderRadius: 10, 
        padding: 15, 
        paddingHorizontal: 20, 
        marginBottom: 20
    },

    textName: {
        fontSize: 14,
        color: '#142231',
        fontWeight: 'bold'
    },
    textClose: {
        color: '#53A9FF', fontSize: 14, fontWeight: 'bold'
    },
    textTime: {
        fontSize: 12, color: '#221E20', fontWeight: 'bold'
    },
    textDuration: {
        fontSize: 10, color: '#525252', fontWeight: '500', textAlign: 'center',
        marginBottom: 20
    }

})