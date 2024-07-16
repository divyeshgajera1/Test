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
import Home from '../../screens/Admin/Home/Home';
import Profile from '../../screens/Admin/Profile/Profile';
import Orders from '../../screens/Admin/Order/Orders';
import Categories from '../../screens/Admin/Categories/Categories';
import Product from '../../screens/Admin/Product/Product';
import Banners from '../../screens/Admin/Banners/Banners';
import Client from '../../screens/Admin/Client/Client';
import Payment from '../../screens/Admin/Payment/Payment';
import Notification from '../../screens/Admin/Notification/Notification';
import Offers from '../../screens/Admin/Offer/Offers';
import About from '../../screens/Admin/About/About';
import Help from '../../screens/Admin/Help/Help';
import Setting from '../../screens/Admin/Setting/Setting';
import TermConditions from '../../screens/Customer/TermCondition/TermConditions';
import Logout from '../../screens/Logout';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const {width} = Dimensions.get('window');
const LOGO_W = width * 0.5 - 70;

const bgColorTabActive = '#FEC7C7';

// const Tab = createMaterialBottomTabNavigator();

//   function BottomTabs() {
//     return (
//       <Tab.Navigator
//         initialRouteName='Main_Home'
//         activeColor='black'
//         shifting={true}
//         barStyle={{
//           backgroundColor: 'white',
//             height:'9%',
//         }}
//         >
//       <Tab.Screen
//           name="Bottom_Home"
//           component={NavHome}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home-outline" color='#9F9F9F' size={30} />
//             ),
//             tabBarLabel:'Home'
//           }}
//         />
//         <Tab.Screen
//           name="Bottom_Category"
//           component={NavOrder}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="car" color='#9F9F9F' size={30} />
//             ),
//             tabBarLabel:'Category'
//           }}
//         />
//         <Tab.Screen
//           name="Bottom_Order"
//           component={NavFavourite}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="briefcase-outline" color='#9F9F9F' size={30} />
//             ),
//             tabBarLabel:'Orders'
//           }}
//         />
//         <Tab.Screen
//           name="Bottom_Profile"
//           component={NavProfile}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="account-circle-outline" color='#9F9F9F' size={30} />
//             ),
//             tabBarLabel:'Profile'
//           }}
//         />
//       </Tab.Navigator>
//     );
//   }

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
                color="#400050"
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
                color="#400050"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="My Orders"
          component={NavOrder}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="briefcase-outline"
                color="#400050"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="My Categories"
          component={NavCategories}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="warehouse"
                color="#400050"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="My Product"
          component={NavProduct}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="plus-box-multiple-outline"
                color="#400050"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="My Banners"
          component={NavBanner}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="flag-outline"
                color="#400050"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="My Client"
          component={NavClient}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="account-multiple"
                color="#400050"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="My Payments"
          component={NavPayments}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="card-account-details-outline"
                color="#400050"
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
                color="#400050"
                size={30}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Offers"
          component={NavOffer}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons name="sale" color="#400050" size={30} />
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
                color="#400050"
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
                color="#400050"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={NavSetting}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color="#400050"
                size={30}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="T & C and Disclaimer"
          component={NavTermAndCond}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name="file-certificate-outline"
                color="#400050"
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
              <MaterialCommunityIcons name="logout" color="#400050" size={30} />
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
          backgroundColor: 'white',
          height: 85,
          paddingLeft: 10,
          paddingRight: 8,
          flexWrap: 'wrap',
          paddingBottom: 40,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Image
            source={require('../../../assets/DrawerIcon.jpg')}
            style={{width: 280, height: 90, right: 10}}
          />
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginTop: Dimensions.get('window').width * 0.1,
              alignSelf: 'flex-start',
              marginLeft: Dimensions.get('window').width * 0.012,
            }}></Text>
          <View></View>
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
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreenVendor"
        component={Home}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
      {/*
         <Stack.Screen
        name="CustomerProfile"
        component={Profile}
        options={{
          headerTitle: ' ',
          headerBackground:()=>(
            <ImageBackground
              source={require('../../assets/DrawerImage.png')} 
              style={{width:400,height:100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
              //     onPress={() => {
               
              //  navigation.navigate('Favourite Item'); 
              //      }}
                />
              </TouchableOpacity>
             
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30}/>
              </TouchableOpacity>
              <Image
                source={require('../../assets/logo_1.png')}
                style={{ width: 64, height: 65, marginLeft: LOGO_W,top:18}}
              />
            </View>
          ),
        }}
      />
        <Stack.Screen
        name="MyAddress"
        component={Address}
        options={{
          headerTitle: ' ',
          headerBackground:()=>(
            <ImageBackground
              source={require('../../assets/DrawerImage.png')} 
              style={{width:400,height:100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
              //     onPress={() => {
               
              //  navigation.navigate('Favourite Item'); 
              //      }}
                />
              </TouchableOpacity>
             
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30}/>
              </TouchableOpacity>
              <Image
                source={require('../../assets/logo_1.png')}
                style={{ width: 64, height: 65, marginLeft: LOGO_W,top:18}}
              />
            </View>
          ),
        }}
      /> 
           <Stack.Screen
        name="Review_Order"
        component={PlaceOrder}
        options={{
          headerTitle: ' ',
          headerBackground:()=>(
            <ImageBackground
              source={require('../../assets/DrawerImage.png')} 
              style={{width:400,height:100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
              //     onPress={() => {
               
              //  navigation.navigate('Favourite Item'); 
              //      }}
                />
              </TouchableOpacity>
             
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30}/>
              </TouchableOpacity>
              <Image
                source={require('../../assets/logo_1.png')}
                style={{ width: 64, height: 65, marginLeft: LOGO_W,top:18}}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{
          headerTitle: ' ',
          headerBackground:()=>(
            <ImageBackground
              source={require('../../assets/DrawerImage.png')} 
              style={{width:400,height:100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
              //     onPress={() => {
               
              //  navigation.navigate('Favourite Item'); 
              //      }}
                />
              </TouchableOpacity>
             
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30}/>
              </TouchableOpacity>
              <Image
                source={require('../../assets/logo_1.png')}
                style={{ width: 64, height: 65, marginLeft: LOGO_W,top:18}}
              />
            </View>
          ),
        }}
      />
       <Stack.Screen
        name="ProductDetail"
        component={ProductDescription}
        options={{
          headerTitle: ' ',
          headerBackground:()=>(
            <ImageBackground
              source={require('../../assets/DrawerImage.png')} 
              style={{width:400,height:100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
              //     onPress={() => {
               
              //  navigation.navigate('Favourite Item'); 
              //      }}
                />
              </TouchableOpacity>
             
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30}/>
              </TouchableOpacity>
              <Image
                source={require('../../assets/logo_1.png')}
                style={{ width: 64, height: 65, marginLeft: LOGO_W,top:18}}
              />
            </View>
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}
export function NavProfile({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorProfile"
        component={Profile}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavOrder({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyOrder"
        component={Orders}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavCategories({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCategories"
        component={Categories}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavProduct({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavBanner({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My_Banners"
        component={Banners}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavClient({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Client"
        component={Client}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavPayments({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payments"
        component={Payment}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
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
        name="Notify"
        component={Notification}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavOffer({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyOffer"
        component={Offers}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
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
        component={About}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
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
        name="My_Help"
        component={Help}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavSetting({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function NavTermAndCond({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Terms_Cond"
        component={TermConditions}
        options={{
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
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
          headerTitle: ' ',
          headerBackground: () => (
            <ImageBackground
              source={require('../../../assets/DrawerImage.png')}
              style={{width: 400, height: 100}}
            />
          ),
          headerShown: 'true',
          headerTitleStyle: {color: 'white'},
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  color="white"
                  size={30}
                  //     onPress={() => {

                  //  navigation.navigate('Favourite Item');
                  //      }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 15}}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <MaterialCommunityIcons name="menu" color="white" size={30} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/logo.png')}
                style={{width: 64, height: 65, marginLeft: LOGO_W, top: 18}}
              />
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
