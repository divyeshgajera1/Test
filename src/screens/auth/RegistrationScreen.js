import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import logo from '../../../assets/logo.png';
import {Context as AuthContext} from '../../context/AuthContext';

export const RegistrationScreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [colony, setColony] = useState('');
  const [pincode, setPincode] = useState('');
  const [State, setState] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const statesData = [
    'Select State',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Jammu and Kashmir',
    // Add more states as needed
  ];
  const {state, newRegistration} = useContext(AuthContext);
  const {
    auth: {loading},
  } = state;

  const handleSubmit = () => {
    if (
      !name ||
      !mobile ||
      !flatNo ||
      !colony ||
      !pincode ||
      State === 'Select State'
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert(
        'Invalid Mobile Number',
        'Mobile number should be exactly 10 digits',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }
    if (Password.length <= 6) {
      Alert.alert(
        'Weak Password',
        'Password length should be more than 6 characters',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }
    if (Password !== ConfirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Password and Confirm Password should match',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }

    newRegistration({
      name,
      Email,
      Password,
      mobile,
      pincode,
      State,
      colony,
      flatNo,
    });
  };

  useEffect(() => {
    setMobile(route.params?.mobileNo);
  }, [route.params?.mobileNo]);

  return (
    <ImageBackground
      source={require('../../../assets/imageBg.png')}
      style={styles.imageBackground}>
      <ScrollView>
        <View style={styles.TextInput}>
          <Text></Text>
          <Image source={logo} style={styles.logo} />
          <Text></Text>
          <Text style={{color: 'black'}}>Your Vehicle, Our Care</Text>
          <Text style={styles.loginStyle}>Complete your Profile</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="black"
            value={name}
            style={styles.input}
            onChangeText={text => setName(text)}
          />

          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor="black"
            keyboardType="phone-pad"
            value={mobile}
            style={styles.input}
            onChangeText={text => setMobile(text)}
          />
          <TextInput
            placeholder="Enter EmailID"
            placeholderTextColor="black"
            value={Email}
            style={styles.input}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="black"
            value={Password}
            secureTextEntry
            style={styles.input}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="black"
            value={ConfirmPassword}
            secureTextEntry
            style={styles.input}
            onChangeText={text => setConfirmPassword(text)}
          />

          <TextInput
            placeholder="Flat/House No."
            placeholderTextColor="black"
            value={flatNo}
            style={styles.input}
            onChangeText={text => setFlatNo(text)}
          />

          <TextInput
            placeholder="Society/Colony"
            placeholderTextColor="black"
            value={colony}
            style={styles.input}
            onChangeText={text => setColony(text)}
          />

          <TextInput
            placeholder="Pincode"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={pincode}
            style={styles.input}
            onChangeText={text => setPincode(text)}
          />

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={State}
              onValueChange={itemValue => setState(itemValue)}
              style={styles.dropdown}>
              {statesData.map((stateItem, index) => (
                <Picker.Item
                  key={index}
                  label={stateItem}
                  value={stateItem}
                  color="gray"
                />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonstyles} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <Text></Text>
        {loading === true ? (
          <ActivityIndicator
            size="small"
            color="red"
            alignSelf="center"
          />
        ) : null}
      </ScrollView>
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
    width: 150,
    height: 140,
  },
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
  dropdownContainer: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    height: 50,
    backgroundColor: 'white',
  },
  input: {
    height: 45,
    width: '85%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#D1D5DB',
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 5,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonstyles: {
    width: '60%',
    height: 45,
    borderRadius: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Trebuchet MS',
    color: 'white',
  },
});
