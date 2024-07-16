import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Modal, View, TouchableOpacity, Dimensions } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarPicker from 'react-native-calendar-picker';

// import moment from 'moment'
// import { Button } from 'react-native-elements'
// import { Overlay } from 'react-native-elements/dist/overlay/Overlay'

const DateDailog = ({ label, input,inputContainerStyle, minimumDate, maximumDate, onSelected, isVisible, enabled, msg }) => {
  const [show, setShow] = useState(false)
  const [editable, setEditable] = useState(enabled == undefined ? true : enabled)
  useEffect(() => {
    if (isVisible == true) {
      setShow(true);
    }
  }, [isVisible])
  const toggleOverlay = () => {
    setShow(!show)
  }


  return (
    <View style={[styles.flexBox]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TouchableOpacity
        style={[styles.viewStyles, inputContainerStyle]}
        onPress={() => {

          if (enabled == undefined || enabled) {

            setShow(true)
          }
          else {
            if (msg != undefined) {
              alert(msg)
            }
          }
        }}
      >
        <Text style={[styles.textStyle]}>{input}</Text>
        <MaterialCommunityIcons name="calendar-month" size={24} color="#d00000" />
      </TouchableOpacity>
      {show ? (
        <Modal
          animationType="slide"
          transparent={true}

          visible={show}
          onRequestClose={() => {
            setShow(false);
          }}
        >
          <View style={[styles.modalView, { flexDirection: 'column', marginTop: 150 }]}>
            <View style={{ alignItems: 'flex-end', width: '100%', padding: 5 }}>
              <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }} onPress={() => setShow(false)}>
                <MaterialCommunityIcons
                  name='close-circle-outline'
                  size={22}
                  color='grey'
                // style={{ marginLeft: M_WIDTH * .7 }}
                />
              </TouchableOpacity>
            </View>
            <CalendarPicker
              minDate={minimumDate}
              maxDate={maximumDate}
              scrollable={false}
              restrictMonthNavigation={true}
              width={Dimensions.get('window').width * .9}
              onDateChange={(date) => {
                console.log(date)
                var newdate = new Date(date)
                console.log(newdate.getDate())
                if (date != undefined) {
                  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  setShow(false)
                  var d = newdate.getDate()
                  var M = newdate.getMonth()
                  var y = newdate.getFullYear()
                  d = d < 10 ? '0' + d : d;
                  onSelected(`${d}-${months[M]}-${y}`)
                }
                else {
                  setShow(false)
                }
              }}
            />

          </View>
        </Modal>
        // <DateTimePicker
        //   testID='dateTimePicker'
        //   value={new Date()}
        //   mode='date'
        //   display='default'
        //   minimumDate={minimumDate}
        //   maximumDate={maximumDate}
        //   onChange={(event, date) => {

        //     if(date!=undefined)
        //     {

        //     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //     setShow(false)
        //     var d = date.getDate()
        //     var M = date.getMonth()
        //     var y = date.getFullYear()
        //     d = d < 10 ? '0' + d : d;
        //     onSelected(`${d}-${months[M]}-${y}`)
        //     }
        //     else{
        //       setShow(false)
        //     }
        //   }}
        // />
      ) : null}
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
    paddingTop: 8,
    paddingBottom: 4,
    paddingLeft: 16,
    color: 'black',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
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

  textStyle: {
    color: 'black',
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
    alignSelf: 'center',
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
    width: '92%',
    alignSelf: 'center'

  },
})

export { DateDailog }
