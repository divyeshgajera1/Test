import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView,Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
var SCREEN_WIDTH = Dimensions.get('screen').width;
function Payment({navigation}) {
  return (
    <View style={styles.container}>
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
              paddingLeft: 20,

            }}>
            Payment mode
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.MainContainer}>
    <View style={styles.container}>
      <View style={styles.option}>
        <MaterialCommunityIcons name="credit-card-outline" size={30} color="#000" />
        <TouchableOpacity>
        <Text style={styles.Text}>Credit/Debit Card</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <Text></Text>
      <View style={styles.separator} />
      <Text></Text>
      <View style={styles.option}>
        <MaterialCommunityIcons name="bank" size={30} color="#000" />
        <TouchableOpacity>
        <Text style={styles.Text}>Netbanking</Text>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={styles.separator} />
      <Text></Text>
      <View style={styles.option}>
        <MaterialCommunityIcons name="wallet" size={30} color="#000" />
        <TouchableOpacity>
        <Text style={styles.Text}>Wallet</Text>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={styles.separator} />
      <Text></Text>
      <View style={styles.option}>
        <MaterialCommunityIcons name="bank-transfer" size={30} color="#000" />
        <TouchableOpacity>
        <Text style={styles.Text}>UPI</Text>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={styles.separator} />
    </View>
    </View>
    </View>
  )
}

export default Payment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', 
  },
  MainContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  Text: {
    marginTop: 5,
    fontSize: 16,
    color:'black',
    marginLeft: 10,
  },
  option: {
    alignItems: 'center',
    flexDirection:'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'grey',
  },
});