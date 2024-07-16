import React, {useState, useContext, useEffect, useRef} from 'react';
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
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import logo from '../../../assets/LogoRound.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as AuthContext} from '../../context/AuthContext';
import {KeyboardAvoidingView} from 'react-native';
import OTPInput from '../../components/common/OTPInput';
import {Input} from 'react-native-elements';
const LoginMobile = ({navigation, route}) => {
  const [mobileNo, setMobile] = useState('');
  const [OTP, setOTP] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const [showGetOTP, setShowGetOTP] = useState(true); 
  const {
    state: {auth,user},verifyOTP,
  } = useContext(AuthContext);
  const {loading}=auth
  const {login} = useContext(AuthContext);
  const [seconds, setSeconds] = useState(30);
  const [OTP1, setOTP1] = useState('');
  const [OTP2, setOTP2] = useState('');
  const [OTP3, setOTP3] = useState('');
  const [OTP4, setOTP4] = useState('');
  var istInput = useRef(null);
  var secondInput = useRef(null);
  var thirdInput = useRef(null);
  var fourthInput = useRef(null);
  useEffect(() => {
    if (seconds > 0 && timerStarted) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds, timerStarted]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const remainingSeconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const startTimer = () => {
    setTimerStarted(true);
  };
  const enterOTP = `${OTP1}${OTP2}${OTP3}${OTP4}`;
   const otp=auth.user?.otp
   const MobileNo=auth.user?.mobileNo
  const handleKeyPress = (nativeEvent, OTP_INPUT, FOCUS_INOUT) => {
    if (nativeEvent.key === 'Backspace') {
      if (OTP_INPUT == '') {
        FOCUS_INOUT.current.focus();
      }
    }
  };
  const handleSubmitEditing = ref => {
    ref.current.focus();
  };
  const handleOnChangeText = (val, FOCUS_INPUT) => {
    if (val.length == '1') {
      handleSubmitEditing(FOCUS_INPUT);
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/imageBg.png')}
      style={styles.imageBackground}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <Image source={logo} style={styles.logo} />
          <Text></Text>
          <Text style={styles.loginStyle}>Register Now!</Text>
        </View>

        <View style={styles.TextInput}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="cellphone"
              size={30}
              color="black"
              style={styles.icon}
            />
            <View style={styles.line} />
            <TextInput
              placeholder="Enter Mobile"
              placeholderTextColor="black"
              value={mobileNo}
              style={{color:'black'}}
              keyboardType="numeric"
              onChangeText={value => setMobile(value)}
            />
          </View>

          <View>
            <Text></Text>
            <Text
              style={{
                color: 'black',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              Enter OTP
            </Text>
            <Text></Text>
            <View style={styles.flexStyleOTP}>
              <Input
                ref={istInput}
                maxLength={1}
                keyboardType="phone-pad"
                containerStyle={styles.containerStyleOTP}
                inputContainerStyle={styles.inputContainerStyleOTP}
                inputStyle={styles.inputStyleOTP}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(nativeEvent, OTP1, istInput)
                }
                onChangeText={val => {
                  setOTP1(val);
                  handleOnChangeText(val, secondInput);
                }}
                onSubmitEditing={() => handleSubmitEditing(secondInput)}
              />

              <Input
                ref={secondInput}
                maxLength={1}
                keyboardType="phone-pad"
                containerStyle={styles.containerStyleOTP}
                inputContainerStyle={styles.inputContainerStyleOTP}
                inputStyle={styles.inputStyleOTP}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(nativeEvent, OTP2, istInput)
                }
                onChangeText={val => {
                  setOTP2(val);
                  handleOnChangeText(val, thirdInput);
                }}
                onSubmitEditing={() => handleSubmitEditing(thirdInput)}
              />

              <Input
                ref={thirdInput}
                maxLength={1}
                keyboardType="phone-pad"
                containerStyle={styles.containerStyleOTP}
                inputContainerStyle={styles.inputContainerStyleOTP}
                inputStyle={styles.inputStyleOTP}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(nativeEvent, OTP3, secondInput)
                }
                onChangeText={val => {
                  setOTP3(val);
                  handleOnChangeText(val, fourthInput);
                }}
                onSubmitEditing={() => handleSubmitEditing(fourthInput)}
              />
              <Input
                ref={fourthInput}
                maxLength={1}
                keyboardType="phone-pad"
                containerStyle={styles.containerStyleOTP}
                inputContainerStyle={styles.inputContainerStyleOTP}
                inputStyle={styles.inputStyleOTP}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(nativeEvent, OTP4, thirdInput)
                }
                onChangeText={val => {
                  setOTP4(val);
                  handleOnChangeText(val, istInput);
                }}
              />
            </View>
          </View>
        </View>
        {showGetOTP && (
          <TouchableOpacity
            style={styles.buttonstyles}
            onPress={() => {
              if (mobileNo === '' || mobileNo.length < 10) {
                // Show an alert or perform any other action to inform the user
                Alert.alert(
                  'Invalid Mobile Number',
                  'Please enter a valid mobile number.',
                );
              } else {
                setShowGetOTP(false);
                login(mobileNo);
                startTimer();
              }
            }}>
            <Text
              style={{
                fontWeight: 700,
                fontSize: 16,
                alignSelf: 'center',
                fontFamily: 'Trebuchet MS',
                color: 'white',
              }}>
              Get OTP
            </Text>
        
          </TouchableOpacity>
        )}
        {!showGetOTP && (
          <TouchableOpacity
            style={styles.buttonstyles}
            onPress={() => {
              verifyOTP(otp,enterOTP,MobileNo,auth.user);
            }}>
            <Text
              style={{
                fontWeight: 700,
                fontSize: 16,
                alignSelf: 'center',
                fontFamily: 'Trebuchet MS',
                color: 'white',
              }}>
              VERIFY
            </Text>
          </TouchableOpacity>
        )}
        {loading === true ? (
                            <>
                                <ActivityIndicator size='small' color='red' alignSelf='center'></ActivityIndicator>
                            </>
                        ) : null}
        <Text></Text>
        {timerStarted && (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}>
              {formatTime(seconds)} {''}
            </Text>
            <Text style={{fontSize: 15, color: 'black'}}>Resend</Text>
          </View>
        )}
        <View></View>
      </KeyboardAvoidingView>
     </ImageBackground>
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
    width: 85,
    height: '35%',
  },
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '1%',
    bottom: '10%',
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
  buttonstyles: {
    width: 141,
    height: 52,
    borderRadius: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    right: 7,
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
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
  flexStyleOTP: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width * 0.9,
  },
  containerStyleOTP: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.1,
  },
  inputContainerStyleOTP: {
    // borderBottomWidth: 1,
    // borderWidth: 0,
    // borderColor: '#bbb',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },
  inputStyleOTP: {
    color: 'black',
    textAlign: 'center',
  },
});

export default LoginMobile;
