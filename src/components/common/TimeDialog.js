import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const TimeDailog = ({ label, input, minimumDate, maximumDate, isVisible,inputContainerStyle,onSelected, mode }) => {
  const [show, setShow] = useState(false)
  const [curdate,setCurDate]=useState(new Date())
  useEffect(() => {
    if (isVisible == true) {
      setShow(true);
    }
  }, [isVisible])
  const toggleOverlay = () => {
    setShow(!show)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.viewStyles,inputContainerStyle]}
        onPress={() => {
          setShow(true)
        }}
      >
        <Text style={styles.textStyle}>{input}</Text>
        <MaterialCommunityIcons name="clock-check-outline" size={24} color="#d00000" />
      </TouchableOpacity>

      {show && (
        <View style={{flexDirection:'column'}}>
        <DateTimePicker
          testID='dateTimePicker'
          value={curdate}
          mode='time'
          display='default'
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={(event, time) => {
            setCurDate(time)
            setShow(Platform.OS === 'ios');
            var h = time.getHours()
            var m = time.getMinutes()
            var s = time.getSeconds()
            var hour=h % 12;
            var ampm = h >= 12 ? 'PM' : 'AM';
            onSelected(`${(hour<10?'0':'')+hour}:${(m<10?'0':'')+m+' '+ampm}`)
          }}
        />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    margin: 2,
  },
  label: {
    marginTop: 2,
    fontSize: 13,
    paddingLeft: 17,
    color: '#000000',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
  },
  flexBox: {
    flex: 1,
  },
  labelStyle: {
    marginTop: 2,
    fontSize: 11,
    paddingLeft: 2,
    color: 'grey',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
    alignSelf: 'center',
    fontFamily: 'Montserrat',
    paddingRight: 6,
    paddingLeft: 6,
    paddingStart: 6,    
    paddingBottom: 2,

 
  },
  viewStyles: {
    flex: 2,
    height: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 5,
    paddingLeft: 4,
    paddingRight: 8,
    width: '93%',
    alignSelf: 'center'

  },
  input: {
    borderWidth: 0.8,
    borderColor: '#d8d8d8',
    padding: 4,
    paddingLeft:8,
    margin: 4,
    width:'90%',
    alignSelf:'center',
    borderRadius: 8,
    height:38,
    flexWrap: 'wrap',
    
  },
})

export { TimeDailog }
