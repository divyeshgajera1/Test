import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as SubscriberContext} from '../../context/SubscriberContext';
import Subscription from '../../screens/Customer/Subscription/Subscription';
import {Context as VehicleContext} from '../../context/VehicleContext';
import {color} from 'react-native-elements/dist/helpers';
const AccordionSubscription = ({item, children, type}) => {
  const {
    state: {GetSubscriptionType,},
  } = useContext(SubscriberContext);
  const {GetSubscription} = GetSubscriptionType;
  const {
    state: {getVehicle,loading},
    FetchVehicleData,
  } = useContext(VehicleContext);
  useEffect(() => {
    FetchVehicleData(item?.fkCustomerID);
  }, []);
  const {VehicleGetData} = getVehicle;
  const [IsVisible, setIsVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const textcolor = IsVisible ? 'white' : 'white';
  const subscription = GetSubscription.find(subscription => {
    return subscription.pkMasterID === item.fkSubscriptionTypeID;
  });
  return (
    <View>
      <ScrollView>
        <TouchableOpacity
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
              }}>
              <View flexDirection="column">
                <Text
                  style={[styles.AccordionsubitemsBold, {color: textcolor}]}>
                  Start Date: {new Date(item?.startDate).toLocaleDateString()}
                </Text>
                <Text
                  style={[styles.AccordionsubitemsBold, {color: textcolor}]}>
                  Validity: {new Date(item?.endDate).toLocaleDateString()}
                </Text>
              </View>
              <Card
                style={{height: 30, width: 80, marginTop: 7, borderRadius: 1}}>
                <View style={{flexDirection:'row'}}>
                 <MaterialCommunityIcons
                    name="circle"
                    color={item.isActive ? 'green' : 'red'}
                    size={12}
                    style={{marginLeft: '15%', marginTop:8}}
                  />
                  <Text
                    style={{
                      color: item?.isActive ? 'green' : 'red',
                      marginTop:5
                    }}>
                    {item?.isActive ? 'Active' : 'Pending'}
                  </Text>
                  </View>
              </Card>
            </View>
          </View>
          {IsVisible ? (
            <MaterialCommunityIcons name="chevron-up" size={24} color="white" />
          ) : (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="white"
            />
          )}
        </TouchableOpacity>
        <View>
          <View
            style={
              !IsVisible
                ? styles.AccordionheaderBodyStylesCollapsed
                : styles.AccordionheaderBodyStyles
            }>
            {/* <View flexDirection="row" width="90%"> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View flexDirection="row">
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[styles.AccordionsubitemsBold, {paddingTop: 10}]}>
                    {subscription && subscription?.name}
                  </Text>
                  {/* {console.log(subscription?.name)} */}
                 
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
        {IsVisible && (
          <View style={styles.AccordioncontentBodyStyles}>
            {item?.fkVehicleID && VehicleGetData && (
              <Text style={{color: 'black',paddingLeft:10,fontWeight:'700'}}>
                Vehicle Name:{' '}
                {
                  VehicleGetData.find(
                    vehicle => vehicle?.id === item?.fkVehicleID,
                  )?.model
                }
              </Text>
            )}
            <View style={styles.daysContainer}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    selectedDays.includes(index) && styles.selectedDayButton,
                    index === 0 &&
                      item?.sunday_YN === 'Yes' && {backgroundColor: 'green'},
                    index === 1 &&
                      item?.monday_YN === 'Yes' && {backgroundColor: 'green'},
                    index === 2 &&
                      item?.tuesday_YN === 'Yes' && {backgroundColor: 'green'},
                    index === 3 &&
                      item?.wednesday_YN === 'Yes' && {
                        backgroundColor: 'green',
                      },
                    index === 4 &&
                      item?.thursday_YN === 'Yes' && {backgroundColor: 'green'},
                    index === 5 &&
                      item?.friday_YN === 'Yes' && {backgroundColor: 'green'},
                    index === 6 &&
                      item?.saturday_YN === 'Yes' && {backgroundColor: 'green'},
                  ]}>
                  <Text
                    style={[
                      styles.dayText,
                      selectedDays.includes(index) && styles.selectedDayText,
                    ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
            style={styles.buttonStyle}
            labelStyle={{color: 'white', fontWeight: 'bold'}}
            >
            RENEW
            </Button>
            {console.log(VehicleGetData.model)}
          </View>
        )}
            {loading ? <ActivityIndicator size="large" color="red" /> : null}
      </ScrollView>
    </View>
  );
};

export {AccordionSubscription};
const styles = StyleSheet.create({
  AccordionheaderContainer: {
    // padding: 4,
    overflow: 'hidden',
    // borderTopLeftRadius: 4,
    // borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0047BD',
    alignItems: 'center',
    borderBottomColor: '#0047BD',
    borderBottomWidth: 1,
    alignSelf: 'center',
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
  AccordionheaderContainerExpended: {
    // padding: 4,
    overflow: 'hidden',
    // borderTopLeftRadius: 4,
    // borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0047BD',
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
  subitemsHdr: {
    fontSize: 13,
    color: 'grey',
    fontFamily: 'Jost, Montserrat',
    paddingBottom: 0,
    marginTop: 4,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderColor: '#ccc',
    padding: 3,
    paddingLeft: 15,
  },
  subitems: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Jost, Montserrat',
    padding: 3,
    paddingTop: 0,
    marginTop: 4,
    paddingLeft: 0,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  AccordionsubitemsBold: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    padding: 2,
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
  AccordioncontentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  AccordioncontentBodyStyles: {
    padding: 4,
    backgroundColor: 'white',
  },
  dayButton: {
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginRight: 7,
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: 5,
    padding: 10,
  },
  selectedDayButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedDayText: {
    color: 'white',
  },
  AccordioncontactStyle: {
    textAlign: 'left',
    color: '#0835A8',
    marginLeft: 4,
    fontSize: 16,
    paddingLeft: 10,
  },
  AccordiontextStyle: {
    fontSize: 13,
    color: 'black',
    textTransform: 'uppercase',
    fontFamily: 'Jost, Montserrat',
    textAlign: 'center',
    padding: 5,
  },
  Accordioncard: {
    borderRadius: 4,
    borderWidth: 0.6,
    borderColor: 'grey',
    paddingLeft: 4,
    paddingRight: 4,
    height: 35,
    margin: 4,
    minWidth: 120,
    backgroundColor: 'lightblue',
    alignSelf: 'flex-end',
  },
  Text: {
    fontSize: 13,
    fontWeight: '500',
    padding: 10,
    color: 'black',
  },
});
