import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {Context as SubscriberContext} from '../../context/SubscriberContext';
import {color} from 'react-native-elements/dist/helpers';
import * as RootNavigation from '../../route/RootNavigation';
const BottomTabView = ({navigation, index}) => {
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
  return (
    <View style={styles.bottomLayoutStyles}>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('Home');
        }}
        style={[
          styles.iconContainer,
        ]}>
        <MaterialCommunityIcons
          name="home"
          color={index === 0 ? '#1F51FF' : '#808080'}
          size={30}
        />
        <Text
          style={{
            ...styles.textstyles,
            color: index === 0 ? '#1F51FF' : '#808080',
          }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('My Vehicles');
        }}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="car-wash"
            color={index === 1 ? '#1F51FF' : '#808080'}
            size={30}
          />
          <Text
            style={{
              ...styles.textstyles,
              color: index === 1 ? '#1F51FF' : '#808080',
            }}>
             My Vehicles
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('My Subscriptions');
        }}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="briefcase-outline"
            color={
              index === 2 ? '#1F51FF' : '#808080'
            }
            size={30}
          />
          <Text
            style={{
              ...styles.textstyles,
              color:
              index === 2 ? '#1F51FF' : '#808080',
            }}>
            Subscription
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('Profile');
        }}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            color={index === 3 ? '#1F51FF' : '#808080'}
            size={30}
          />
          <Text
            style={{
              ...styles.textstyles,
              color: index === 3 ? '#1F51FF' : '#808080',
            }}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
      {GetUserSubscrption != null && (
        <TouchableOpacity
          onPress={() => {
            RootNavigation.navigate('My Complaints');
          }}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="file-certificate-outline"
              color={index === 4 ? '#1F51FF' : '#808080'}
              size={30}
            />
            <Text
              style={{
                ...styles.textstyles,
                color:
                  index === 4 ? '#1F51FF' : '#808080',
              }}>
              Today's Wash
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {BottomTabView};

const styles = StyleSheet.create({
  bottomLayoutStyles: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: '#fff',
    bottom: 0,
    padding: 5,
    minHeight: 50,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
  },
  textstyles: {
    fontSize: 12,
    color: '#808080',
  },
  selectedIcon: {
    color: 'blue',
  },
});
