import React, { useState, useEffect } from 'react'
import { View, Platform, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'


const DatePicker = ({ value, onSelect }) => {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    if (mode == 'date') {
      var d = currentDate.getDate()
      var m = currentDate.getMonth() + 1
      var y = currentDate.getFullYear()
      onSelect(`${y}-${m}-${d}`)
    } else {
      var h = currentDate.getHours()
      var min = currentDate.getMinutes()
      setTime(`${h}:${min}`)
    }
    setShow(false)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.childContainer}>
          <MaterialIcons name='date-range' size={24} color='red' />
          <Text style={styles.childText}>{value}</Text>
        </View>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  )
}

export { DatePicker }

const styles = StyleSheet.create({
  childContainer: {
    flexDirection: 'row',
    borderWidth: 0.8,
    padding: 2,
    margin: 2,
    alignItems: 'center',
  },

  childText: {
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
})
