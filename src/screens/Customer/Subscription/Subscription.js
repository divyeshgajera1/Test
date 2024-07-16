import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {AccordionSubscription} from '../../../components/common/AccordionSubscription';
import {BottomTabView} from '../../../components/common/TabView';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as SubscriberContext} from '../../../context/SubscriberContext';
import {CardView} from '../../../components/common';
import {cleanSingle} from 'react-native-image-crop-picker';
function Subscription({navigation, index}) {
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  const {
    state: {GetSubscriptionType, form},
    FetchUserSubscription,
    SubscriptionUpdate,
  } = useContext(SubscriberContext);
  const {GetUserSubscrption, GetSubscription} = GetSubscriptionType;
  useEffect(() => {
    FetchUserSubscription(userid);
  }, [userid]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    FetchUserSubscription(userid);
    setIsRefreshing(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                  padding: 20,
                }}>
                MY Subscription
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            {GetUserSubscrption == null ? (
              <>
              <Text style={{color:'black',textAlign:'center',fontSize:18}}>No Subscription Yet</Text>
              <Text></Text>
              <Button
              style={styles.buttonStyle}
              labelStyle={{color: 'white', fontWeight: 'bold'}}
              onPress={()=>{
                navigation.navigate('Home')
              }}
              >
              SUBSCRIBE NOW
              </Button>
              </>
            ) : (
              GetUserSubscrption && GetUserSubscrption.map((item, index) => (
                <AccordionSubscription key={index} item={item} />
              ))
            )}
          </ScrollView>
        </View>

        <BottomTabView index={2} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    padding: 2,
  },
  flexbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  color: {
    backgroundColor: 'white',
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
  Text: {
    fontSize: 13,
    fontWeight: '500',
    padding: 10,
  },

});
