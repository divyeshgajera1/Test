import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavMenu from './NavMenu';
import LoginMobile from '../screens/auth/LoginMobile';
import { Location } from '../screens/auth/Location';
import NavMain from './NavMain';
import LoginScreenCustomer from '../screens/authAdmin/LoginScreenVendor';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import Sigin from '../screens/auth/Sigin';
const Stack = createStackNavigator();

export default function NavAuth() {
  return (
    <Stack.Navigator> 
      {/* <Stack.Screen
        name="LoginWithMobile"
        component={LoginMobile}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="Login"
        component={Sigin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={NavMenu}
        options={{
          headerShown:false,
          headerBackTitleVisible:false,
          headerTransparent:false,
          headerTitle: 'Hi,'
        }}

      />
      
    </Stack.Navigator>
  );
}
