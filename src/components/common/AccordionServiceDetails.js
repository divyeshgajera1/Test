import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {CheckBox} from 'react-native-elements';
import {Context as AuthContext} from '../../context/AuthContext';
import {CardView} from './CardView';
import { ScrollView } from 'react-native-gesture-handler';

const AccordionServiceDetails = ({Services, children}) => {
  const {
    state: {auth},
  } = useContext(AuthContext);
  const {user} = auth;
  const userid = user?.id;

  console.log(Services, 'Services');
  const [IsVisible, setIsVisible] = useState(false);
  var SCREEN_WIDTH = Dimensions.get('screen').width;

  const textcolor = IsVisible ? 'white' : 'white';
  return (
    <View>
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
              padding: 5,
            }}>
            <View flexDirection="column">
              <Text style={[styles.AccordionsubitemsBold, {color: textcolor}]}>
             Services
              </Text>
            </View>
          </View>
        </View>
        {IsVisible ? (
          <MaterialCommunityIcons name="chevron-up" size={24} color="white" />
        ) : (
          <MaterialCommunityIcons name="chevron-down" size={24} color="white" />
        )}
      </TouchableOpacity>
      <View>
        <View
          style={
            !IsVisible
              ? styles.AccordionheaderBodyStylesCollapsed
              : styles.AccordionheaderBodyStyles
          }>
          <View flexDirection="column" width="100%">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>
        </View>
      </View>
      {IsVisible && (
        <View style={styles.AccordioncontentBodyStyles}>
          <View style={styles.container}>
            <ScrollView>
              <FlatList
                data={Services}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.pkServiceID}
                renderItem={({item}) => (
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text></Text>
                    <CardView style={styles.CardView}>
                      <Text style={styles.subitems}>
                        Services: {item.serviceName}
                      </Text>

                      <Text
                        style={[
                          styles.subitems,
                          {flexWrap: 'wrap', width: '70%'},
                        ]}
                        numberOfLines={3}>
                        Description: {item.serviceDescription}
                      </Text>
                      
                    </CardView>
                  </View>
                )}
              />
              </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export {AccordionServiceDetails};
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
    padding: 10,
    paddingTop: 0,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  CardView: {
    borderRadius: 5,
    backgroundColor: 'white',

    paddingBottom: 5,
    paddingRight: 1,
  },
  profileImage: {
    width: 200,
    height: 200,
    // borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
    color: 'black',
  },
  AccordionsubitemsBold: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    padding: 3,
    paddingLeft: 17,
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
    paddingHorizontal: 10,
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
    fontFamily: 'Jost, Montserrat', // React Native supports specifying multiple fonts
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
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  MainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
    width: '49%',
    minWidth: 200,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 10,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#8a8aed',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
});
