import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native'

const List = ({ type, title, onPress, loading, disabled }) => {
  return <View style={styles.item}></View>
}

export { List }

const styles = StyleSheet.create({
  flexbox: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 4,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    padding: 5,
  },
  viewStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 8,
  },
  name: {
    paddingBottom: 5,
    fontSize: 17,
    fontWeight: '700',
  },
})
