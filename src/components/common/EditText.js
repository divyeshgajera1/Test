import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Card } from 'react-native-elements'

const EditText = ({
  label,
  placeholder,
  input,
  onChangeText,
  disabled,
  errorMessage,
  keyboardType,
}) => {
  return (
    <Input
      label={label}
      containerStyle={styles.containerStyle}
      disabled={disabled}
      errorMessage={errorMessage}
      keyboardType={keyboardType}
      inputContainerStyle={styles.inputContainerStyle}
      labelStyle={styles.labelStyle}
      inputStyle={styles.inputStyle}
      placeholder={placeholder}
      input={input}
      onChangeText={onChangeText}
    />
  )
}

export { EditText }

const styles = StyleSheet.create({
  containerStyle: {},
  inputContainerStyle: {
    height: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  labelStyle: {
    paddingLeft: 2,
    margin: 0,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  inputStyle: {
    fontSize: 16,
    color: 'white',
  },
})
