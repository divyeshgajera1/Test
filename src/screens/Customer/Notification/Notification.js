import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomTabView} from '../../../components/common/TabView';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as NotificationContext} from '../../../context/NotificationContext';
import {Context as SubscriberContext} from '../../../context/SubscriberContext';
import moment from 'moment';

export default function Notification({navigation}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  const {
    state: {GetNotification, loading},
    FetchNotification,
  } = useContext(NotificationContext);

  useEffect(() => {
    FetchNotification(userid);
  }, [userid]);

  const {G_Notification} = GetNotification;
  console.log(G_Notification);
  const {
    state: {GetSubscriptionType},
  } = useContext(SubscriberContext);
  const {GetSubscription} = GetSubscriptionType;

  const formatTime = dateString => {
    return moment(dateString).fromNow();
  };

  const formatDate = dateString => {
    return moment(dateString).format('YYYY-MM-DD');
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    FetchNotification(userid);
    setIsRefreshing(false);
  };

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
                Notifications
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            <FlatList
              data={G_Notification}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({index, item}) => {
                const subscription = GetSubscription.find(subscription => {
                  return (
                    subscription.suscriptionName === item.fkSubscriptionTypeID
                  );
                });
                return (
                  <View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.ServiceText}>{item.userName}</Text>
                        <Text style={styles.slotText}>
                          {subscription && subscription?.suscriptionName}
                        </Text>
                      </View >
                     
                      <Text style={styles.slotText}>
                       Date: {formatDate(item.date)}
                      </Text>
                      <Text style={styles.slotText}>
                       Updated:{formatTime(item.date)}
                      </Text>
                      </View>
                      <Text style={styles.slotText}>{item.notification}</Text>
                  
                    <Text></Text>
                    <View style={styles.separator} />
                    <Text></Text>
                  </View>
                );
              }}
            />
            {loading ? (
              <ActivityIndicator size="large" color="red" />
            ) : null}
          </ScrollView>
        </View>
      </View>
      <BottomTabView navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
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
  ServiceText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  slotText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});
