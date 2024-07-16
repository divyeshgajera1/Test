import React, { useContext, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { Context as AuthContext } from '../context/AuthContext'
const Logout = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext)

  useEffect(() => {
    Alert.alert(
      'Logout',
      'Do you want to Logout?',
      [
        {
          text: 'No',
          onPress: () => 
          {
            console.log('Cancel Pressed')
            navigation.goBack()
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            signout()
          },
        },
      ],
      { cancelable: false }
    )
  }, [])
  return <View></View>
}

export default Logout

const styles = StyleSheet.create({})
