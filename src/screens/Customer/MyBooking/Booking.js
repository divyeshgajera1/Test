import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView,} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabView } from '../../../components/common/TabView';
function Booking({navigation}) {
  const [BookingData, setBookingData] = useState([
    {
      ID: '1',
      Date: '02/02/2022',
      ServiceName: 'Machine Wash',
      SLot: '12:00 - 1:00 PM',
      Description: 'Service Lane'
    },
    {
      ID: '2',
      Date: '02/02/2022',
      ServiceName: 'Dry Cleaning',
      SLot: '12:00 - 1:00 PM',
      Description: 'Service Lane'
    },
    
  ]);
  const [PastBookingData, setPastBookingData] = useState([
    {
      ID: '1',
      Date: '02/02/2022',
      ServiceName: 'Machine Wash',
      SLot: '12:00 - 1:00 PM',
      Description: 'Service Lane',
      status:'Completed',
    },
    {
      ID: '2',
      Date: '02/02/2022',
      ServiceName: 'Dry Cleaning',
      SLot: '12:00 - 1:00 PM',
      Description: 'Service Lane',
      status:'Completed'
    },
    {
      ID: '3',
      Date: '02/02/2022',
      ServiceName: 'Dry Cleaning',
      SLot: '12:00 - 1:00 PM',
      Description: 'Service Lane',
      status:'Completed'
    },
    {
      ID: '4',
      Date: '02/02/2022',
      ServiceName: 'Dry Cleaning',
      SLot: '12:00 - 1:00 PM',
      Description: 'Service Lane',
      status:'Canceled'
    },
    
  ]);

  const clearAll = async () => {
    try {
      await AsyncStorage.removeItem('BookingData');
      setBookingData([]);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  return (
    <View style={{flex:1}}>
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
            MY BOOKINGS
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.container}>
      <ScrollView>
      <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'stretch'}}>
      <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',

              fontWeight: 'bold',
              width: Dimensions.get('window').width * 1,
              flexShrink: 1,
              color: '#000000',

            }}>
            Current Bookings
          </Text>
          {BookingData.length > 0 &&(
        <TouchableOpacity onPress={clearAll}>
          <Text style={{ color: 'blue', textAlign: 'center', textDecorationLine: 'underline' }}>Clear All</Text>
        </TouchableOpacity>
        )}
          </View>
          <Text></Text>
        <FlatList
          data={BookingData}
          keyExtractor={item => item.ID}
          scrollEnabled={false}
          renderItem={({ index, item }) => {
            return (
              <View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.ServiceText}>{item.ServiceName}</Text>
                    <Text style={styles.slotText}>slot:{item.SLot}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.slotText}>{item.Description}</Text>
                    <Text style={styles.slotText}>Date:{item.Date}</Text>
                  </View>
                </View>
                <Text></Text>
                <View style={styles.separator} />
                <Text></Text>
              </View>
            );
          }}
        /> 
      </ScrollView>

    </View>
    <View style={styles.PastBookingcontainer}>
      <ScrollView>
      <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'stretch'}}>
      <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',

              fontWeight: 'bold',
              width: Dimensions.get('window').width * 1,
              flexShrink: 1,
              color: '#000000',

            }}>
            Past Bookings
          </Text>
          </View>
          <Text></Text>
        <FlatList
          data={PastBookingData}
          keyExtractor={item => item.ID}
          scrollEnabled={false}
          renderItem={({ index, item }) => {
            return (
              <View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.ServiceText}>{item.ServiceName}</Text>
                    <Text style={styles.slotText}>slot:{item.SLot}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.slotText}>{item.Description}</Text>
                    <Text style={styles.slotText}>Date:{item.Date}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[styles.slotText, { color: item.status === 'Completed' ? 'green' : 'red' }]}>{item.status}</Text>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('SubmitReview')
                  }}>
                    <Text style={{...styles.slotText,color:'blue',textDecorationLine:'underline'}}>Submit Your Experience</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text></Text>
                <View style={styles.separator} />
                <Text></Text>
              </View>
            );
          }}
        /> 
      </ScrollView>

    </View>
  </View>
  <BottomTabView navigation={navigation}/>
  </View>
  )
}

export default Booking
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', 
  },
  PastBookingcontainer: {
    flex: 2,
    padding: 20,
    backgroundColor: 'white', 
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 10,
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
  }  ,
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 1,
    padding: 10,
    marginBottom: 1,
    width: Dimensions.get('window').width - 1, 
    height: 80,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'grey',
  },
  ServiceText:{
    fontSize:15,
    fontWeight:'bold',
    color:'black'

  },
  slotText:{
fontSize:13,
fontWeight:'500'
  }
});