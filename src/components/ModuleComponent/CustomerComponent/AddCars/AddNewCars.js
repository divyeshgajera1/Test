import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {NewDropdown} from '../../../../components/common/NewDropdown';
import {Input} from '../../../../components/common/Input';
import {Context as VehicleContext} from '../../../../context/VehicleContext';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import {BottomTabView} from '../../../common/TabView';
import {Context as AuthContext} from '../../../../context/AuthContext';
import {Context as CMNContext} from '../../../../context/CMNContext';
var SCREEN_WIDTH = Dimensions.get('screen').width;
function AddNewCars({navigation}) {
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  var VehicleRef = useRef(null);
  const {
    state: {form, loading},
    VehicleUpate,
    SaveVehicleDetails,
    FetchVehicleData,
    resetForm
  } = useContext(VehicleContext);
  const {
    state: {FetchDetail},
    FetchMake,
    FetchModel,
  } = useContext(CMNContext);
  useEffect(() => {
    FetchMake();
  }, []);
  const {MakeList, ModelList} = FetchDetail;
  const {category, categoryId, model, modelId, color, colorId, vehicleNo} =
    form;
  const [selectedImage, setSelectedImage] = useState('null');
  const [fileName, setFileName] = useState(null);
  const [contentType, setContentType] = useState('');
  const [filebase64, setFilebase64] = useState('');
  const [pictureError, setPictureError] = useState('');
  const [CategoryVisible, setCategoryVisible] = useState(false);
  const [ModelVisible, setModelVisible] = useState(false);
  const [ColorVisible, setColorVisible] = useState(false);
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
      .then(images => {
        console.log('Selected Image : ' + JSON.stringify(images));
        const fileName = images?.path.split('/').pop();
        setSelectedImage(images?.path);
        setFileName(fileName);
        setContentType(images?.mime);
        setFilebase64(images?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchVehicleData(userid);
    resetForm()
  }, [userid]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={[styles.flexbox, {paddingLeft: 4}]}>
          <View style={[styles.flexbox, {paddingLeft: 4}]}>
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
                  textAlign: 'center',
                  padding: 10,
                }}>
               my vehicles
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.MainContainer}>
            <NewDropdown
              input={category}
              isVisible={CategoryVisible}
              data={MakeList.map(make => ({
                ID: make.id.toString(),
                Description: make.typeName,
              }))}
              onSelected={(id, value) => {
                VehicleUpate({prop: 'category', value: value});
                VehicleUpate({prop: 'categoryId', value: id});
                VehicleUpate({prop: 'model', value: 'Select Model'});
                VehicleUpate({prop: 'modelId', value: 0});
                FetchModel(id);
              }}
            />
            <NewDropdown
              input={model}
              isVisible={ModelVisible}
              data={ModelList.filter(function (el) {
                return el.vehicleTypeId == categoryId;
              }).map(model => ({
                ID: model.id.toString(),
                Description: model.modelName,
              }))}
              onSelected={(id, value) => {
                VehicleUpate({prop: 'model', value});
                VehicleUpate({prop: 'modelId', value: id});
              }}
            />

            <NewDropdown
              input={color}
              isVisible={ColorVisible}
              data={[
                {ID: '1', Description: 'Red'},
                {ID: '2', Description: 'Blue'},
                {ID: '3', Description: 'Green'},
                {ID: '4', Description: 'White'},
                {ID: '5', Description: 'Black'},
                {ID: '6', Description: 'Grey'},
              ]}
              onSelected={(id, value) => {
                VehicleUpate({prop: 'color', value});
                VehicleUpate({prop: 'colorId', value: id});
              }}
            />
            <Input
              placeholder="Enter Vehicle No"
              // onChangeText={handleTextChange}
              style={{width: '100%', color: 'black'}}
              value={vehicleNo}
              focus={VehicleRef}
              onChangeText={value => VehicleUpate({prop: 'vehicleNo', value})}
            />
            <Text></Text>
            <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={30}
                color="black"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            {selectedImage !== 'null' ? (
              <Image
                source={{uri: selectedImage}}
                style={styles.profileImage}
              />
            ) : null}
            {pictureError ? (
              <Text style={styles.errorText}>{pictureError}</Text>
            ) : null}
            <Text></Text>
            <Button
              style={styles.buttonStyle}
              labelStyle={{color: 'white'}}
              onPress={() => {
                if (categoryId == 0) {
                  setCategoryVisible(false);
                  Alert.alert(
                    'Alert',
                    'Please select Make',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          setCategoryVisible(true);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                  return false;
                } else if (modelId == 0) {
                  setModelVisible(false);
                  Alert.alert(
                    'Alert',
                    'Please select Model',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          setModelVisible(true);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                  return false;
                } else if (colorId == 0) {
                  setColorVisible(false);
                  Alert.alert(
                    'Alert',
                    'Please select Color',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          setColorVisible(true);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                  return false;
                } else if (vehicleNo == '') {
                  Alert.alert(
                    'Alert',
                    'Please Enter Vehicle No',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          VehicleRef.current.focus();
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                  return false;
                } else if (selectedImage === 'null') {
                  Alert.alert(
                    'Alert',
                    'Please select an image',
                    [
                      {
                        text: 'OK',
                        onPress: () => {},
                      },
                    ],
                    {cancelable: false},
                  );
                  return false;
                } else {
                  SaveVehicleDetails({
                    id: user?.id,
                    Type: 'Vehicle',
                    FileName: fileName == null ? 'null' : fileName,
                    ContentType: contentType,
                    Filebase64: filebase64,
                    category,
                    model,
                    color,
                    vehicleNo,
                  });
                  setTimeout(() => {
                    FetchVehicleData(userid);
                    navigation.goBack();
                    resetForm();
                  }, 3000); // 5000 ms = 5 seconds
                }
              }}>
              Submit
            </Button>
            <Text></Text>
                {loading ? <ActivityIndicator size="large" color="red" /> : null}
          </View>
        </ScrollView>
        <BottomTabView navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default AddNewCars;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  MainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
    width: '49%',
    minWidth: 200,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 10,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    // borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
    // color: 'black',
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#8a8aed',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
});
