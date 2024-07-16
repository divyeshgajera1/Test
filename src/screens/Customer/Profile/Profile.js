import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Dimensions,
  Platform,
  Share,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { BottomTabView } from '../../../components/common/TabView';
import { Context as AuthContext } from '../../../context/AuthContext';
import { ImageComprise } from 'react-native-compressor';
var grantedCamera = false;
var SCREEN_WIDTH = Dimensions.get('screen').width;

const Profile = ({ navigation }) => {
  const [editing, setEditing] = useState(false); // Track editing state
  const [selectedImage, setSelectedImage] = useState('null');
  const [fileName, setFileName] = useState('null');
  const [contentType, setContentType] = useState('');
  const [filebase64, setFilebase64] = useState('');
  const {
    state: { auth, GetProfile, loading, form },
    SaveProfile,
    FetchProfileData,
    ProfileUpdate,
    getUserData
  } = useContext(AuthContext);
  const { user } = auth
  const { FetchProfile } = GetProfile;
  const { name, email, phoneNo } = form;
  const userid = user?.id
  useEffect(() => {
    FetchProfileData(userid);
    return () => {
      setSelectedImage(null);
    };
  }, []);

  const selectImage = async () => {
    ImagePicker.openCamera({
      includeBase64: true,
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
      cropping: false,
      multiple: false,
      mediaType: 'photo',
      multipleShot: false,
      compressImageQuality: 0.7,
    })
      .then(async images => {
        console.log('Selected Image : ' + JSON.stringify(images));
        const fileName = images?.path.split('/').pop();
        setSelectedImage(images?.path);
        setFileName(fileName);
        setContentType(images?.mime);
        setFilebase64(images?.data);
        const compressedImage = await ImageComprise.compress(images?.path, {
          compressionMethod: 'manual',
          maxWidth: 1000,
          quality: 0.8,
        });
        setFilebase64(compressedImage?.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    ProfileUpdate({ prop: 'name', value: FetchProfile?.name })
    ProfileUpdate({ prop: 'phoneNo', value: FetchProfile?.mobileNo })
    ProfileUpdate({ prop: 'email', value: FetchProfile?.email })
    // setSelectedImage(FetchProfile?.fileName)
  }, [FetchProfile])
  useEffect(() => {
    setSelectedImage(FetchProfile?.fileName)
  }, [FetchProfile])
  const handleSaveProfile = async () => {
    if (!name || !phoneNo || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (editing && !selectedImage) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    SaveProfile({
      id: user?.id,
      Name: name,
      Email: email,
      mobileNo: phoneNo,
      Type: 'Profile', // Assuming the Type property should be 'User'
      FileName: fileName == null ? 'null' : fileName, // Set this based on your requirements
      ContentType: contentType, // Set this based on your requirements
      Filebase64: filebase64, // Set this based on your requirements
      Date: new Date(),
    });
    setEditing(false);
    (userid)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.containr}>
          <View style={[styles.flexbox, { paddingLeft: 4 }]}>
            <View style={[styles.flexbox, { paddingLeft: 4 }]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  color="black"
                  size={30}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    width: Dimensions.get('window').width * 1,
                    flexShrink: 1,
                    color: '#000000',
                    padding: 20,
                  }}>
                  Profile
                </Text>
              </View>
            </View>

          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.profileImageContainer}>
              {selectedImage !== 'null' ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.profileImage}
                />

              ) : (
                <Image
                  // tintColor={'white'}
                  source={require('../../../../assets/profiledemo.png')} // Provide the path to your dummy image
                  style={styles.profileImage}
                />
              )}
              {editing ? (
                // Display edit icon only when editing is enabled
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={selectImage}>
                  <Image
                    source={require('../../../../assets/camera.png')} // Replace with the actual icon path
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="gray"
              value={name}
              editable={editing}
              onChangeText={value => ProfileUpdate({ prop: 'name', value })}
            />

            <TextInput
              style={styles.input}
              placeholder="98888 78888"
              placeholderTextColor="gray"
              value={phoneNo}
              keyboardType="phone-pad"
              editable={editing}
              onChangeText={value => ProfileUpdate({ prop: 'phoneNo', value })}
            />
            <TextInput
              style={styles.input}
              placeholder="email@email.com"
              placeholderTextColor="gray"
              value={email}
              keyboardType="email-address"
              editable={false}
              onChangeText={value => ProfileUpdate({ prop: 'email', value })}
            />
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: editing ? 'black' : '#999' },
              ]}
              onPress={
                editing ? handleSaveProfile : () => setEditing(true) // Toggle editing state
              }>
              <Text style={styles.buttonText}>
                {editing ? 'Save' : 'Edit Profile'}
                {'  '}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => {

              Alert.alert(
                'Alert',
                'Are you sure you want to delete this account?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                    },
                  },
                  {
                    text: 'Delete',
                    onPress: () => {
                      navigation.navigate("Registration")
                    },
                  },
                ],
                { cancelable: true },
              );
              
            }} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ffccce", paddingVertical: 6, borderRadius: 4, justifyContent: "center", marginVertical: 20, width: "90%", alignSelf: "center" }}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/6861/6861362.png" }} // Provide the path to your dummy image
                style={{ width: 16, height: 16 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  color: "red",
                  textAlign: "center",
                  marginLeft: 8
                }}>
                Delete Account
              </Text>
            </TouchableOpacity> */}
          </ScrollView>
          {loading === true ? (
            <>
              <ActivityIndicator
                size="small"
                color="red"
                alignSelf="center"></ActivityIndicator>
            </>
          ) : null}
        </View>
        <BottomTabView index={3} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#333436',
  },
  containr: {
    // flex: 1,
    // paddingBottom: 150,
    // marginBottom: 130,

    flexGrow: 1,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,

    justifyContent: 'center',
    // margin: 10,
    padding: 20,
    // marginBottom:150,
    paddingBottom: 10, // Adjust as needed
  },
  myProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: 'black',
    // textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  flexbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
    // backgroundColor  : 'black',
  },

  editIconContainer: {
    position: 'absolute',
    right: 60,
    bottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 15,
  },
  editIcon: {
    width: 35,
    height: 35,
  },
  updateProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  input: {
    height: 45,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#8a8888',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    color: '#000000',
  },
  passwordEditIconContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  passwordEditIcon: {
    width: 20,
    height: 20,
  },
  saveButton: {
    alignSelf: 'center',
    padding: 10,
    width: 150,
    justifyContent: 'center',
    height: 45,
    marginBottom: 20,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  buttonTextt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
