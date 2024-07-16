import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabView} from '../../../components/common/TabView';
export default function TermConditions({navigation}) {
  const TermsCondition = [
    {
      id: 1,
      Description: 'Service Description:',
      Detail:
        'Our car wash services include exterior cleaning, Interior cleaning, tire shining, and other related services as specified in the chosen package.',
    },
    {
      id: 2,
      Description: 'Booking and Payments:',
      Detail:
        'Customers are required to book their subscriptions in advance either online or by phone. Payment is due at the time of service, and we accept cash, credit/debit cards & Razor Pay Gateway forms of payment.',
    },
    {
      id: 3,
      Description: 'Cancellation and Rescheduling:',
      Detail:
        'Customers can cancel or reschedule their appointments up to 24 hours before the scheduled time without incurring any fees. Late cancellations may be subject to a cancellation fee.',
    },
    {
      id: 4,
      Description: 'Vehicle Condition:',
      Detail:
        'Customers are responsible for the condition of their vehicles prior to the car wash service. We are not liable for any pre-existing damage or issues with the vehicle.',
    },
    {
      id: 5,
      Description: 'Liability:',
      Detail:
        'While we take every precaution to ensure the safety of your vehicle during the car wash process, we are not liable for any damages that may occur, including but not limited to scratches, dents, or damage to personal belongings left in the vehicle.',
    },
    {
      id: 6,
      Description: 'Completion of Service:',
      Detail:
        'We strive to complete all car wash services in a timely manner. However, the duration of the service may vary depending on factors such as weather conditions and the condition of the vehicle.',
    },
    {
      id: 7,
      Description: 'Customer Satisfaction:',
      Detail:
        'We value customer satisfaction and will address any concerns or issues promptly. Customers are encouraged to provide feedback on their experience to help us improve our services.        ',
    },
    {
      id: 8,
      Description: 'Privacy Policy:',
      Detail:
        'We respect the privacy of our customers and will not disclose any personal information provided during the booking process or service unless required by law.',
    },
    {
      id: 9,
      Description: 'Changes to Terms and Conditions:',
      Detail:
        'We reserve the right to update or modify these terms and conditions at any time without prior notice. It is the responsibility of the customer to review the terms periodically for any changes.',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
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
                T&C and Disclaimer
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={TermsCondition}
            scrollEnabled={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <>
              <Text></Text>
              <Text style={{color: 'black', fontSize: 18,fontWeight:"bold"}}>
                {item.Description}
              
              </Text>
              <Text style={{color: 'black', fontSize: 15}}>
                {item.Detail}
              </Text>
              </>
            )}
          />
          <Text></Text>
              <Text style={{color: 'black', fontSize: 15,fontWeight:'800'}}>
              Customers are required to acknowledge and agree to these terms and conditions before booking a car wash service with us.
              </Text>
        </View>
      </ScrollView>
      <BottomTabView navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
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
  },
});
