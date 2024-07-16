import React, {useState,useContext,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as ComplaintContext} from '../../../context/ComplaintContext';
import {BottomTabView} from '../../common/TabView';
import { ImageComprise } from 'react-native-compressor';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Complaint({navigation}) {
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  const {state:{loading,form},CompaintUpdate, AddComplaint} = useContext(ComplaintContext);
  const {complaintText} = form;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF1',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    headingBottom: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      margin: 20,
    },
    cameraView: {
      width: 200,
      height: 200,
      backgroundColor: isDarkMode ? '#333333' : 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    cameraImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    cameraImagemy: {
      width: 200,
      height: 200,
      // borderRadius: 75,
    },
    textInput: {
      height: 120,
      borderColor: '#e7e0e0',
      borderWidth: 2,
      borderRadius: 5,
      width: '90%',
      padding: 10,
      marginBottom: 20,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      backgroundColor: isDarkMode ? '#333333' : 'white',
      textAlignVertical: 'top',
      marginLeft: 25,
      marginRight: 25,
    },
    buttonStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      backgroundColor: 'black',
      width: '39%',
      minWidth: 120,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'black',
    },
  });
  const [selectedImage, setSelectedImage] = useState('null');
  const [fileName, setFileName] = useState(null);
  const [contentType, setContentType] = useState('');
  const [filebase64, setFilebase64] = useState('');

  // const handleComplaintSubmit = () => {
  //   console.log('Complaint submitted:', complaintText);
  // };
  const CameraPermission = async () => {
    console.log('call permission');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'LBPFS App Camera Permission',
          message:
            'LBPFS App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('grantedCamera', granted);
      grantedCamera = granted;
    } catch (error) {
      console.error('Error while requesting camera permission', error);
    }
  };

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

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Raise Complaint</Text>
        <View style={styles.cameraView}>
          {selectedImage !== 'null' ? (
            <Image source={{uri: selectedImage}} style={styles.cameraImagemy} />
          ) : (
            <TouchableOpacity onPress={selectImage}>
              <MaterialCommunityIcons
                name="camera-outline"
                color="#9F9F9F"
                size={100}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text>Upload the picture</Text>
        <Text style={styles.headingBottom}>Add Comments</Text>
        <TextInput
          placeholder="Enter your complaint"
          style={styles.textInput}
          value={complaintText}
          multiline={true}
          numberOfLines={4}
          onChangeText={value => CompaintUpdate({prop: 'complaintText', value})}
        />
        <Button
          style={styles.buttonStyle}
          labelStyle={{color: 'white', fontWeight: 'bold'}}
          onPress={() => {
            AddComplaint({
              id: userid,
              complaintText:complaintText,
              Type: 'Complaint', 
              FileName: fileName == null ? 'null' : fileName, // Set this based on your requirements
              ContentType: contentType, // Set this based on your requirements
              Filebase64: filebase64, // Set this based on your requirements
            });
            navigation.goBack();
          }}>
          Submit
        </Button>
        {loading ? <ActivityIndicator size="large" color="red" /> : null}
      </View>
      <BottomTabView navigation={navigation} />
    </View>
  );
}
