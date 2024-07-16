// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   useColorScheme,
//   Dimensions,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagePicker from 'react-native-image-crop-picker';
// const SCREEN_WIDTH = Dimensions.get('window').width;

// export default function Complaint() {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF1',
//     },
//     heading: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 20,
//       color: isDarkMode ? '#FFFFFF' : '#000000',
//     },
//     headingBottom: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       alignSelf: 'flex-start',
//       color: isDarkMode ? '#FFFFFF' : '#000000',
//       margin: 20,
//     },
//     cameraView: {
//       width: 200,
//       height: 200,
//       backgroundColor: isDarkMode ? '#333333' : 'white',
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: 20,
//     },
//     cameraImage: {
//       width: 150,
//       height: 150,
//       borderRadius: 75,
//     },
//     cameraImagemy: {
//       width: 200,
//       height: 200,
//       // borderRadius: 75,
//     },
//     textInput: {
//       height: 120,
//       borderColor: '#e7e0e0',
//       borderWidth: 2,
//       borderRadius: 5,
//       width: '90%',
//       padding: 10,
//       marginBottom: 20,
//       color: isDarkMode ? '#FFFFFF' : '#000000',
//       backgroundColor: isDarkMode ? '#333333' : 'white',
//       textAlignVertical: 'top',
//       marginLeft: 25,
//       marginRight: 25,
//     },
//     submitButton: {
//       backgroundColor: 'black',
//       padding: 10,
//       borderRadius: 5,
//     },
//     submitButtonText: {
//       color: 'white',
//     },
//   });
//   const [complaintText, setComplaintText] = useState('');
//   const [selectedImage, setSelectedImage] = useState('null');
//   const [fileName, setFileName] = useState(null);
//   const [contentType, setContentType] = useState('');
//   const [filebase64, setFilebase64] = useState('');

//   const handleComplaintSubmit = () => {
//     // Handle complaint submission logic here
//     console.log('Complaint submitted:', complaintText);
//   };
//   const CameraPermission = async () => {
//     console.log('call permission');
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'LBPFS App Camera Permission',
//           message:
//             'LBPFS App needs access to your camera ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       console.log('grantedCamera', granted);
//       grantedCamera = granted;
//     } catch (error) {
//       console.error('Error while requesting camera permission', error);
//     }
//   };

//   const selectImage = async () => {
//     ImagePicker.openCamera({
//       includeBase64: true,
//       width: SCREEN_WIDTH,
//       height: SCREEN_WIDTH,
//       cropping: false,
//       multiple: false,
//       mediaType: 'photo',
//       multipleShot: false,
//       compressImageQuality: 0.7,
//     })
//       .then(images => {
//         console.log('Selected Image : ' + JSON.stringify(images));
//         const fileName = images?.path.split('/').pop();
//         setSelectedImage(images?.path);
//         // ... Your existing code
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Raise Complaint</Text>
//       <View style={styles.cameraView}>
//         {selectedImage !== 'null' ? (
//           <Image source={{uri: selectedImage}} style={styles.cameraImagemy} />
//         ) : (
//           <TouchableOpacity onPress={selectImage}>
//             <MaterialCommunityIcons
//               name="camera-outline"
//               color="#9F9F9F"
//               size={100}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//       <Text>Upload the picture</Text>
//       {/* <Text style={styles.headingBottom}>Add Comments</Text> */}
//       <TextInput
//         placeholder="Enter your complaint"
//         style={styles.textInput}
//         value={complaintText}
//         multiline={true}
//         numberOfLines={4}
//         onChangeText={text => setComplaintText(text)}
//       />
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleComplaintSubmit}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
