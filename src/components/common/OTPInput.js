
import React, { useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
const OTPInput = ({ numberOfInputs = 4, onChangeOTP }) => {
  const inputs = new Array(numberOfInputs).fill(0);
  const otpInputs = inputs.map((val, index) => useRef(null));

  const handleChange = (text, index) => {
    if (text.length === 1 && index < numberOfInputs - 1) {
      otpInputs[index + 1].current.focus();
    }

    const otp = otpInputs.map(ref => ref.current.value).join('');
    onChangeOTP(otp);
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      otpInputs[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {inputs.map((val, index) => (
        <View key={index} style={styles.inputWrapper}>
          <TextInput
            ref={otpInputs[index]}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleBackspace(e, index)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputWrapper: {
    marginHorizontal: 5, 
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor:'#FFFFFF'
  },
});

export default OTPInput;
