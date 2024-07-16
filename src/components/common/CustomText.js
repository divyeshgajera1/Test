import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const CustomText = ({ style, label }) => {
  return (
    <View style={styles.flexbox}>
      <Text style={[styles.labelStyles, style]}>{label}</Text>
    </View>
  )
}

export { CustomText }

const styles = StyleSheet.create({
  flexbox: {
    marginTop: 4,
    marginBottom: 4,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 40,
    
  },
  labelStyles: {
    paddingLeft: 4,
    flex: 1,
  },
})
