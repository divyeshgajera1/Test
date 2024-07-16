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
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as AuthContext} from '../../context/AuthContext';
import {Dimensions} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import logo from '../../../assets/LogoRound.png';
import BgImage from '../../../assets/imageBg.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

const Sigin = ({navigation, route}) => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [wait, setwait] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);
  const {state, login} = useContext(AuthContext);

  const handleLogin = () => {
    console.log('Logging in with:', UserName, Password);
    login({
      UserName,
      Password
    });
  };

  const {
    auth: {loading},
  } = state;

  return (
    <ImageBackground source={BgImage} style={styles.imageBackground}>
      <ScrollView>
        <Image source={logo} style={styles.logo} />
        <Text></Text>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Login
        </Text>
        <Text></Text>
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
              placeholder="Enter Your Email ID "
              value={UserName}
              style={styles.input}
              placeholderTextColor="black"
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
              secureTextEntry={!showPassword} 
              style={styles.input}
              placeholderTextColor="black"
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={25}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>
        <Button style={styles.buttonstyles} onPress={handleLogin}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              alignSelf: 'center',
              fontFamily: 'Trebuchet MS',
              color: '#FFFFFF',
            }}>
            Login
          </Text>
        </Button>
        <Text></Text>
        {loading === true ? (
          <>
            <ActivityIndicator
              size="large"
              color="red"
              alignSelf="center"></ActivityIndicator>
          </>
        ) : null}
        <View style={{flexDirection: 'row', paddingLeft: '15%'}}>
          <Text style={{color: 'black',fontSize:18}}>Don't have Account ??? </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Registration')}>
            <Text style={{color: 'red',fontSize:18,textDecorationLine:'underline'}}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: '10%',
    alignSelf: 'center',
  },
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  UpperContainerImage: {
    flex: 1,
    width: 400,
    height: 570,
  },
  buttonstyles: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
    width: '49%',
    minWidth: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  input: {
    color: 'black',
    flex: 1,
  },
});

export default Sigin;
