import React, { useContext, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { Context as AuthContext } from '../context/AuthContext'
const DeleteAccount = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext)

  useEffect(() => {
    Alert.alert(
      'Alert',
      'Are you sure want to delete your account?',
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

export default DeleteAccount

const styles = StyleSheet.create({})
