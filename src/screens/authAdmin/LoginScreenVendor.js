import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {EditText} from '../../components/common/EditText';
import {useNavigation} from '@react-navigation/native';
import logo from '../../../assets/logo.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as AuthContext} from '../../context/AuthContext';
import {Dimensions} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Input} from '../../components/common/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreenVendor = ({navigation, route}) => {
  let randomOTP;
  const generatePIN = () => {
    randomOTP = Math.floor(1000 + Math.random() * 9000);
    console.log(randomOTP);
  };
  const handleVendorLogin = () => {
    const UserType = 2; 
    login(UserName, Password, UserType);
  };


  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [wait, setwait] = useState(false);
  const auth = useContext(AuthContext);
  const {state,login} = useContext(AuthContext);
  // const loginImageUrl = reques ts.APP_IMAGE_URL + 'login.jpg'
  // const {signin,} = auth;

  const {
    auth: {otpStatus, loading},
  } = state;
  return (
    // <ImageBackground
    //   source={require('../../../assets/ImageBG.png')}
    //   style={styles.imageBackground}>
      <ScrollView style={{flex: 1}}>
        <ImageBackground
          source={require('../../../assets/Ellipse.png')}
          style={styles.UpperContainerImage}>
          <Text style={styles.loginStyle}>Login Now!</Text>
          <KeyboardAvoidingView behavior="padding">
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.TextInput}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <View style={styles.line} />

                <TextInput
                  placeholder="Enter Your USER ID"
                  value={UserName}
                  onChangeText={value => setUserName(value)}
                />
              </View>
              <Text></Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <View style={styles.line} />
                <TextInput
                  placeholder="Enter Password"
                  value={Password}
                  secureTextEntry
                  onChangeText={value => setPassword(value)}
                />
              </View>
            </View>
            <View style={{marginTop: '5%'}}>
            <TouchableOpacity
      style={styles.buttonstyles}
      onPress={handleVendorLogin}
    >
      <Text
        style={{
          fontWeight: 700,
          fontSize: 16,
          alignSelf: 'center',
          fontFamily: 'Trebuchet MS',
          color: '#FFFFFF',
        }}
      >
        SIGN IN
      </Text>
    </TouchableOpacity>
            </View>
            <View style={{marginBottom: 100}}>
              <Text style={styles.TextOR}>OR</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    alignSelf: 'center',
                    fontFamily: 'Trebuchet MS',
                    color: '#FFFFFF',
                  }}>
                  Login Via{'  '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginWithMobile')}>
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      alignSelf: 'center',
                      fontFamily: 'Trebuchet MS',
                      color: '#BC19F5',
                    }}>
                    Mobile Number
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        {/* </View> */}
        <Text></Text>
        <View>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 22,
            alignSelf: 'center',
            fontFamily: 'Trebuchet MS',
            color: '#000000',
          }}>
          Your Spare Place
        </Text>
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: 13,
              alignSelf: 'center',
              fontFamily: 'Trebuchet MS',
              color: '#000000',
            }}>
            Click Here To{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 12,
                alignSelf: 'center',
                fontFamily: 'Trebuchet MS',
                marginRight:10,
                color: '#BC19F5',
                textDecorationLine: 'underline',
              }}>
              Register as Customer
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flexbox: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  logo: {
    width: 116.49,
    height: 120,
    top: 30,
  },
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    backgroundColor: 'white',
    width: '85%',
  },
  imageBackground: {
    // flex: 1,
    flex: 4,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  UpperContainerImage: {
    flex: 1,
    width: 400,
    height: 570,
  },
  buttonstyles: {
    width: 141,
    height: 52,
    top: '30%',
    borderRadius: 5,
    backgroundColor: '#BC19F5',
    justifyContent: 'center',
    alignSelf: 'center',
    right: 5,
  },
  icon: {
    left: 10,
    marginRight: 15,
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 10,
    marginRight: 1,
  },
  loginStyle: {
    fontFamily: 'Trebuchet MS',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    height: '8%',
    top: '5%',
    alignSelf: 'center',
  },
  TextOR: {
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    marginTop: '10%',
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default LoginScreenVendor;
