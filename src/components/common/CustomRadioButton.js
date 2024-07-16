import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const CustomRadioButton = ({titleYes,titleNo,onSelected,Value}) => {
  const [isPressed1, setIsPressed1] = useState();
  const [isPressed2, setIsPressed2] = useState(false);

  const handlePress1 = () => {
    setIsPressed1(true);
    setIsPressed2(false);
    onSelected(1)
  };

  const handlePress2 = () => {
    setIsPressed1(false);
    setIsPressed2(true);
    onSelected(2)
  };

  const buttonStyle1 = isPressed1
    ? [styles.button, styles.buttonPressed, styles.button1]
    : [styles.button, styles.button1];

  const buttonStyle2 = isPressed2
    ? [styles.button, styles.buttonPressed, styles.button2]
    : [styles.button, styles.button2];

  const textStyle1 = isPressed1
    ? [styles.text, styles.textPressed]
    : styles.text;

  const textStyle2 = isPressed2
    ? [styles.text, styles.textPressed1]
    : styles.text;

  return (
    <View style={styles.container}>
      <View style={styles.input}>
      <TouchableOpacity
        style={buttonStyle1}
        onPress={handlePress1}
        disabled={isPressed1}
      >
        <Text style={textStyle1}>{titleYes}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonStyle2}
        onPress={handlePress2}
        disabled={isPressed2}
      >
        <Text style={textStyle2}>{titleNo}</Text>
      </TouchableOpacity>
      </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    margin: 2,
  },
  label: {
    marginTop: 2,
    fontSize: 13,
    paddingLeft: 17,
    color: '#000000',
    letterSpacing: 0.8,
    fontWeight: 'bold',
    textShadowColor: '#d8d8d8',
    textShadowRadius: 0.1,
    textDecorationColor: 'red',
  },
  input: {
    borderWidth: 0.8,
    borderColor: '#d8d8d8',
    padding: 8,
    paddingLeft:8,
    margin: 4,
    width:'90%',
    alignSelf:'center',
    borderRadius: 8,
    height:55,
    flexDirection:'row',
  },
  button: {
    borderRadius: 4,
    justifyContent:'flex-start' ,
    paddingLeft:10
  },
  button1: {
    backgroundColor: "white",
    justifyContent:'flex-start' 
  },
  button2: {
    backgroundColor: "white",
   
  },
  buttonPressed: {
    opacity: 0.9
  },
  text: {
    
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    fontSize: 16,
    borderRadius: 10,
    height: 40,
    width: 100,
    textAlign: "center",
    textAlignVertical: "center"
  },
  textPressed: {
    color: "black",
    backgroundColor: "green",
  
  },
  textPressed1: {
    color: "black",
    backgroundColor: "red"
  },
 
});

export default CustomRadioButton;
