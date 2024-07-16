import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  PermissionsAndroid,
  StatusBar,
  Platform,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context as AuthContext} from '../context/AuthContext';
import NavAuth from './NavAuth';
import NavMenu from './NavMenu';
import Navmenu from './AdminRoute/NavMenu';
import {useFocusEffect} from '@react-navigation/native';
import {global} from './../../Globals';
import SpInAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';
const SubContainer = createStackNavigator();

export const NavInit = () => {
  const {state, login} = useContext(AuthContext);
  const {getUserData} = useContext(AuthContext);
  const {loggedIn, user} = state.auth;
  const [needsUpdate, setNeedsUpdate] = useState(null);
  const [UpdateAppData, setUpdateAppData] = useState(null);
  const [error, setError] = useState(null);
  const inAppUpdates = new SpInAppUpdates(false);
  useFocusEffect(
    React.useCallback(() => {
      checkApplicationPermission();
      checkForUpdates();
      console.log('update',UpdateAppData)
    }, []),
  );


  const checkForUpdates = () => {
    const curVersion = global.ANDROIDVERSION  
    console.log(curVersion,'version')
    inAppUpdates
      .checkNeedsUpdate()
      .then(result => {
        console.log('res',result)
        setNeedsUpdate(result.shouldUpdate);
        setUpdateAppData(result);
        if (result.shouldUpdate) {
          setTimeout(()=>{
            startUpdating();
          }, 1000)      
        }
      })
      .catch(error => {
        setError(error);
      });
  };
  const startUpdating = () => {
   
    let updateOptions = {};
    if (Platform.OS === 'android') {
      updateOptions = {
      updateType: IAUUpdateKind.IMMEDIATE,
      };
    } else {
      updateOptions = {
        title: 'Update available',
        message:
          'There is a new version of the app available on the App Store, do you want to update it?',
        buttonUpgradeText: 'Update',
        buttonCancelText: 'Cancel',
        country: 'it', 
      };
    }
    inAppUpdates.addStatusUpdateListener(onStatusUpdate);
    inAppUpdates.startUpdate(updateOptions);
};
const onStatusUpdate = event => {
  console.log(`@@ ${JSON.stringify(event)}`);
};

useEffect(() => {
  let timeout;
  if (needsUpdate) {
    timeout = setTimeout(() => {
       startUpdating()
       //navigation.navigate('NewUpdate',{needsUpdates:needsUpdate});
    }, 1000);
  }
  return () => clearTimeout(timeout);
}, [needsUpdate]);
useEffect(()=>{
  if(UpdateAppData?.shouldUpdate){
    checkForUpdates();
  }
},[UpdateAppData])
  useFocusEffect(
    React.useCallback(() => {
      checkApplicationPermission();
      _getLocationPermission();
    }, []),
  );
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          Alert.alert(
            'Notification Permission Required',
            'You will not receive Notifications. Do you want to allow Notifications',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => openAppSettings(),
              },
            ],
            {cancelable: false},
          );
        }
      } catch (error) {
        console.error('Permission Error: ', error);
      }
    }
  };
  async function _getLocationPermission() {
    if (Platform.OS === 'android') {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  }
  }
  useEffect(() => {
    if (Platform.OS === 'ios') {
      //_getLocationAsync();
    } else {
      try {
        console.log('granted');
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log({granted, ag: PermissionsAndroid.RESULTS.GRANTED});
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //_getLocationAsync();
        } else {
          //_getLocationAsync();
          //  _getLocationPermission()
          // alert("Location permission denied");
          // Linking.openSettings()
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  const openAppSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SubContainer.Navigator>
      <>
        {loggedIn == true ? (
          <SubContainer.Screen
            name="Main"
            component={NavMenu}
            options={{headerShown: false}}
          />
        ) : (
          <SubContainer.Screen
            name="Authentication"
            component={NavAuth}
            options={{headerShown: false}}
          />
        )}
      </>
    </SubContainer.Navigator>
  );
};

export default NavInit;
