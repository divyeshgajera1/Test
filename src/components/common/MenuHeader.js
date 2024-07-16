import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'

const MenuHeader = ({ title }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.textStyle}>{title}</Text>
    </Card>
  )
}

export { MenuHeader }

const styles = StyleSheet.create({
  cardContainer: {
    margin: 1,
    padding: 0,
    elevation: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  textStyle: {
    backgroundColor: 'red',
    color: 'white',
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
})
