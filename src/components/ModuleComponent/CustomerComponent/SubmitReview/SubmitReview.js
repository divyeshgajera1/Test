import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input} from '../../../../components/common/Input';
import {Button} from 'react-native-paper';
import {AirbnbRating} from 'react-native-elements';
export default function SubmitReview({navigation}) {
  const [inputText, setInputText] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleTextChange = text => {
    setInputText(text);
    if (text.length > 125 && !showAlert) {
      setShowAlert(true);
      Alert.alert('Exceeded Word Limit', 'Max 125 words allowed', [
        {
          text: 'OK',
          onPress: () => {
            setShowAlert(false);
          },
        },
      ]);
    }
  };

  return (
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
              Submit A Review
            </Text>
          </View>
        </View>
      </View>
      <AirbnbRating count={5} defaultRating={0} size={25} reviews={[]} />
      <Input
        placeholder="Type your review here"
        onChangeText={handleTextChange}
        style={{height: '60%', textAlignVertical: 'top'}}
        multiline={true}
        value={inputText}
      />
      <Text style={{textAlign: 'right', padding: 10, bottom: '20%'}}>
        Max 125 Words
      </Text>

      <View style={{marginTop: '-20%'}}>
        <Button
          style={styles.buttonStyle}
          labelStyle={{color: 'white', fontWeight: 'bold'}}>
          SUBMIT
        </Button>
      </View>
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
    alignItems: 'left',
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
