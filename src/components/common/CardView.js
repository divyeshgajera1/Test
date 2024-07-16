import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'

const CardView = ({ children, style }) => {
  return <Card containerStyle={[styles.cardContainer, style]}>{children}</Card>
}

export { CardView }

const styles = StyleSheet.create({
  cardContainer: {
    margin: 0,
    padding: 0,
    elevation: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
})
