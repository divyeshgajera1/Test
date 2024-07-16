// import React, {useContext, useEffect, version} from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   View,
//   Text,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import {createStackNavigator} from '@react-navigation/stack';
// const Stack = createStackNavigator();
// import {Context as AuthContext} from '../context/AuthContext';
// import NavMenu from './AdminRoute/NavMenu';
// const {width} = Dimensions.get('window');
// const LOGO_W = width * 0.5 - 50;

// export default function NavMain() {
//   const {state, signout} = useContext(AuthContext);
//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Do you want to Logout?',
//       [
//         {
//           text: 'No',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: () => {
//             signout();
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };
//   return (
//     <Stack.Navigator>
//        <Stack.Screen
//         name="AdminDashboard"
//         component={NavMenu}
//         options={{headerShown: false}}
//       />

      
//     </Stack.Navigator>
//   );
// }
