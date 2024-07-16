import React,{useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavInit from './src/route/NavInit';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as VehicleProvider} from './src/context/VehicleContext';
import {Provider as ServiceProvider} from './src/context/ServiceContext';
import {Provider as AboutProvider} from './src/context/AboutContext';
import {Provider as CommonProvider} from './src/context/CMNContext';
import {Provider as SubscriberProvider} from './src/context/SubscriberContext';
import {Provider as ComplaintProvider} from './src/context/ComplaintContext';
import {Provider as NotificationProvider} from './src/context/NotificationContext';
import {navigationRef} from './src/route/RootNavigation';
import SplashScreen from 'react-native-splash-screen';;
import NetInfo from '@react-native-community/netinfo';
import LottieView from "lottie-react-native";
import DeviceInfo from 'react-native-device-info';
function App(): JSX.Element {
  const [isConnected, setIsConnected] = React.useState(true);
  const [deviceId, setDeviceId] = React.useState('');
  const Tab = createStackNavigator();
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state && state.isConnected !== null && state.isConnected !== undefined) {
        setIsConnected(state.isConnected);
      }
    });  
    // setShowNotification(true);
    return () => {
      unsubscribe();
    };
  }, [])
  const fetchDeviceId = async () => {
    try {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
      console.log('Device ID:', id);
    } catch (error) {
      console.error('Failed to get device ID:', error);
    }
  };

  fetchDeviceId();
const NoNetworkScreen = () => {
    return(
      <LottieView
      // ref={animationRef}
      source={require("./assets/NoInternet.json")}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop
    />
    )
  };
  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator>
          <Tab.Screen
            name="ServiceLane_Customer"
            component={isConnected ? NavInit : NoNetworkScreen}
            options={{
              headerShown: false,
            }}
          />
          
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default () => {
  return (
    
    <AuthProvider>
      <VehicleProvider>
      <ServiceProvider>
        <AboutProvider>
          <CommonProvider>
            <SubscriberProvider>
              <ComplaintProvider>
                <NotificationProvider>
          <App />
          </NotificationProvider>
          </ComplaintProvider>
          </SubscriberProvider>
          </CommonProvider>
          </AboutProvider>
          </ServiceProvider>
          </VehicleProvider>
    </AuthProvider>
  );
};
