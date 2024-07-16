import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'



const LanguageDropDown = ({ label, input, onPress }) => {
  return (
    <View style={styles.flexBox}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TouchableOpacity style={styles.viewStyles} onPress={onPress}>
        <Text style={styles.textStyle}>{input}</Text>
        <Ionicons name='ios-arrow-down' size={20} color='black' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  flexBox: {
    marginTop: 4,
    marginBottom: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelStyle: {
    paddingLeft: 4,
    flex: 1,
    fontFamily: 'MontserratBold',
    color: 'white',
  },

  textStyle: {
    flex: 0.9,
    color: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    paddingStart: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 16,
    flexWrap: 'wrap',
    fontFamily: 'Montserrat',
  },
  viewStyles: {
    flex: 2,
    height: 33,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#d8d8d8',
  },
})

export { LanguageDropDown }
