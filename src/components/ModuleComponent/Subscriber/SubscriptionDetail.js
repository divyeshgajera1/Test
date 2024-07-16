import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import {DateDailog} from '../../common/DateDialog';
import {Button} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardView} from '../../common';
import RazorpayCheckout from 'react-native-razorpay';
import {Context as AuthContext} from '../../../context/AuthContext';
import {Context as VehicleContext} from '../../../context/VehicleContext';
import {Context as SubscriberContext} from '../../../context/SubscriberContext';
import {Context as CMNContext} from '../../../context/CMNContext';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {BottomTabView} from '../../common/TabView';
import {useFocusEffect} from '@react-navigation/native';
import {color} from 'react-native-elements/dist/helpers';
var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function SubscriptionDetail({navigation, route}) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [isCallback, setIsCallback] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPkTimeSlotID, setSelectedPkTimeSlotID] = useState(null);
  const [FromDateVisible, setFromDateVisible] = useState(false);
  const [ToDateVisible, setToDateVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [SubscriptionPrice, setSubscriptionPrice] = useState(0);
  const {
    state: {FetchDetail},
    FetchMake,
  } = useContext(CMNContext);
  const {MakeList} = FetchDetail;
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;
  const {
    state: {getVehicle, loading},
    FetchVehicleData,
  } = useContext(VehicleContext);
  const [selectedCars, setSelectedCars] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      FetchVehicleData(userid);
      console.log('Screen focud');
    }, [userid]),
  );

  useEffect(() => {
    FetchVehicleData(userid);
  }, [userid]);

  const onRefresh = () => {
    setIsRefreshing(true);
    FetchVehicleData(userid);
    setIsRefreshing(false);
  };

  const [IsVisible, setIsVisible] = useState(false);
  var SCREEN_WIDTH = Dimensions.get('screen').width;
  const {VehicleGetData} = getVehicle;
  const textcolor = IsVisible ? 'white' : 'white';
  const {
    state: {form, GetSubscriptionType,},
    SubscriptionUpdate,
    FetchTimeSlot,
    SaveSubscription,
    resetForm,
  } = useContext(SubscriberContext);

  const {TimeSlot} = GetSubscriptionType;
  const {
    FromDate,
    ToDate,
    monday_YN,
    tuesday_YN,
    wednesday_YN,
    thursday_YN,
    friday_YN,
    saturday_YN,
    sunday_YN,
  } = form;
  useEffect(() => {
    FetchTimeSlot();
    FetchMake();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (selectedCategoryTitle === 'DAILY WASH') {
      SubscriptionUpdate({prop: 'monday_YN', value: 'Yes'});
      SubscriptionUpdate({prop: 'tuesday_YN', value: 'Yes'});
      SubscriptionUpdate({prop: 'wednesday_YN', value: 'Yes'});
      SubscriptionUpdate({prop: 'thursday_YN', value: 'Yes'});
      SubscriptionUpdate({prop: 'friday_YN', value: 'Yes'});
      SubscriptionUpdate({prop: 'saturday_YN', value: 'Yes'});
      SubscriptionUpdate({prop: 'sunday_YN', value: 'Yes'});
    } else {
      SubscriptionUpdate({prop: 'monday_YN', value: 'No'});
      SubscriptionUpdate({prop: 'tuesday_YN', value: 'No'});
      SubscriptionUpdate({prop: 'wednesday_YN', value: 'No'});
      SubscriptionUpdate({prop: 'thursday_YN', value: 'No'});
      SubscriptionUpdate({prop: 'friday_YN', value: 'No'});
      SubscriptionUpdate({prop: 'saturday_YN', value: 'No'});
      SubscriptionUpdate({prop: 'sunday_YN', value: 'No'});
    }
  }, []);
  const {selectedItems, totalCost} = route?.params;
  const {categoryId, selectedCategoryTitle, categoryDetail, CatStatus} =
    route?.params;
  const [vehicleItem, setVehicleItems] = useState([]);
  const toggleTime = (index, pkTimeSlotID) => {
    if (selectedTime === index) {
      setSelectedTime(null);
    } else {
      setSelectedTime(index);
      setSelectedPkTimeSlotID(pkTimeSlotID);
    }
  };

  useEffect(() => {
    if (MakeList.length > 0) {
      const updatedItems = MakeList.map(item => {
        const selectedItem = selectedItems.find(
          selected => selected.id === item.id,
        );
        return selectedItem
          ? {...item, isChecked: true}
          : {...item, isChecked: false};
      });
      setVehicleItems(updatedItems);
    }
  }, [MakeList, selectedItems]);

  const AlternateWashImages = [
    {
      id: 1,
      image: require('../../../../assets/suv.png'),
      cost: 699,
      typeName: 'SUV',
    },
    {
      id: 2,
      image: require('../../../../assets/sedanCar.png'),
      cost: 699,
      typeName: 'SEDAN',
    },
    {
      id: 3,
      image: require('../../../../assets/Hatchback_car1.png'),
      cost: 499,
      typeName: 'HATCHBACK',
    },
    {
      id: 4,
      image: require('../../../../assets/sportbike.png'),
      cost: 299,
      typeName: 'TWO WHEELER',
    },
  ];
  const WeeklyWashImages = [
    {
      id: 4,
      image: require('../../../../assets/sportbike.png'),
      cost: 199,
      typeName: 'TWO WHEELER',
    },
    {
      id: 3,
      image: require('../../../../assets/Hatchback_car1.png'),
      cost: 399,
      typeName: 'HATCHBACK',
    },
    {
      id: 2,
      image: require('../../../../assets/sedanCar.png'),
      cost: 499,
      typeName: 'SEDAN',
    },
    {
      id: 1,
      image: require('../../../../assets/suv.png'),
      cost: 499,
      typeName: 'SUV',
    },
  ];
  const DailyWashImages = [
    {
      id: 4,
      image: require('../../../../assets/sportbike.png'),
      cost: 399,
      typeName: 'TWO WHEELER',
    },
    {
      id: 3,
      image: require('../../../../assets/Hatchback_car1.png'),
      cost: 799,
      typeName: 'HATCHBACK',
    },
    {
      id: 2,
      image: require('../../../../assets/sedanCar.png'),
      cost: 999,
      typeName: 'SEDAN',
    },
    {
      id: 1,
      image: require('../../../../assets/suv.png'),
      cost: 999,
      typeName: 'SUV',
    },
  ];

  const toggleCheckbox = item => {
    const index = selectedCars.findIndex(car => car.id === item.id);
    let updatedCars = [...selectedCars];

    if (index === -1) {
      updatedCars.push({...item, isChecked: true});
    } else {
      updatedCars = updatedCars.map(car =>
        car.id === item.id ? {...car, isChecked: !car.isChecked} : car,
      );

      if (updatedCars.find(car => car.id === item.id).isChecked === false) {
        updatedCars = updatedCars.filter(car => car.id !== item.id);
      }
    }
    setSelectedCars(updatedCars);
    let toalPrice = 0;
    updatedCars.forEach(car => {
      const {make, isChecked, isActive} = car;
      if (isChecked) {
        let cost = 0;
        if (isActive == true) {
          cost = 0;
        } else {
          let cost = 0;
          switch (categoryId) {
            case 1:
              cost =
                DailyWashImages.find(image => image.typeName === make)?.cost ||
                0;
              break;
            case 2:
              cost =
                AlternateWashImages.find(image => image.typeName === make)
                  ?.cost || 0;
              break;
            case 3:
              cost =
                WeeklyWashImages.find(image => image.typeName === make)?.cost ||
                0;
              break;
            default:
          }
          console.log(`Cost for ${make}: ${cost}`);
          toalPrice += cost;
        }
      }
    });
    setSubscriptionPrice(toalPrice);
    console.log('Total Cost:', toalPrice);
    console.log(updatedCars, 'ssiog');
  };

  const toggleCheckboxSelected = toggledItem => {
    setVehicleItems(prevItems =>
      prevItems.map(item =>
        item.id === toggledItem.id
          ? {...item, isChecked: !item.isChecked}
          : item,
      ),
    );
  };

  const getDayButtonValue = (selectedDays, day) => {
    if (selectedDays.includes(day)) {
      const index = selectedDays.indexOf(day);
      selectedDays.splice(index, 1);
    } else {
      selectedDays.push(day);
    }
    return selectedDays;
  };

  const Save = () => {
    if (FromDate == 'DD/MM/YY') {
      setFromDateVisible(false);
      Alert.alert(
        'Alert',
        'Please select From date',
        [
          {
            text: 'OK',
            onPress: () => {
              setFromDateVisible(true);
            },
          },
        ],
        {cancelable: false},
      );
      return false;
    }

    if (selectedTime === null) {
      Alert.alert(
        'Alert',
        'Please select Available Time',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    if (!VehicleGetData || VehicleGetData.length === 0) {
      Alert.alert(
        'Alert',
        'Please Add Vehicle Details',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    for (var i = 0; i < mergedData.length; i++) {
      if (
        selectedCars.filter(function (el) {
          return mergedData[i].typeName === el.make;
        }).length == 0
      ) {
        Alert.alert(
          'Alert',
          'Please Add All Vehicle From ' +
            mergedData[i].typeName +
            '. Either add your vehicle or uncheck the option.',
        );
        return;
      }
    }
    if (!selectedCars || selectedCars?.length === 0) {
      Alert.alert(
        'Alert',
        'Please select all vehicle Either add a new Vehicle',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      return;
    }

    for (var i = 0; i < mergedData.length; i++) {
      if (
        VehicleGetData.filter(function (el) {
          return mergedData[i].typeName === el.make;
        }).length == 0
      ) {
        Alert.alert(
          'Alert',
          'No vehicle added in  ' +
            mergedData[i].typeName +
            '. Either add your vehicle or uncheck the option.',
        );
        return;
      }
    }
    if (selectedCategoryTitle === 'WEEKLY WASH' && selectedDays.length === 0) {
      Alert.alert(
        'Alert',
        'Please select days for Wash ',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    if (selectedCategoryTitle === 'ALTERNATE WASH') {
      if (selectedDays.length === 0) {
        Alert.alert(
          'Alert',
          'Please select days for Wash',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
        return;
      } else if (selectedDays.length < 3) {
        Alert.alert(
          'Alert',
          'Please select at least three days for Wash',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
        return;
      }
    }

    bookNow();
  };

  const bookNow = () => {
    setModalVisible(true);
    setModal(false);
  };
  const ConfirmBooking = () => {
    const options = {
      description: 'Service Lane Payment',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_live_8iVVvocJaMmVxH',
      amount: SubscriptionPrice * 100,
      name: 'ServiceLane',
      prefill: {
        email: 'servicelanesolution@gmail.com',
        contact: '9321778836',
        name: 'ServiceLane',
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // Payment successful, handle payment ID
        alert(`Success: ${data.razorpay_payment_id}`);
        console.log(`Success: ${data.razorpay_payment_id}`);
        const paymentId = data?.razorpay_payment_id;

        var fDate = moment(FromDate, 'DD-MMM-YYYY');
        var eDate = moment(ToDate, 'DD-MMM-YYYY');
        console.log(eDate, 'eDate');
        const subscriptionData = [];
        selectedItems.forEach(x => {
          selectedCars.forEach(c => {
            subscriptionData.push({
              pkSubscriptionID: 0,
              fkCustomerID: userid,
              fkSubscriptionTypeID: categoryId,
              fkVehicleTypeID: x.id,
              fkVehicleID: c.id,
              startDate: fDate,
              endDate: eDate,
              monday_YN: monday_YN,
              tuesday_YN: tuesday_YN,
              wednesday_YN: wednesday_YN,
              thursday_YN: thursday_YN,
              friday_YN: friday_YN,
              saturday_YN: saturday_YN,
              sunday_YN: sunday_YN,
              fkTimeSlotID: selectedPkTimeSlotID,
              isActive: CatStatus,
              paymentId: paymentId,
              cost: SubscriptionPrice,
              createdBy: 0,
              createdDate: new Date().toISOString(),
              updatedBy: 0,
              updatedDate: new Date().toISOString(),
            });
          });
        });
        console.log(subscriptionData, 'subscriptionData');
        FetchVehicleData(userid);
        setSelectedTime(null);
        setSelectedDays([]);
        setSelectedCars([]);
        resetForm();
        SaveSubscription(subscriptionData);
        setSubscriptionPrice(0);
        navigation.navigate('My Subscriptions');
        setModalVisible(false);
      })
      .catch(error => {
        // Handle payment cancellation or failure
        alert(`Error: Payment has been Cancelled`);
      });
  };


const BookViaCash=()=>{  
  var fDate = moment(FromDate, 'DD-MMM-YYYY');
  var eDate = moment(ToDate, 'DD-MMM-YYYY');
  console.log(eDate, 'eDate');
  const subscriptionData = [];
  selectedItems.forEach(x => {
    selectedCars.forEach(c => {
      subscriptionData.push({
        pkSubscriptionID: 0,
        fkCustomerID: userid,
        fkSubscriptionTypeID: categoryId,
        fkVehicleTypeID: x.id,
        fkVehicleID: c.id,
        startDate: fDate,
        endDate: eDate,
        monday_YN: monday_YN,
        tuesday_YN: tuesday_YN,
        wednesday_YN: wednesday_YN,
        thursday_YN: thursday_YN,
        friday_YN: friday_YN,
        saturday_YN: saturday_YN,
        sunday_YN: sunday_YN,
        fkTimeSlotID: selectedPkTimeSlotID,
        isActive: false,
        paymentId: "null",
        cost: SubscriptionPrice,
        createdBy: 0,
        createdDate: new Date().toISOString(),
        updatedBy: 0,
        updatedDate: new Date().toISOString(),
      });
    });
    console.log(subscriptionData, 'subscriptionData');
    FetchVehicleData(userid);
    setSelectedTime(null);
    setSelectedDays([]);
    setSelectedCars([]);
    resetForm();
    SaveSubscription(subscriptionData);
    setSubscriptionPrice(0);
    navigation.navigate('My Subscriptions');
    setModalVisible(false);
  });
};
  const mergedData = [];
  selectedItems.forEach(selectedItem => {
    if (selectedItem) {
      vehicleItem.forEach(vehicle => {
        if (vehicle) {
          const mergedObject = {
            ...selectedItem,
            ...vehicle,
          };
          const exists = mergedData.some(item => item.id === mergedObject.id);
          if (mergedObject.isChecked === true && !exists) {
            mergedData.push(mergedObject);
          }
        }
      });
    }
  });

  useEffect(() => {
    var currentDate = new Date();
    var newdate = new Date(new Date());
    currentDate.setMonth(currentDate.getMonth() + 1);

    var d = currentDate.getDate();
    var M = currentDate.getMonth();
    var y = currentDate.getFullYear();
    var d1 = newdate.getDate();
    var M1 = newdate.getMonth();
    var y1 = newdate.getFullYear();
    d1 = d1 < 10 ? '0' + d1 : d1;
    let current = `${d1}-${months[M1]}-${y1}`;
    let futureDate = `${d}-${months[M]}-${y}`;
    SubscriptionUpdate({prop: 'FromDate', value: current});

    SubscriptionUpdate({prop: 'ToDate', value: futureDate});
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{selectedCategoryTitle}</Text>
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          <Text></Text>
          <View style={[styles.flexbox]}>
            <Text style={{...styles.ServiceText}}>
              Description: {categoryDetail}
            </Text>
            <Text></Text>
          </View>
          <Text style={{...styles.SubscriptionText}}>
            Subscription is For 1 Month
          </Text>
          <Text style={styles.sectionTitle}> Selected Vehicle's</Text>
          <CardView style={styles.CardView}>
            <View>
              {categoryId === 1 && (
                <FlatList
                  data={vehicleItem}
                  horizontal
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, i}) => (
                    <View style={{alignItems: 'center', marginHorizontal: 6}}>
                      <CheckBox
                        checked={item.isChecked}
                        onPress={x => {
                          toggleCheckboxSelected(item, i);
                        }}
                        containerStyle={styles.checkbox}
                        checkedColor="black"
                      />
                      {DailyWashImages.find(image => image.id == item.id) ? (
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
                      {DailyWashImages.find(image => image.id === item.id) ? (
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'black',
                          }}>
                          Cost: ₹
                          {
                            DailyWashImages.find(image => image.id === item.id)
                              .cost
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
              )}
              {categoryId === 2 && (
                <FlatList
                  data={vehicleItem}
                  horizontal
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, i}) => (
                    <View style={{alignItems: 'center', marginHorizontal: 6}}>
                      <CheckBox
                        checked={item.isChecked}
                        onPress={x => {
                          toggleCheckboxSelected(item, i);
                        }}
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
                          Cost: ₹
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
              )}
              {categoryId === 3 && (
                <FlatList
                  data={vehicleItem}
                  horizontal
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, i}) => (
                    <View style={{alignItems: 'center', marginHorizontal: 6}}>
                      <CheckBox
                        checked={item.isChecked}
                        onPress={x => {
                          toggleCheckboxSelected(item, i);
                        }}
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
                      {WeeklyWashImages.find(image => image.id === item.id) ? (
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'black',
                          }}>
                          Cost: ₹
                          {
                            WeeklyWashImages.find(image => image.id === item.id)
                              .cost
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
              )}
            </View>
          </CardView>
          <Text></Text>
          <View>
            <View
              style={
                !IsVisible
                  ? styles.AccordionheaderContainer
                  : styles.AccordionheaderContainerExpended
              }
              onPress={() => setIsVisible(!IsVisible)}>
              <View style={{flexDirection: 'column', width: '91%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}>
                  <View flexDirection="column">
                    <Text
                      style={[
                        styles.AccordionsubitemsBold,
                        {color: textcolor},
                      ]}>
                      See Your Existing Vehicle Details
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text></Text>
              {VehicleGetData?.length > 0 ? (
                <>
                  <ScrollView>
                    {loading ? (
                      <ActivityIndicator size="large" color="red" />
                    ) : null}
                    <FlatList
                      data={VehicleGetData.filter(vehicle =>
                        mergedData.some(
                          selectedItem =>
                            selectedItem.typeName === vehicle.make,
                        ),
                      )}
                      scrollEnabled={false}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => {
                        return (
                          <View style={{flexDirection: 'row'}}>
                            <CheckBox
                              checked={
                                item?.isActive ||
                                selectedCars.some(car => car.id === item.id)
                              }
                              onPress={() => toggleCheckbox(item)}
                              disabled={item.isActive}
                              containerStyle={styles.checkbox}
                            />
                            <View style={{flexDirection: 'column', padding: 5}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  padding: 1,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: '900',
                                    color: 'black',
                                  }}>
                                  Vehicle: {item.model}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: '500',
                                  color: 'black',
                                }}>
                                Vehicle No: {item.vehicleNo}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: '500',
                                  color: 'black',
                                }}>
                                Cleaning: {item.make}
                              </Text>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </ScrollView>
                  <Text></Text>
                  <View style={{alignSelf: 'center'}}>
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color="black"
                      size={40}
                      style={{alignSelf: 'center'}}
                      onPress={() => {
                        navigation.navigate('AddCars');
                      }}
                    />
                  </View>
                </>
              ) : (
                <View>
                  {loading ? (
                    <ActivityIndicator size="large" color="red" />
                  ) : null}
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '900',
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    Please Add Your Vehicle's
                  </Text>
                  <MaterialCommunityIcons
                    name="plus-circle"
                    color="black"
                    size={40}
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                      navigation.navigate('AddCars');
                    }}
                  />
                </View>
              )}

              {/* </View> */}
            </View>
          </View>
          <Text style={styles.sectionTitle}> Select Days</Text>
          {selectedCategoryTitle == 'WEEKLY WASH' && (
            <>
              <View style={styles.daysContainer}>
                <View style={{flexDirection: 'row',width:Dimensions.get('screen').width*.98,justifyContent:'space-evenly'}}>
                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      sunday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Monday') &&
                        !selectedDays.includes('Tuesday') &&
                        !selectedDays.includes('Wednesday') &&
                        !selectedDays.includes('Thursday') &&
                        !selectedDays.includes('Friday') &&
                        !selectedDays.includes('Saturday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'sunday_YN',
                          value: sunday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Sunday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    SUN
                  </Button>

                  <Button
                    style={[
                      styles.dayButton,
                      monday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Sunday') &&
                        !selectedDays.includes('Tuesday') &&
                        !selectedDays.includes('Wednesday') &&
                        !selectedDays.includes('Thursday') &&
                        !selectedDays.includes('Friday') &&
                        !selectedDays.includes('Saturday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'monday_YN',
                          value: monday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Monday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    MON
                  </Button>
                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      tuesday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Sunday') &&
                        !selectedDays.includes('Monday') &&
                        !selectedDays.includes('Wednesday') &&
                        !selectedDays.includes('Thursday') &&
                        !selectedDays.includes('Friday') &&
                        !selectedDays.includes('Saturday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'tuesday_YN',
                          value: tuesday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Tuesday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    TUE
                  </Button>

                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      wednesday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Sunday') &&
                        !selectedDays.includes('Monday') &&
                        !selectedDays.includes('Tuesday') &&
                        !selectedDays.includes('Thursday') &&
                        !selectedDays.includes('Friday') &&
                        !selectedDays.includes('Saturday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'wednesday_YN',
                          value: wednesday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Wednesday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    WED
                  </Button>

                  <Button
                    value={4}
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      thursday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Sunday') &&
                        !selectedDays.includes('Monday') &&
                        !selectedDays.includes('Tuesday') &&
                        !selectedDays.includes('Wednesday') &&
                        !selectedDays.includes('Friday') &&
                        !selectedDays.includes('Saturday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'thursday_YN',
                          value: thursday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Thursday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    THU
                  </Button>
                </View>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row',justifyContent:'space-between',width:'25%'}}>
                <Button
                  value={5}
                  labelStyle={{color: 'black', fontWeight: 'bold'}}
                  style={[
                    styles.dayButton,
                    friday_YN == 'Yes' ? styles.selectedButton : null,
                  ]}
                  onPress={() => {
                    if (
                      !selectedDays.includes('Sunday') &&
                      !selectedDays.includes('Monday') &&
                      !selectedDays.includes('Tuesday') &&
                      !selectedDays.includes('Wednesday') &&
                      !selectedDays.includes('Thursday') &&
                      !selectedDays.includes('Saturday')
                    ) {
                      SubscriptionUpdate({
                        prop: 'friday_YN',
                        value: friday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Friday'),
                      );
                    }
                  }}
                  disabled={selectedCategoryTitle === 'DAILY WASH'}>
                  FRI
                </Button>

                <Button
                  value={6}
                  labelStyle={{color: 'black', fontWeight: 'bold'}}
                  style={[
                    styles.dayButton,
                    saturday_YN == 'Yes' ? styles.selectedButton : null,
                  ]}
                  onPress={() => {
                    if (
                      !selectedDays.includes('Sunday') &&
                      !selectedDays.includes('Monday') &&
                      !selectedDays.includes('Tuesday') &&
                      !selectedDays.includes('Wednesday') &&
                      !selectedDays.includes('Thursday') &&
                      !selectedDays.includes('Friday')
                    ) {
                      SubscriptionUpdate({
                        prop: 'saturday_YN',
                        value: saturday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Saturday'),
                      );
                    }
                  }}
                  disabled={selectedCategoryTitle === 'DAILY WASH'}>
                  SAT
                </Button>
              </View>
            </>
          )}
          {selectedCategoryTitle === 'ALTERNATE WASH' && (
            <>
              <View style={styles.daysContainer}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'90%'}}>
                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      sunday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Monday') &&
                        !selectedDays.includes('Saturday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'sunday_YN',
                          value: sunday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Sunday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    SUN
                  </Button>

                  <Button
                    style={[
                      styles.dayButton,
                      monday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Sunday') &&
                        !selectedDays.includes('Tuesday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'monday_YN',
                          value: monday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Monday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    MON
                  </Button>
                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      tuesday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Monday') &&
                        !selectedDays.includes('Wednesday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'tuesday_YN',
                          value: tuesday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Tuesday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    TUE
                  </Button>

                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      wednesday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Tuesday') &&
                        !selectedDays.includes('Thursday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'wednesday_YN',
                          value: wednesday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Wednesday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    WED
                  </Button>

                  <Button
                    value={4}
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      thursday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      if (
                        !selectedDays.includes('Wednesday') &&
                        !selectedDays.includes('Friday')
                      ) {
                        SubscriptionUpdate({
                          prop: 'thursday_YN',
                          value: thursday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Thursday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    THU
                  </Button>
                </View>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row',justifyContent:'space-between',width:'25%'}}>
                <Button
                  value={5}
                  labelStyle={{color: 'black', fontWeight: 'bold'}}
                  style={[
                    styles.dayButton,
                    friday_YN == 'Yes' ? styles.selectedButton : null,
                  ]}
                  onPress={() => {
                    if (
                      !selectedDays.includes('Thursday') &&
                      !selectedDays.includes('Saturday')
                    ) {
                      SubscriptionUpdate({
                        prop: 'friday_YN',
                        value: friday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Friday'),
                      );
                    }
                  }}
                  disabled={selectedCategoryTitle === 'DAILY WASH'}>
                  FRI
                </Button>

                <Button
                  value={6}
                  labelStyle={{color: 'black', fontWeight: 'bold'}}
                  style={[
                    styles.dayButton,
                    saturday_YN == 'Yes' ? styles.selectedButton : null,
                  ]}
                  onPress={() => {
                    if (
                      !selectedDays.includes('Friday') &&
                      !selectedDays.includes('Sunday')
                    ) {
                      SubscriptionUpdate({
                        prop: 'saturday_YN',
                        value: saturday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Saturday'),
                      );
                    }
                  }}
                  disabled={selectedCategoryTitle === 'DAILY WASH'}>
                  SAT
                </Button>
              </View>
            </>
          )}
          {selectedCategoryTitle === 'DAILY WASH' && (
            <>
              <View style={styles.daysContainer}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'90%'}}>
                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      sunday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      SubscriptionUpdate({
                        prop: 'sunday_YN',
                        value: sunday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Sunday'),
                      );
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    SUN
                  </Button>

                  <Button
                    style={[
                      styles.dayButton,
                      monday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    onPress={() => {
                      {
                        SubscriptionUpdate({
                          prop: 'monday_YN',
                          value: monday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Monday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    MON
                  </Button>
                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      tuesday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      {
                        SubscriptionUpdate({
                          prop: 'tuesday_YN',
                          value: tuesday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Tuesday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    TUE
                  </Button>

                  <Button
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      wednesday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      {
                        SubscriptionUpdate({
                          prop: 'wednesday_YN',
                          value: wednesday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Wednesday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    WED
                  </Button>

                  <Button
                    value={4}
                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                    style={[
                      styles.dayButton,
                      thursday_YN == 'Yes' ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                      {
                        SubscriptionUpdate({
                          prop: 'thursday_YN',
                          value: thursday_YN == 'Yes' ? 'No' : 'Yes',
                        });
                        setSelectedDays(selectedDays =>
                          getDayButtonValue([...selectedDays], 'Thursday'),
                        );
                      }
                    }}
                    disabled={selectedCategoryTitle === 'DAILY WASH'}>
                    THU
                  </Button>
                </View>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row',justifyContent:'space-between',width:'25%'}}>
                <Button
                  value={5}
                  labelStyle={{color: 'black', fontWeight: 'bold'}}
                  style={[
                    styles.dayButton,
                    friday_YN == 'Yes' ? styles.selectedButton : null,
                  ]}
                  onPress={() => {
                    {
                      SubscriptionUpdate({
                        prop: 'friday_YN',
                        value: friday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Friday'),
                      );
                    }
                  }}
                  disabled={selectedCategoryTitle === 'DAILY WASH'}>
                  FRI
                </Button>

                <Button
                  value={6}
                  labelStyle={{color: 'black', fontWeight: 'bold'}}
                  style={[
                    styles.dayButton,
                    saturday_YN == 'Yes' ? styles.selectedButton : null,
                  ]}
                  onPress={() => {
                    {
                      SubscriptionUpdate({
                        prop: 'saturday_YN',
                        value: saturday_YN == 'Yes' ? 'No' : 'Yes',
                      });
                      setSelectedDays(selectedDays =>
                        getDayButtonValue([...selectedDays], 'Saturday'),
                      );
                    }
                  }}
                  disabled={selectedCategoryTitle === 'DAILY WASH'}>
                  SAT
                </Button>
              </View>
            </>
          )}

          <Text style={styles.sectionTitle}> Available Slots</Text>
          <View style={styles.timeContainer}>
            {TimeSlot.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.TimeButton,
                  selectedTime === index && styles.selectedTimeButton,
                ]}
                onPress={() => toggleTime(index, slot.pkTimeSlotID)}>
                <Text
                  style={[
                    styles.dayText,
                    selectedTime === index && styles.selectedTimeText,
                  ]}>
                  {slot.timeslot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{flexDirection: 'row',justifyContent:'space-between',width:'90%'}}>
            <DateDailog
              label="Current Date"
              input={FromDate}
              minimumDate={new Date()}
              isVisible={FromDateVisible}
              onSelected={value => {
                SubscriptionUpdate({prop: 'FromDate', value: value});

                const parts = value.split('-');
                const day = parseInt(parts[0], 10);
                const month = parts[1];
                const year = parseInt(parts[2], 10);
                const monthMap = [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ];

                var monthIndex = monthMap.indexOf(month);
                console.log({monthIndex, month});
                const selectedDate = new Date(year, monthIndex, day);

                selectedDate.setDate(selectedDate.getDate() + 30);
                var d = selectedDate.getDate();
                var M = selectedDate.getMonth();
                var y = selectedDate.getFullYear();
                d = d < 10 ? '0' + d : d;

                const formattedPlus30Days = `${d}-${monthMap[M]}-${y}`;

                SubscriptionUpdate({
                  prop: 'ToDate',
                  value: formattedPlus30Days,
                });
              }}
            />

            <DateDailog
              label="To Date"
              input={ToDate}
              minimumDate={new Date()}
              isVisible={ToDateVisible}
              enabled={false}
              onSelected={value => {
                SubscriptionUpdate({prop: 'ToDate', value: value});
              }}
            />
          </View>

          <Text style={{...styles.sectionTitle, textAlign: 'center'}}>
            Total Cost: ₹{SubscriptionPrice}
          </Text>
          <Text></Text>
          <Button
            style={styles.buttonStyle}
            labelStyle={{color: 'white', fontWeight: 'bold'}}
            onPress={() => Save()}>
            BOOK NOW
          </Button>
          <Text></Text>
          <Button
            style={styles.buttonStyle}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Go Back</Text>
          </Button>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#EEEEEE',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  alignSelf: 'stretch',
                  marginBottom: 10,
                  padding: 10,
                }}>
                <Text style={{color: 'black', textDecorationLine: 'underline'}}>
                  Confirm Booking
                </Text>
                <MaterialCommunityIcons
                  name="close-thick"
                  color="black"
                  size={20}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...styles.ServiceText, textAlign: 'left'}}>
                    {selectedCategoryTitle}
                  </Text>
                  <Text style={styles.slotText}>
                    slot:
                    {selectedPkTimeSlotID === 1
                      ? '6-8'
                      : selectedPkTimeSlotID === 2
                      ? '8-10'
                      : ''}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.slotText}>Service Lane</Text>
                  {/* <Text style={styles.slotText}>{fDate}</Text> */}
                </View>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...styles.ServiceText}}>
                    ₹{SubscriptionPrice}
                  </Text>
                  <Text style={{...styles.slotText}}>
                    (Pay Directly to Vendor)
                  </Text>
                </View>
                <View
                  style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}
                />
              </View>
              <Text></Text>
              <CheckBox
                title={`I Agree to Pay Rs ${SubscriptionPrice} Conveyancing charges T&C and Refund Policy Apply`}
                checked={isCallback}
                onPress={() => setIsCallback(!isCallback)}
                checkedColor="blue"
                containerStyle={styles.checkbox}
                titleStyle={{color: 'black'}}
              />
              <Button
                style={styles.buttonStyle}
                labelStyle={{color: 'white', fontWeight: 'bold'}}
                onPress={ConfirmBooking}>
                Pay Online
              </Button>
              <Text></Text>
              <Button
                style={styles.buttonStyle}
                labelStyle={{color: 'white', fontWeight: 'bold'}}
                onPress={BookViaCash}
                >
                Pay Cash
              </Button>
              <Text></Text>
            </View>
          </View>
        </Modal>
      </View>
      <BottomTabView navigation={navigation} />
    </>
  );
}

export default SubscriptionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  flexbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer1: {
    width: 60,
    height: 50,
  },
  CardView: {
    borderRadius: 1,
    backgroundColor: 'white',
    margin: 5,
    paddingBottom: 5,
    paddingRight: 1,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  image: {
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  sectionDescription: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    flexShrink: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '1%',
  },
  disabledDayText: {
    color: 'white',
  },
  TimeButton: {
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 4,
    marginBottom: 10,
    width: '40%',
  },
  selectedDayButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  selectedTimeButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  dayText: {
    fontSize: 13,
    color: 'black',
  },
  selectedDayText: {
    color: 'white',
  },
  selectedTimeText: {
    color: 'white',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  modalView: {
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 1,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    // height:'80%',
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ServiceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  SubscriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F51FF',
    textAlign: 'left',
  },
  slotText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },

  checkbox: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  AccordionheaderContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1F51FF',
    alignItems: 'center',
    borderBottomColor: '#1F51FF',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  AccordionheaderContainerExpended: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1F51FF',
    alignItems: 'center',
    alignSelf: 'center',
  },
  AccordionheaderBodyStylesCollapsed: {
    padding: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AccordionheaderBodyStyles: {
    padding: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alternateWashDayButton: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    opacity: 0.5,
  },
});
