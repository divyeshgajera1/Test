import React, {useEffect, useState, useContext} from 'react';
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabView} from '../../../common/TabView';
import {Context as AuthContext} from '../../../../context/AuthContext';
import {Context as VehicleContext} from '../../../../context/VehicleContext';
import {NewDropdown} from '../../../../components/common/NewDropdown';
import {Input} from '../../../../components/common/Input';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
import {Context as CMNContext} from '../../../../context/CMNContext';
import FastImage from 'react-native-fast-image';
import { RefreshControl } from 'react-native';
var grantedCamera = false;
var SCREEN_WIDTH = Dimensions.get('screen').width;
function MyCars({navigation, index}) {
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  const {
    state: {form, getVehicle, loading},
    VehicleUpate,
    FetchVehicleData,
    UpdateVehicleDetail,
  } = useContext(VehicleContext);
  useEffect(() => {
    if(userid){
      FetchVehicleData(userid);
    }
    return () => {
    };
  }, [userid]);
  
  const {
    state: {FetchDetail},
    FetchMake,
    FetchModel,
  } = useContext(CMNContext);
  useEffect(() => {
    FetchMake();
  }, []);
  const {MakeList, ModelList} = FetchDetail;
  const {VehicleGetData} = getVehicle;
  const {category, categoryId, model, modelId, color, colorId, vehicleNo} =
    form;
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [contentType, setContentType] = useState('');
  const [filebase64, setFilebase64] = useState('');
  const [pictureError, setPictureError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const openModal = modelId => {
    const selectedModel = VehicleGetData.find(
      vehicle => vehicle.id === modelId,
    );
    setSelectedModel(selectedModel);
    setIsModalVisible(true);
    setSelectedImage(null);
    setFileName(null);
    setContentType('');
    setFilebase64(null);
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
  const onRefresh = () => {
    setIsRefreshing(true);
    FetchVehicleData(userid);
    setIsRefreshing(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={[styles.flexbox, {paddingLeft: 4}]}>
          <View style={[styles.flexbox, {paddingLeft: 4}]}>
            <View style={{alignSelf: 'flex-start', flexDirection: 'row'}}>
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
                My Vehicles
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {loading ? <ActivityIndicator size="large" color="red" /> : null}
          {VehicleGetData && VehicleGetData.length > 0 ? (
            <FlatList
              data={VehicleGetData}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      padding: 10,
                    }}>
                    <View style={{marginRight: 5}}>
                      {/* <Image
                      source={{uri: item.fileName}}
                      style={{width: 140, height: 120}}
                    /> */}
                      <FastImage
                        source={{uri: item.fileName.replace(/\\/g, '/')}}
                        style={{width: 140, height: 120}}
                      />
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: '900',
                            color: 'black',
                          }}>
                          {item.model}
                        </Text>
                        <TouchableOpacity onPress={() => openModal(item.id)}>
                          <MaterialCommunityIcons
                            name="pencil"
                            color="black"
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        {item.vehicleNo}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        KMD:{item.make}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        Color:{item.color}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        Prev Services: {item.PrevService}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={{textAlign: 'center', marginTop: 20,fontWeight:'900',color:"black",fontSize:18}}>
              Add Your Vehicles
            </Text>
          )}
          <MaterialCommunityIcons
            name="plus-circle"
            color="black"
            size={40}
            style={{alignSelf: 'center'}}
            onPress={() => {
              navigation.navigate('AddCars');
            }}
          />
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            {selectedModel && (
              <View>
                <NewDropdown
                  input={selectedModel.make}
                  data={MakeList.map(make => ({
                    ID: make.id.toString(),
                    Description: make.typeName,
                  }))}
                  onSelected={(id, value) => {
                    setSelectedModel(pre => ({...pre, make: value}));
                    VehicleUpate({prop: 'category', value: value});
                    VehicleUpate({prop: 'categoryId', value: id});
                    setSelectedModel(pre => ({...pre, model: 'Select Model'}));
                    FetchModel(id);
                  }}
                  inputContainerStyle={{width: 300}}
                />
                <NewDropdown
                  input={selectedModel.model}
                  data={ModelList.filter(function (el) {
                    return el.vehicleTypeId == categoryId;
                  }).map(model => ({
                    ID: model.id.toString(),
                    Description: model.modelName,
                  }))}
                  onSelected={(id, value) => {
                    setSelectedModel(pre => ({...pre, model: value}));
                    VehicleUpate({prop: 'model', value});
                    VehicleUpate({prop: 'modelId', value: id});
                  }}
                  inputContainerStyle={{width: 300}}
                />
                <NewDropdown
                  input={selectedModel.color}
                  data={[
                    {ID: '1', Description: 'Red'},
                    {ID: '2', Description: 'Blue'},
                    {ID: '3', Description: 'Green'},
                    {ID: '4', Description: 'White'},
                    {ID: '5', Description: 'Black'},
                    {ID: '6', Description: 'Grey'},
                  ]}
                  onSelected={(id, value) => {
                    setSelectedModel(pre => ({...pre, color: value}));
                  }}
                  inputContainerStyle={{width: 300}}
                />
                <Text></Text>
                <Input
                  placeholder="Enter Vehicle No"
                  style={{width: '100%'}}
                  value={selectedModel.vehicleNo}
                  onChangeText={value => {
                    setSelectedModel(pre => ({...pre, vehicleNo: value}));
                  }}
                />
                <Text></Text>

                <View>
                  <Text></Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={selectImage}>
                    <MaterialCommunityIcons
                      name="camera-outline"
                      size={30}
                      color="black"
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>

                  {selectedImage ? (
                    <FastImage
                      source={{uri: selectedImage.replace(/\\/g, '/')}}
                      style={styles.profileImage}
                    />
                  ) : selectedModel?.fileName ? (
                    <FastImage
                      source={{uri: selectedModel.fileName.replace(/\\/g, '/')}}
                      style={styles.profileImage}
                    />
                  ) : null}
                  {pictureError ? (
                    <Text style={styles.errorText}>{pictureError}</Text>
                  ) : null}
                  <Text></Text>
                </View>
              </View>
            )}
            <Button
              style={styles.buttonStyle}
              labelStyle={{color: 'white'}}
              onPress={() => {
                UpdateVehicleDetail({
                  id: selectedModel.id,
                  fkUserID: userid,
                  Type: 'Vehicle',
                  FileName: fileName == null ? 'null' : fileName,
                  ContentType: contentType,
                  Filebase64: filebase64 == null ? 'null' : filebase64,
                  make: selectedModel.make,
                  model: selectedModel.model,
                  color: selectedModel.color,
                  vehicleNo: selectedModel.vehicleNo,
                });
                FetchVehicleData(userid);
              }}>
              Update Details
            </Button>
            {loading ? <ActivityIndicator size="large" color="red" /> : null}
            <Text></Text>
            <Button
              style={styles.buttonStyle}
              labelStyle={{color: 'white'}}
              onPress={() => setIsModalVisible(false)}>
              Cancel
            </Button>
          </View>
        </Modal>
        <BottomTabView index={1} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default MyCars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
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
});
