import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Dimensions } from 'react-native'

const LangDD = ({ label, input, onPress }) => {
  return (
    <View style={styles.flexBox}>
      
      <Text style={styles.labelStyle}>{label}</Text>
      <TouchableOpacity style={styles.viewStyles} onPress={onPress}>
        <Text style={styles.textStyle}>{input}</Text>
        <Ionicons name='ios-arrow-down' size={20} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
    width:Dimensions.get('window').width*.84
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
    flex: 1,
    color: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    paddingStart: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  viewStyles: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 1,
  },
})

export { LangDD }
