import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet,Dimensions,TouchableOpacity,Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Context as ServiceContext} from '../../../context/ServiceContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardView} from '../../../components/common';
const Dashboard = ({navigation}) => {
  const {
    state: {form, getServices},
    FetchServiceDetail,
  } = useContext(ServiceContext);
  const {GetServiceDetails} = getServices;
  useEffect(()=>{
   FetchServiceDetail() 
  },[])
  const ServiceImages = [
    {
      id: 27,
      image: require('../../../../assets/pressure_washing.png'),
      Description:'Pressure Wash'
    },
    {
      id: 28,
      image: require('../../../../assets/shampoo_wash.png'),
      Description:'Shampoo Wash'
    },
    {
      id: 29,
      image: require('../../../../assets/tyre_polish.png'),
    },
    {
      id: 31,
      image: require('../../../../assets/twice_washing.png'),
    },
    {
      id: 32,
      image: require('../../../../assets/car_wipe.png'),
    },
  ];
  return (
    <View>
      <Carousel
        data={GetServiceDetails}
        renderItem={({item}) => {
          const imageDetail = ServiceImages.find(
            image => image.id === item.pkServiceID,
          );
          const imageID = imageDetail ? imageDetail.id : null;

          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Service_Details', {
                    serviceItem: item,
                    imageID: imageID, // Pass the image ID to the next screen
                  })
                }>
                <CardView
                  style={[styles.CardView, {width: '95%', height: 100}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 13,
                          flex: 1,
                          marginLeft: 10,
                          marginTop: 10,
                        }}>
                        {item.serviceName}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 11,
                          flex: 2,
                          marginLeft: 10,
                          color: 'black',
                        }}>
                        {item.serviceDescription}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: 'blue',
                          padding: 10,
                          borderRadius: 1,
                          width: 160,
                        }}>
                        {imageDetail ? (
                          <View style={styles.imageContainer}>
                            <Image
                              source={imageDetail.image}
                              style={{
                                width: 200,
                                height: 85,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </CardView>
              </TouchableOpacity>
              <Text></Text>
            </View>
          );
        }}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 50}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        autoplayDelay={1000}
        // paginationStyle={styles.paginationStyle}
      />
    </View>
  );
};

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

export default Dashboard;
