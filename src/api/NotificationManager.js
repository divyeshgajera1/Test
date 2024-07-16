
// import * as Notifications from 'expo-notifications'
// import React, { useState, useEffect, useRef } from 'react'
// import { Platform } from 'react-native'
// import {AsyncStorage} from 'react-native';
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// })

// export default function NotificationManager() {
//   const [expoPushToken, setExpoPushToken] = useState('')
//   const [notification, setNotification] = useState(false)
//   const notificationListener = useRef()
//   const responseListener = useRef()

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         setNotification(notification)
//       }
//     )

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log(response)
//       }
//     )

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener)
//       Notifications.removeNotificationSubscription(responseListener)
//     }
//   }, [])

//   return <></>
// }

// async function registerForPushNotificationsAsync() {
//   let token,fcmToken
//   if (Constants.isDevice) {
    
//     const { status: existingStatus } = await Notifications.getPermissionsAsync()
//     let finalStatus = existingStatus
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync()
//       finalStatus = status
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!')
//       return
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data
//     fcmToken= (await Notifications.getDevicePushTokenAsync()).data
//     saveToken(token,fcmToken)
//   } else {
//     alert('Must use physical device for Push Notifications')
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       sound:true,      
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     })
//   }

//   return token
// }

// const saveToken = async (token,fcmToken) => {
  
//   await AsyncStorage.setItem('fcmToken', fcmToken)
//   .then(() => {
//     console.log({fcmToken})
//     console.log('fcm token was saved successfully')
//   })
//   .catch(() => {
//     console.log('There was an error saving the token')
//   })
//   await AsyncStorage.setItem('token', token)
//     .then(() => {
//       console.log(token)
//       console.log('token was saved successfully')
//     })
//     .catch(() => {
//       console.log('There was an error saving the token')
//     })
// }
