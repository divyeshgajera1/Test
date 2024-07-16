import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {CardView} from '../../../common';
function ServiceDetail({navigation, route}) {
  const {serviceItem, imageID} = route.params;
  const [loading, setLoading] = useState(false);
  console.log(imageID);
  console.log(serviceItem);
  const ServiceImages = [
    {
      id: 27,
      image: require('../../../../../assets/pressure_washing.png'),
    },
    {
      id: 28,
      image: require('../../../../../assets/shampoo_wash.png'),
    },
    {
      id: 29,
      image: require('../../../../../assets/tyre_polish.png'),
    },
    {
      id: 31,
      image: require('../../../../../assets/twice_washing.png'),
    },
    {
      id: 32,
      image: require('../../../../../assets/car_wipe.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.flexbox]}>
        <Text style={styles.title}>{serviceItem.serviceName}</Text>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <CardView style={styles.CardView}>
            {ServiceImages.find(image => image.id == imageID) ? (
              <View style={styles.imageContainer}>
                <Image
                  source={
                    ServiceImages.find(image => image.id === imageID).image
                  }
                  style={{
                    width: 350,
                    height: 200,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : null}
          </CardView>
        </View>
        <Text></Text>
        <Text style={styles.sectionDescription}>
          {serviceItem.serviceDescription}
        </Text>
        <Text></Text>
        <Button
          style={styles.buttonStyle}
          labelStyle={{color: 'white', fontWeight: 'bold'}}
          onPress={() => {
            setLoading(true);
            navigation.goBack();
          }}>
          GO BACK
        </Button>
        {loading === true ? (
          <ActivityIndicator size="large" color="red" alignSelf="center" />
        ) : null}
      </ScrollView>
    </View>
  );
}

export default ServiceDetail;

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
    borderRadius: 15,
    backgroundColor: 'white',
    width: 320,
    height: 250,
  },
  image: {
    width: 300,
    height: 260,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  sectionDescription: {
    fontSize: 20,
    color: 'grey',
    marginTop: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 4,
    marginBottom: 10,
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
    fontSize: 15,
    fontWeight: 'bold',
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
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  slotText: {
    fontSize: 13,
    fontWeight: '500',
  },

  checkbox: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
});
