import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Overlay } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const WIDTH_D = '100%'
const HEIGHT_D = 500//(height * 0.6)>500?500:500;

const AlertDialog = ({ isVisible, animationType, children, onBackdropPress, style }) => {
  return (
    <Overlay
      overlayStyle={[styles.container, style]}
      animationType={animationType | 'slide'}
      isVisible={isVisible}
      statusBarTranslucent
      presentationStyle='overFullScreen'
      onBackdropPress={onBackdropPress}
    >
      <View style={{flex:1}}>
      {children}
      </View>
    </Overlay>
    
  )
}

export { AlertDialog }

const styles = StyleSheet.create({
  container: {
    width: WIDTH_D,
    height: HEIGHT_D,
    position: 'absolute',
    bottom: 0,
  },
})
