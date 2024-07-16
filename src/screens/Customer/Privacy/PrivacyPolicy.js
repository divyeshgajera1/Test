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
export default function PrivacyPolicy({navigation}) {
  const Disclaimer = [
    {
      id: 1,
      Description: 'Information We Collect:',
      Detail:
        'We collect personal information, including but not limited to, your name, contact information, vehicle details, and payment information when you book a car wash service with us.',
    },
    {
      id: 2,
      Description: 'How We Use Your Information:',
      Detail:
        'We use the information collected to schedule and provide car wash services, process payments, communicate with you about your appointment, and improve our services. We may also use your information to send promotional offers or updates about our business, but you can opt out of these communications at any time.',
    },
    {
      id: 3,
      Description: 'Sharing Your Information:',
      Detail:
        'We may share your personal information with third-party service providers who assist us in providing car wash services, processing payments, or managing customer communications. We do not sell or rent your personal information to third parties for marketing purposes.',
},
    {
      id: 4,
      Description: 'Data Security:',
      Detail:
        'We take the security of your personal information seriously and have implemented measures to protect it from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
    },
    {
      id: 5,
      Description: 'Retention of Information:',
      Detail:
        ' We will retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy unless a longer retention period is required or permitted by law.',
    },
    {
      id: 6,
      Description: 'Your Rights:',
      Detail:
        'You have the right to access, correct, or delete your personal information held by us. You may also have the right to restrict or object to certain processing activities or request the transfer of your data to another party. Please contact us if you wish to exercise any of these rights.',
    },
    {
      id: 7,
      Description: 'Changes to this Privacy Policy:',
      Detail:
        'We reserve the right to update or modify this privacy policy at any time without prior notice. Any changes will be effective immediately upon posting the revised policy on our website. We encourage you to review this policy periodically for any updates.',
    },
    {
      id: 8,
      Description: 'Contact Us:',
      Detail:
        ' If you have any questions or concerns about this privacy policy or our data practices, please contact us at servicelanesolution@gmail.com.',
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
               Privacy And Policy
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={Disclaimer}
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
              By booking a car wash service with us, you acknowledge that you have read and agree to the terms of this privacy policy.
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
