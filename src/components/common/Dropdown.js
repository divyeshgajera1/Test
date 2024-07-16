import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Dropdown = ({ label, input, onPress, inputContainerStyle, disabled,loading }) => {
  
  return (
    <View style={styles.flexBox}>
      <Text style={styles.labelStyle}>{label}</Text>
      {loading===true?
      <View style={[styles.inputContainerStyles, inputContainerStyle,{justifyContent:'center'}]}>
        <View flexDirection='row'>
        <ActivityIndicator size='small' alignSelf='center' color='red'></ActivityIndicator>
        <Text style={styles.inputStyle}>Loading...</Text>
        </View>
      </View>
      :
      <TouchableOpacity        
        onPress={onPress}
        disabled={disabled}
      >
        <View style={[styles.inputContainerStyles, inputContainerStyle]}>
        <Text style={styles.inputStyle}>{input}</Text>
        <MaterialCommunityIcons name='arrow-down-thick' size={20} color='black' />
        </View>
      </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
    
  },
  labelStyle: {
    marginTop: 4,
    marginBottom: 2,
    fontSize: 13,
    paddingLeft: 12,
    paddingTop:5,
    color: '#000000',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
  },

  inputStyle: {
    flex: 1,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    paddingStart: 5,    
    paddingBottom: 2,
    fontSize: 14,
    flexWrap: 'wrap',

    
  },
  inputContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#d8d8d8',
    width:'100%',
    alignSelf:'center',
    padding:1,

    height:47
  },

})

export { Dropdown }
