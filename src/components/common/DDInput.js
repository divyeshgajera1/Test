import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'

const DDInput = ({
  style,
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType,
  editable,
  multiline,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={{ flex: .5 }} onPress={onPress}>
        <Text style={styles.label}>{value}</Text>
      </TouchableOpacity>
    </View>
  )
}

export { DDInput }

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2
  },
  label: {
    flex: 0.5,
    margin: 1,
    padding: 4,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 12,
    paddingLeft: 2,
    color: 'grey',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 4,
    textTransform: 'capitalize',
    fontFamily: 'TitilliumWeb-Bold',
  },
  subitemsHdr: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'TitilliumWeb-Bold',
    paddingBottom: 0,
    marginTop: 4,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderColor: '#ccc'
  },
  subitems: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'TitilliumWeb-Light',
    padding: 3,
    paddingTop: 0,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
})
