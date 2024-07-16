import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Button} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import {BottomTabView} from '../../../components/common/TabView';
import {Context as SubscriberContext} from '../../../context/SubscriberContext';
import {Context as CMNContext} from '../../../context/CMNContext';
import {Context as AuthContext} from '../../../context/AuthContext';
import YoutbePlayer from '../../../components/ModuleComponent/HomeComponent/YoutbePlayer';
import Dashboard from '../../../components/ModuleComponent/HomeComponent/Dashboard';
function HomeScreen({navigation, route}) {
  const [selectedCategory, setSelectedCategory] = useState(3);
  const [CategoryInfo, setCategoryInfo] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const  WeeklyWashImages = [
    {id: 1, image: require('../../../../assets/suv.png'), cost: 499},
    {id: 2, image: require('../../../../assets/sedanCar.png'), cost: 499},
    {
      id: 3,
      image: require('../../../../assets/Hatchback_car1.png'),
      cost: 399,
    },
    {id: 4, image: require('../../../../assets/sportbike.png'), cost: 199},
   
  ];
  const AlternateWashImages = [
    {id: 1, image: require('../../../../assets/suv.png'), cost: 699},
    {id: 2, image: require('../../../../assets/sedanCar.png'), cost: 699},
    {
      id: 3,
      image: require('../../../../assets/Hatchback_car1.png'),
      cost: 499,
    },
    {id: 4, image: require('../../../../assets/sportbike.png'), cost: 299},
  ];
  const DailyWashImages = [
    {id: 1, image: require('../../../../assets/suv.png'), cost: 999},
    {id: 2, image: require('../../../../assets/sedanCar.png'), cost: 999},
    {
      id: 3,
      image: require('../../../../assets/Hatchback_car1.png'),
      cost: 799,
    },
    {id: 4, image: require('../../../../assets/sportbike.png'), cost: 399},
   
   
  ];
 
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;

  const {
    state: {GetSubscriptionType, loading},
    FetchSubscriptionType,
    FetchUserSubscription,
  } = useContext(SubscriberContext);
  const {GetSubscription} = GetSubscriptionType;
  useEffect(() => {
    if (userid) {
      FetchUserSubscription(userid);
    }
  }, [userid]);
  const {
    state: {FetchDetail},
    FetchMake,
  } = useContext(CMNContext);
  const [Subscription, setSubscription] = useState([]);

  const categories = useMemo(() => {
    return GetSubscription.map(subscriptionType => ({
      id: subscriptionType.pkMasterID,
      title: subscriptionType.name,
      detail: subscriptionType.description,
      Status: subscriptionType.status,
    }));
  }, [GetSubscription]);

  const handleCategoryPress = useCallback(
    categoryId => {
      setSelectedCategory(prev => (categoryId === prev ? null : categoryId));
      setCategoryInfo(categoryId === selectedCategory ? !CategoryInfo : true);
    },
    [selectedCategory, CategoryInfo],
  );
  const toggleCheckbox = useCallback(
    item => {
      const index = Subscription.findIndex(make => make.id === item.id);
      let updatedsubcription = [...Subscription];
      if (index === -1) {
        updatedsubcription.push({...item, isChecked: true});
      } else {
        updatedsubcription = updatedsubcription.filter(
          make => make.id !== item.id,
        );
      }
      setSubscription(updatedsubcription);
    },
    [Subscription],
  );

  const {MakeList} = FetchDetail;

  const renderCategory = useCallback(
    category => (
      <TouchableOpacity
        key={category.id}
        style={{
          paddingVertical: 15,
          borderColor: selectedCategory === category.id ? 'black' : 'black',
          backgroundColor:
            selectedCategory === category.id ? 'white' : '#E9F4F3',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          marginTop: 10,
          alignItems: 'center',
          width: '100%',
        }}
        onPress={() => handleCategoryPress(category.id)}>
        <View style={{flex: 3}}>
          <Text
            style={{
              color: selectedCategory === category.id ? 'black' : 'black',
              fontWeight: selectedCategory === category.id ? 'bold' : 'bold',
              fontSize: 13,
            }}>
            {category.title}
          </Text>
          <Text style={{fontSize: 10, color: 'black'}}>{category.detail}</Text>
        </View>
      </TouchableOpacity>
    ),
    [handleCategoryPress],
  );
  useEffect(() => {
    if (userid) {
      FetchSubscriptionType();
      FetchMake();
    }
  }, [userid]);
  
  const onRefresh = () => {
    setIsRefreshing(true);
    if (userid) {
      FetchSubscriptionType();
      FetchMake();
      FetchUserSubscription(userid);
    }
    setIsRefreshing(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              width: Dimensions.get('window').width * 1,
              flexShrink: 1,
              color: '#000000',
              textAlign: 'center',
            }}>
            How do we Operate
          </Text>
        </View>
        <Text></Text>

        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {loading ? <ActivityIndicator size="large" color="red" /> : null}
          <View>
            <Dashboard navigation={navigation}/>
          </View>

          <View style={{marginLeft: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              How Do We Wash
            </Text>
          </View>
          <Text></Text>
          <YoutbePlayer/>
          <Text></Text>
          <View style={styles.MainContainer}>
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Subscription
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
              }}>
              {categories.map(category => (
                <View key={category.id} style={{width: '33.33%'}}>
                  {renderCategory(category)}
                </View>
              ))}
            </View>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              }}>
              {CategoryInfo && selectedCategory === 1 && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <FlatList
                      data={MakeList}
                      horizontal
                      scrollEnabled={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => (
                        <View
                          style={{alignItems: 'center', marginHorizontal: 10}}>
                          <CheckBox
                            checked={Subscription.some(
                              make => make.id === item.id,
                            )}
                            onPress={() => toggleCheckbox(item)}
                            containerStyle={styles.checkbox}
                            checkedColor="black"
                          />
                          {DailyWashImages.find(
                            image => image.id == item.id,
                          ) ? (
                            <View style={styles.imageContainer}>
                              <Image
                                source={
                                  DailyWashImages.find(
                                    image => image.id === item.id,
                                  ).image
                                }
                                style={{
                                  width: 50,
                                  height: 50,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          ) : null}

                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 12,
                              color: 'black',
                            }}>
                            {item.typeName}
                          </Text>
                          {DailyWashImages.find(
                            image => image.id === item.id,
                          ) ? (
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 12,
                                color: 'black',
                              }}>
                              Cost:₹
                              {
                                DailyWashImages.find(
                                  image => image.id === item.id,
                                ).cost
                              }
                            </Text>
                          ) : null}
                        </View>
                      )}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            height: '90%',
                            width: 0.5,
                            backgroundColor: 'gray',
                            alignSelf: 'center',
                          }}
                        />
                      )}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              // marginLeft: 15,
            }}>
            {CategoryInfo && selectedCategory === 2 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <FlatList
                    data={MakeList}
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                      <View
                        style={{alignItems: 'center', marginHorizontal: 10}}>
                        <CheckBox
                          checked={Subscription.some(
                            make => make.id === item.id,
                          )}
                          onPress={() => toggleCheckbox(item)}
                          containerStyle={styles.checkbox}
                          checkedColor="black"
                        />
                        {AlternateWashImages.find(
                          image => image.id == item.id,
                        ) ? (
                          <View style={styles.imageContainer}>
                            <Image
                              source={
                                AlternateWashImages.find(
                                  image => image.id === item.id,
                                ).image
                              }
                              style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        ) : null}

                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'black',
                          }}>
                          {item.typeName}
                        </Text>
                        {AlternateWashImages.find(
                          image => image.id === item.id,
                        ) ? (
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 12,
                              color: 'black',
                            }}>
                            Cost:₹
                            {
                              AlternateWashImages.find(
                                image => image.id === item.id,
                              ).cost
                            }
                          </Text>
                        ) : null}
                      </View>
                    )}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          height: '90%',
                          width: 0.5,
                          backgroundColor: 'gray',
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  />
                </View>
              </>
            )}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',

              // marginLeft: 3,
            }}>
            {CategoryInfo && selectedCategory === 3 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <FlatList
                    data={MakeList}
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <View
                        style={{alignItems: 'center', marginHorizontal: 10}}>
                        <CheckBox
                          checked={Subscription.some(
                            make => make.id === item.id,
                          )}
                          onPress={() => toggleCheckbox(item)}
                          containerStyle={styles.checkbox}
                          checkedColor="black"
                        />
                        {WeeklyWashImages.find(image => image.id == item.id) ? (
                          <View style={styles.imageContainer}>
                            <Image
                              source={
                                WeeklyWashImages.find(
                                  image => image.id === item.id,
                                ).image
                              }
                              style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        ) : null}
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'black',
                          }}>
                          {item.typeName}
                        </Text>
                        {WeeklyWashImages.find(
                          image => image.id === item.id,
                        ) ? (
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 12,
                              color: 'black',
                            }}>
                            Cost:₹
                            {
                              WeeklyWashImages.find(
                                image => image.id === item.id,
                              ).cost
                            }
                          </Text>
                        ) : null}
                      </View>
                    )}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          height: '90%',
                          width: 0.5,
                          backgroundColor: 'gray',
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  />
                </View>
              </>
            )}
          </View>
          <Text></Text>
          <Button
            style={styles.buttonStyle}
            labelStyle={{color: 'white', fontWeight: 'bold'}}
            onPress={() => {
              const selectedItems = Subscription.filter(item => item.isChecked);
              const selectedCategoryInfo = categories.find(
                cat => cat.id === selectedCategory,
              );

              if (selectedItems.length == 0) {
                alert('Please select at least one subscription.');
              } else {
                let totalCost = 0;
                if (CategoryInfo && selectedCategory === 1) {
                  // Daily Wash
                  totalCost = selectedItems.reduce((acc, curr) => {
                    const itemCost =
                      DailyWashImages.find(image => image.id === curr.id)
                        ?.cost || 0;
                    return acc + itemCost;
                  }, 0);
                } else if (CategoryInfo && selectedCategory === 2) {
                  // Alternate Wash
                  totalCost = selectedItems.reduce((acc, curr) => {
                    const itemCost =
                      AlternateWashImages.find(image => image.id === curr.id)
                        ?.cost || 0;
                    return acc + itemCost;
                  }, 0);
                } else if (CategoryInfo && selectedCategory === 3) {
                  // Weekly Wash
                  totalCost = selectedItems.reduce((acc, curr) => {
                    const itemCost =
                      WeeklyWashImages.find(image => image.id === curr.id)
                        ?.cost || 0;
                    return acc + itemCost;
                  }, 0);
                }
                navigation.navigate('Subscription_Details', {
                  selectedItems,
                  totalCost,
                  categoryId: selectedCategoryInfo?.id,
                  selectedCategoryTitle: selectedCategoryInfo?.title,
                  categoryDetail: selectedCategoryInfo?.detail,
                  CatStatus: selectedCategoryInfo?.Status,
                });
                console.log(selectedItems, 'items are Selected');
              }
              console.log(selectedItems, 'items are Selected');
            }}>
            SUBSCRIBE NOW
          </Button>
        </ScrollView>
      </View>
      <BottomTabView index={0} />
    </View>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F4F3',
    padding: '2%',
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  CardView: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: '1%',
  },
  buttonStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
    width: '39%',
    minWidth: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageContainer: {
    alignItems: 'center',
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
