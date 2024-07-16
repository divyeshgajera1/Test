import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input} from '../../../components/common/Input';
import {CheckBox} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {BottomTabView} from '../../../components/common/TabView';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as AboutContext} from '../../../context/AboutContext';
export default function Help({navigation}) {
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  const {
    state: {form, loading},
    Help_SuppUdpate,
    SaveHelp,
  } = useContext(AboutContext);
  const [isCallback, setIsCallback] = useState(false);
  var HelpRef = useRef(null);
  const {HelpText} = form;
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={[styles.flexbox, {paddingLeft: 4}]}>
          <View style={[styles.flexbox, {paddingLeft: 4}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                color="black"
                size={30}
                style={{paddingTop: 10}}
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
                  paddingLeft: 20,
                  paddingTop: 10,
                }}>
                Help & Support
              </Text>
            </View>
          </View>
        </View>
        <Input
          placeholder="Type your suggestions or complaints"
          onChangeText={value => Help_SuppUdpate({prop: 'HelpText', value})}
          style={{height: '60%', textAlignVertical: 'top', color: 'black'}}
          multiline={true}
          value={HelpText}
          focus={HelpRef}
        />
        <Text style={{textAlign: 'right', padding: 10, bottom: '20%'}}>
          Max 125 Words
        </Text>
        <CheckBox
          title="Callback ? OR"
          checked={isCallback}
          onPress={() => setIsCallback(!isCallback)}
          checkedColor="blue"
          containerStyle={styles.checkbox}
        />
        <View
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            bottom: '22%',
            paddingLeft: 55,
          }}>
          
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${'9321778836'}`);
            }}>
            <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons
              name="phone"
              color="black"
              size={25}
              // style={{paddingTop: 10}}
            />
            <Text style={{color: 'black'}}>9321778836</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            bottom: '20%',
            paddingLeft: 55,
          }}>
          In 48hrs Callback from Reprensentative
        </Text>
        <View style={{marginTop: '-10%'}}>
          <Button
            style={styles.buttonStyle}
            labelStyle={{color: 'white', fontWeight: 'bold'}}
            onPress={() => {
              if (HelpText == '') {
                Alert.alert(
                  'Alert',
                  'Please Enter Suggestions',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        HelpRef.current.focus();
                      },
                    },
                  ],
                  {cancelable: false},
                );
                return false;
              } else if (HelpText.trim().length > 125) {
                Alert.alert(
                  'Alert',
                  'Text exceeds 125 characters limit',
                  [{text: 'OK'}],
                  {cancelable: false},
                );
              } else {
                SaveHelp({
                  userid: userid,
                  HelpText: HelpText,
                  callback: isCallback,
                });
              }
              setIsCallback(false);
            }}>
            SEND
          </Button>
          {loading ? <ActivityIndicator size="large" color="red" /> : null}
        </View>
      </View>
      <BottomTabView navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  checkbox: {
    backgroundColor: 'white',
    borderColor: 'white',
    marginLeft: 10,
    bottom: '20%',
  },
  buttonStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
    width: '49%',
    minWidth: 200,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'black',
  },
});
