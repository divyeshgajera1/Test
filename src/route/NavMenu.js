import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from '../screens/Logout';
import LoginScreen from '../screens/auth/RegistrationScreen';
import HomeScreen from '../screens/Customer/HomeScreen/HomeScreen';
import Booking from '../screens/Customer/MyBooking/Booking';
import Profile from '../screens/Customer/Profile/Profile';
import Notification from '../screens/Customer/Notification/Notification';
import Offers from '../screens/Customer/Subscription/Subscription';
import AboutUs from '../screens/Customer/About/AboutUs';
import Help from '../screens/Customer/Help/Help';
import Setting from '../screens/Customer/Setting/Setting';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TermConditions from '../screens/Customer/TermCondition/TermConditions';
import SubmitReview from '../components/ModuleComponent/CustomerComponent/SubmitReview/SubmitReview';
import ServiceDetail from '../components/ModuleComponent/CustomerComponent/Service/ServiceDetail';
import Subscription from '../screens/Customer/Subscription/Subscription';
import Complaint from '../components/ModuleComponent/Subscriber/Complaint';
import SubscriberLandingScreen from '../screens/Customer/SubscriberComplaint/SubscriberLandingScreen';
import MyCars from '../components/ModuleComponent/CustomerComponent/AddCars/MyCars';
import AddNewCars from '../components/ModuleComponent/CustomerComponent/AddCars/AddNewCars';
import SubscriptionDetail from '../components/ModuleComponent/Subscriber/SubscriptionDetail';
import PrivacyPolicy from '../screens/Customer/Privacy/PrivacyPolicy';
import LottieView from 'lottie-react-native';
import DeleteAccount from '../screens/DeleteAccount';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const {width} = Dimensions.get('window');
const LOGO_W = width * 0.5 - 70;

const bgColorTabActive = '#FEC7C7';

const Tab = createMaterialBottomTabNavigator();

export function NavMenu({navigation, route}) {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          activeTintColor: '#FA3C3C',
          overlayColor: 'transparent',
          itemStyle: {
            marginVertical: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e9e9e9',
            paddingLeft: 20,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={NavHome}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="home-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={NavProfile}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="My Subscriptions"
          component={NavSubscription}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons name="sale" color="#0096FF" size={30} />
            ),
          }}
        />
        <Drawer.Screen
          name="My Vehicles"
          component={NavCar}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="car-convertible"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={NavNotification}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="bell-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="My Complaints"
          component={NavComplaint}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="file-certificate-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About Us"
          component={NavAbout}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="file-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Privacy Policy"
          component={NavPolicy}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="file-certificate-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />

        {/* <Drawer.Screen
          name="My Booking"
          component={NavBooking}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="briefcase-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        /> */}

        {/* <Drawer.Screen
          name="Settings"
          component={NavSetting}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        /> */}
        <Drawer.Screen
          name="T & C and Disclaimer"
          component={NavTermCond}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="file-certificate-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Help"
          component={NavHelp}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="help-circle-outline"
                color="#0096FF"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons name="logout" color="#0096FF" size={30} />
            ),
          }}
        />
        <Drawer.Screen
        
          name="Delete Account"
          component={DeleteAccount}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            headerTintColor:"red",
            drawerLabelStyle:{color:"red"},
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons name="trash-can" color="red" size={26} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

// CustomDrawerContent implementation
function CustomDrawerContent({...rest}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#0047BD',
          height: 110,
          paddingLeft: 18,
          paddingRight: 8,
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <View
            style={{marginTop: 20, paddingLeft: 18, alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: 20,
                textTransform: 'uppercase',
                paddingTop: 25,
                fontWeight: 'bold',
                flexShrink: 1,
                color: '#fff',
              }}>
              <Text>𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦</Text>
            </Text>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...rest}>
        <DrawerItemList {...rest} />
      </DrawerContentScrollView>
      <View
        style={{
          backgroundColor: '#464646',
          height: 30,
          padding: 8,
          paddingLeft: 8,
          paddingRight: 8,
          flexWrap: 'wrap',
          width: '100%',
        }}>
        <Text style={styles.version}>Version :1:0:1</Text>
      </View>
    </SafeAreaView>
  );
}
export function NavHome({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() => navigation.navigate('Notification')}>
            <MaterialCommunityIcons name="bell" color="white" size={30} />
          </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="yellow" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Subscription_Details"
        component={SubscriptionDetail}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Service_Details"
        component={ServiceDetail}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyCars"
        component={MyCars}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddCars"
        component={AddNewCars}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function NavCar({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCars"
        component={MyCars}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Subscription_Details"
        component={SubscriptionDetail}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Service_Details"
        component={ServiceDetail}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddCars"
        component={AddNewCars}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavProfile({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerProfile"
        component={Profile}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export function NavNotification({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15, width: 50, height: 70}}
              onPress={() => navigation.navigate('Notification')}>
              <LottieView
                source={require('../../assets/notification.json')}
                style={{width: '100%', height: '100%'}}
                autoPlay
                loop
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavSubscription({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Subscription_Details"
        component={SubscriptionDetail}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavAbout({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={AboutUs}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavPolicy({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PolicyAndDisclaimer"
        component={PrivacyPolicy}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavHelp({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HelpAndSupport"
        component={Help}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
// export function NavSetting({navigation}) {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Setting"
//         component={Setting}
//         options={{
//           headerTitle: '',
//           headerStyle: {backgroundColor: '#0047BD'},
//           headerRight: () => (
//             <TouchableOpacity
//               style={{marginRight: 15}}
//               onPress={() => navigation.navigate('Notification')}>
//               <MaterialCommunityIcons name="bell" color="white" size={30} />
//             </TouchableOpacity>
//           ),
//           headerLeft: () => (
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                 <MaterialCommunityIcons
//                   name="menu"
//                   color="white"
//                   size={30}
//                   paddingLeft={10}
//                 />
//               </TouchableOpacity>
//               <Text
//                 style={{
//                   color: 'white',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   paddingLeft: '20%',
//                   alignSelf: 'center',
//                 }}>
//                 {' '}
//                 𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="Notitfy"
//         component={Notification}
//         options={{
//           headerTitle: '',
//           headerStyle: {backgroundColor: '#0047BD'},
//           headerRight: () => (
//             <TouchableOpacity
//               style={{marginRight: 15}}
//               onPress={() => navigation.navigate('Notification')}>
//               <MaterialCommunityIcons name="bell" color="white" size={30} />
//             </TouchableOpacity>
//           ),
//           headerLeft: () => (
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                 <MaterialCommunityIcons
//                   name="menu"
//                   color="white"
//                   size={30}
//                   paddingLeft={10}
//                 />
//               </TouchableOpacity>
//               <Text
//                 style={{
//                   color: 'white',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   paddingLeft: '20%',
//                   alignSelf: 'center',
//                 }}>
//                 {' '}
//                 𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
export function NavTermCond({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TermCondition"
        component={TermConditions}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavComplaint({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="  "
        component={SubscriberLandingScreen}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Complaint"
        component={Complaint}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Service_Details"
        component={ServiceDetail}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavLogOut({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="logout"
        component={Logout}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Notitfy"
        component={Notification}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#0047BD'},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Notification')}>
              <MaterialCommunityIcons name="bell" color="white" size={30} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color="white"
                  size={30}
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '20%',
                  alignSelf: 'center',
                }}>
                {' '}
                𝘚𝘦𝘳𝘷𝘪𝘤𝘦 𝘓𝘢𝘯𝘦{' '}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  version: {
    paddingLeft: 20,
    paddingRight: 8,
    fontSize: 12,
    color: '#fff',
    flexWrap: 'wrap',
  },
});

export default NavMenu;
