import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {Colors, FontSize} from '../../constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'space-between',
    // margin: 15,
    position: 'absolute',
    top: 0,
    width : '100%',
    paddingHorizontal : 12,
    
    // paddingRight : 20,
    marginTop : 10,
    height : 60
  },
  crimeRecordBoard: {
    position: 'absolute',
    top: 90,
    backgroundColor: '#6E80F3',
    width: '100%',
    
  },
  crimeData: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  crimeTxt: {
    color: Colors.white_color,
    // fontSize: FontSize.Regular + 1,
  },
  crimeScoreImg: {
    width: 60,
    height: 60,
  },
  center: {justifyContent: 'center', alignItems: 'center'},

  header_menu_light : {width: 40, height: 40 },
  header_menu_dark : {width: 50, height: 50}
});
