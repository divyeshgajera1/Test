import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
  return <View style={styles.conatinerStyle}>{props.children}</View>
}

const styles = {
  conatinerStyle: {
    borderBottomWidth: 1,
    padding: 3,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
    borderRadius: 8,
  },
}

export { CardSection }
