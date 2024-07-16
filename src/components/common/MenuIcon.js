import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const CONTAINER_WIDTH = width * 0.41
const CONTAINER_HEIGHT = height * 0.15

const MenuIcon = ({ title, source, onPress }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image style={styles.imageStyle} source={source} />
        <Text>{title}</Text>
      </TouchableOpacity>
    </Card>
  )
}

export { MenuIcon }

const styles = StyleSheet.create({
  cardContainer: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    borderRadius: 8,
    elevation: 4,
    padding: 1,
    margin: 1,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
})
