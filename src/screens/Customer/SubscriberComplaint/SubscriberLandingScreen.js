import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {AirbnbRating} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {CardView} from '../../../components/common';
import {BottomTabView} from '../../../components/common/TabView';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as ServiceContext} from '../../../context/ServiceContext';
import FastImage from 'react-native-fast-image';

const SubscriberLandingScreen = ({navigation, index}) => {
  const {
    state: {auth, GetProfile},
    FetchProfileData,
  } = useContext(AuthContext);
  const {
    state: {getServices},
    FetchTaskCompletion,
  } = useContext(ServiceContext);

  const {user} = auth;
  const {FetchProfile} = GetProfile;
  const {TaskCompleted} = getServices;
  const userid = user?.id;
  useEffect(() => {
    FetchProfileData(userid);
  }, [userid]);
  useEffect(() => {
    FetchTaskCompletion(userid);
  }, [userid]);
  console.log(TaskCompleted, 'fdshghdigha');
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              width: Dimensions.get('window').width * 1,
              flexShrink: 1,
              color: '#000000',
              textAlign: 'center',
            }}>
            Today's Wash
          </Text>
        </View>
        <Text></Text>
        <View style={styles.Container}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '800'}}>
            Welcome! {FetchProfile?.name}
          </Text>

          <Text></Text>
          {TaskCompleted == null? (
            <>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              Your Wash is not started Yet
            </Text>
             </>
          ):(  <FlatList
            data={TaskCompleted}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, i}) => (
              <View>
                <ScrollView>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>
                      Images Before And After
                    </Text>
                    <FlatList
                      data={item?.documents}
                      keyExtractor={(x, index) => index.toString()}
                      numColumns={3}
                      renderItem={({item, i}) => {
                        return (
                          <View style={{margin: 5}}>
                            <FastImage
                              source={{
                                uri: item?.fileName?.replace(/\\/g, '/'),
                              }}
                              style={styles.imageStyle}
                            />
                          </View>
                        );
                      }}
                    />
                    <Text></Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{...styles.subitems}}>
                        {' '}
                        Any Issue?{'  '}
                      </Text>
                      <Button
                        style={styles.buttonStyle}
                        labelStyle={{color: 'white', fontWeight: 'bold'}}
                        onPress={() => {
                          navigation.navigate('Complaint');
                        }}>
                        RAISE COMPLAINT
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          />
)}
        
          <ScrollView>
            <View></View>
          </ScrollView>
        </View>
      </View>
      <BottomTabView index={4} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F4F3',
  },
  Container: {
    flex: 20,
  },
  itemContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardView: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
  },
  imageStyle: {
    width: 100,
    height: 80,
  },
  subitems: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'TitilliumWeb-Light',
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: 'black',
    width: '50%',
    minWidth: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default SubscriberLandingScreen;
