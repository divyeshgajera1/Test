import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const MaterialButton = ({ title, style, titleStyle, onPress }) => {
  return (
    <TouchableOpacity title={title} style={[styles.flexbox, style]} onPress={onPress}>
      <Text style={[styles.textInput, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export { MaterialButton }

const styles = StyleSheet.create({
  flexbox: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginLeft: 16,
    marginRight: 8,
    padding: 8,
    height: 40,
  },

  textInput: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
