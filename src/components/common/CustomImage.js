import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native'

import { CardView } from './CardView'
import { Card } from './Card'

const CustomImage = ({ onPress, source, label, label2, cardStyle, imageStyle, Home }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <View style={[styles.cardStyle, cardStyle]}>
          {label != Home ? (
            <Image
              source={source}
              style={[{
                width: 20,
                alignSelf: 'center',
                height: 20,
                resizeMode: 'contain',

              }, imageStyle]}
            />
          ) : (
            <MaterialCommunityIcons  style={{
              width: 20,
              alignSelf: 'center',
              height: 20,
            }} 
            name="home"
             size={18}
              color="#901010" />
          )}
          <Text style={styles.labelStyles}>{label}</Text>
          {/* {label.split(' ').length > 1 ? (
            <Text style={styles.labelStyles}>{label.split(' ')[1]}</Text>) : null}
          {label.split(' ').length > 2 ? (
            <Text style={styles.labelStyles}>{label.split(' ')[2]}</Text>) : null} */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export { CustomImage }

const styles = StyleSheet.create({
  cardStyle: {
    marginLeft: 4, borderRadius: 10, marginBottom: 1, padding: 4, height: 80,
    minWidth: Dimensions.get('window').width * 0.16,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    
    
  },
  labelStyles: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 11,
    fontFamily: 'TitilliumWeb-Bold',
    width:Dimensions.get('window').width * 0.16,
  },
})
