import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const StepIndicator = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const onNextStep = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevStep = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <View style={styles.container}>
      <ProgressSteps activeStep={currentPage}>
        <ProgressStep label="Received">
          <View style={styles.step}>
            {/* <Button title="Next" onPress={onNextStep} /> */}
          </View>
        </ProgressStep>
        <ProgressStep label="Packed">
          <View style={styles.step}>
            {/* <Button title="Next" onPress={onNextStep} />
            <Button title="Previous" onPress={onPrevStep} /> */}
          </View>
        </ProgressStep>
        <ProgressStep label="Shipped">
          <View style={styles.step}>
            {/* <Button title="Previous" onPress={onPrevStep} /> */}
          </View>
        </ProgressStep>
        <ProgressStep label="Out For Delivery">
          <View style={styles.step}>
            {/* <Button title="Next" onPress={onNextStep} /> */}
          </View>
        </ProgressStep>
        <ProgressStep label="Delivered">
          <View style={styles.step}>
            {/* <Button title="Next" onPress={onNextStep} /> */}
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },
  step: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StepIndicator;
