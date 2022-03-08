import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon} from 'native-base';
import {Colors, FontSize} from '../constant';

const Datepicker = (props) => {
  const { crimeDate, datePickerHandler, showDatePicker, openDatePicker } = props
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const {pickerTitle, pickerStyle} = props;
  return (
    <TouchableOpacity onPress={openDatePicker} style={[styles.pickerView, pickerStyle]}>
      <View>
        <Text style={{color: 'gray'}}>{pickerTitle}</Text>
      </View>
      <View>
        <Icon
          
          type="FontAwesome5"
          name="calendar-alt"
          style={{color: Colors.app_theme_color}}
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={crimeDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={datePickerHandler}
          
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Datepicker;