import React, {useState,useContext,useRef, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import logo from '../../../assets/logo.png';
import {ScrollView} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper'
import {Context as AuthContext} from '../../context/AuthContext';
export const LoginScreen = ({navigation,route}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [colony, setColony] = useState('');
  const [pincode, setPincode] = useState('');
  const [State, setState] = useState('');

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
'Jammu and Kashmir'
    // Add more states as needed
  ];
  const {state,newRegistration} = useContext(AuthContext);
  const {  auth: { loading,} } = state
  const handleSubmit = () => {
    if (!name || !mobile || !flatNo || !colony || !pincode || State === "Select State" || mobile.length < 10) {
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    newRegistration({
      name,
      mobile,
      pincode,
      State,
      colony,
      flatNo,
    })
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
          <Image source={logo} style={styles.logo} />
          <Text></Text>
          <Text style={{color:'black'}}> Your Vehicle, Our Care </Text>
          <Text style={styles.loginStyle}>Complete your Profile </Text>
          
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
              editable={false}
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
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              alignSelf: 'center',
              fontFamily: 'Trebuchet MS',
              color: 'white',
            }}>
            Save
          </Text>
         
        </TouchableOpacity>
        <Text></Text>
        {loading === true ? (
                            <>
                                <ActivityIndicator size='small' color='red' alignSelf='center'></ActivityIndicator>
                            </>
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
    width: 180,
    height: 160,
  },
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    // bottom: '5%',
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
    width:'85%',
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
    marginVertical: 20,
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
