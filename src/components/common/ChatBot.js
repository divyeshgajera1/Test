import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { CardView } from './CardView'
import {  Platform } from 'react-native'
const ChatBot = ({ onPress, source, label, label2 }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <CardView style={styles.cardStyle}>
          <Image
            source={source}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
              resizeMode: 'stretch',
            }}
          />
        </CardView>

        <Text style={styles.labelStyles}>{label.split(' ')[0]}</Text>
        {label.split(' ').length>1?(
        <Text style={styles.labelStyles}>{label.split(' ')[1]}</Text>
        ):null}
      </View>
    </TouchableWithoutFeedback>
  )
}

export { ChatBot }

const styles = StyleSheet.create({
  cardStyle: { borderRadius: 99, marginBottom: 6 },
  labelStyles: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 10,
    fontFamily: 'MontserratBold',
  },
})
