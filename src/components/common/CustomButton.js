import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'


const CustomButton = ({
  type,
  containerStyle,
  title,
  titleStyle,
  buttonStyle,
  onPress,
  loading,
  disabled,
}) => {
  return (
    <Button
      type={type}
      title={title}
      titleStyle={[styles.title, titleStyle]}
      containerStyle={[styles.container, containerStyle]}
      buttonStyle={[styles.button, buttonStyle]}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
    />
  )
}

export { CustomButton }

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  button: {
    borderRadius: 12,
    minWidth:120,
    backgroundColor: '#d00000',
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 14,
  },
})
