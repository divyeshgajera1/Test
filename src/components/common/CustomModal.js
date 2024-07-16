import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {Button} from 'react-native-paper';

const {width: screenWidth} = Dimensions.get('window');
const imagesPerRow = 3;

const CustomModal = ({modalVisible, toggleModal, data}) => {
  // Splitting the data into rows of three images
  const rows = [];
  for (let i = 0; i < data.length; i += imagesPerRow) {
    rows.push(data.slice(i, i + imagesPerRow));
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Display images in rows */}
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map((item, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={item.imageSource} 
                    style={styles.productImage}
                  />

                  <Text>{item.description}</Text>

                  {/* Add other content for your product item */}
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={{
              borderRadius: 12,
              minWidth: 120,
              backgroundColor: '#400050',
              alignItems: 'center',
              justifyContent: 'center',
              height:50
            }}
            onPress={toggleModal}>
            <Text style={{color: 'white'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Define your styles here as per your modal content and structure
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    width: 350,
    padding: 50, // Adjust the padding as needed
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  productImage: {
    // Styles for product images
    width: 70, // Adjust the width as needed for smaller images
    height: 100, // Adjust the height as needed for smaller images
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default CustomModal;
