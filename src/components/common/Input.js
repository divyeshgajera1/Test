import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'

const Input = ({
  style,
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType,
  editable,
  multiline,
  maxLength,
  secureTextEntry,
  focus,
  onBlur
}) => {
  return (
    <View styles={styles.container}>
      {label==''?null:(
        <>
      <Text style={styles.label}>{label}</Text>
    </>
      )}
      <TextInput
        editable={editable}
        style={[styles.input, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        ref={focus}
      />
    </View>
  )
}

export { Input }

const styles = StyleSheet.create({
  container: {
    padding: 2,
    margin: 2,
  },
  // label: {
  //   marginTop: 2,
  //   fontSize: 15,
  //   paddingLeft: 120,
  //   color: '#AEB0B1',
  //   letterSpacing: 0.8,
  //   fontWeight: 'bold',
  //   textShadowRadius: 0.1,
  //   lineHeight:12,
  //   height:1
  // },
  input: {
    borderWidth: 1,
    textShadowRadius:5,
    borderColor: '#AEB0B1',
    padding: 4,
    paddingLeft:8,
    margin: 4,
    alignSelf:'center',
    borderRadius: 8,
    height:47,
    backgroundColor:'#FFFFFF',
    width:330,
  },
})
