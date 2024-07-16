import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'


import { DateDailog } from './DateDialog'
import { Button } from 'react-native-paper'
import { Overlay } from 'react-native-elements'
import moment from 'moment'
const DateRange = ({ label,input, from,to, onSelected }) => {
  const [show, setShow] = useState(false)
  const [fromDate, setFrom] = useState(from)
  const [toDate, setToDate] = useState(to)
  const [mintodate,setMintodate] = useState(new Date())
  
  const toggleOverlay = () => {
    setShow(!show)
  }
  useEffect(()=>{
    var fDate = moment(fromDate, 'DD-MMM-YYYY')
    var todayDate = moment(new Date(), 'DD-MMM-YYYY') 
    var tDate = moment(toDate, 'DD-MMM-YYYY') 
    var resultDaysDiff1 = fDate.diff(todayDate, 'days')+1
    var resultDaysDiff = tDate.diff(fDate, 'days')
    console.log({resultDaysDiff})
    const myCurrentDate = new Date()
    var myFutureDate = new Date(myCurrentDate)
    myFutureDate.setDate(myFutureDate.getDate() + resultDaysDiff1)
    setMintodate(myFutureDate)
    if(resultDaysDiff<0)
    {
      setToDate(fromDate)
    }
  },[fromDate,toDate])
  return (
    <View style={styles.flexBox}>      
      <Text style={styles.labelStyle}>{label}</Text>
      <TouchableOpacity
        style={styles.viewStyles}
        onPress={() => {
          setShow(true)
        }}
      >
        <Text style={styles.textStyle}>{input}</Text>
        <AntDesign name="calendar" size={24} color="#d00000" />
      </TouchableOpacity>

      <Overlay
        overlayStyle={{
          flex: 1,
          width: '80%',
          margin: 30,
          height:300
        }}
        isVisible={show}
        onBackdropPress={toggleOverlay}
      >
        <View style={{height:70}}>
      
        <DateDailog
        label='From'
          input={fromDate}
          onSelected={(value) => 
            {
              setFrom(value)
              
          }}
        ></DateDailog>
        </View>
        <View style={{height:70}}>
        
        <DateDailog
          label='To'
        input={toDate}
        minimumDate={mintodate}
        onSelected={(value) => setToDate(value)}
        ></DateDailog>      
        </View>
        <TouchableOpacity
                style={styles.applyButtonStyle}
                onPress={() => {
                  setShow(false)
                  onSelected(fromDate,toDate)
                }}
              >
                <Text style={{ color: 'white' }}>Ok</Text>
              </TouchableOpacity>
      

        </Overlay>

   
    </View>
  )
}

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
  },
  labelStyle: {
    marginTop: 2,
    fontSize: 13,
    paddingLeft: 2,
    paddingTop:8,
    paddingBottom:4,
    paddingLeft:16,
    color: 'black',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
  },
  applyButtonStyle: {
    backgroundColor: '#002176',
    borderRadius: 8,
    height: 30,
    alignSelf:'center',    
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
    alignSelf: 'center',
    paddingLeft:10,
    fontFamily: 'Montserrat',
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
    width:'90%',
    alignSelf:'center'

  },
})

export { DateRange }
