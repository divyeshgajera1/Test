import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { CustomText } from './CustomText'
import { Context as AuthContext } from '../../context/AuthContext'
import { Context as CMN } from '../../context/CMNContext'
const CustomHeader = ({ label, onPress, LastSyncDate, Lables }) => {
  const { state } = useContext(AuthContext)
  var version = Constants.manifest.version;
  const {
    SL_Home,
    SL_Hi,
    SL_Ver,
    SL_LastSyncOn,

  } = Lables


  return (
    <View style={styles.flexbox}>
      {/* <View
        style={{
          height: 35,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableHighlight
          style={{ height: 25, width: 40, marginTop: 4 }}
          onPress={onPress}
        >
          <Image
            style={{ height: 25, width: 40, marginTop: 4 }}
            source={require('../../../assets/notification_icon.png')}
          />
        </TouchableHighlight>
        <Image
          style={{ height: 28, width: 70, marginTop: 4 }}
          source={require('../../../assets/logo.png')}
        />
        <Image
          style={{ height: 25, width: 40, marginTop: 4 }}
          source={require('../../../assets/notification_icon.png')}
        />
      </View> */}

      {/* <View style={{ height: 25, backgroundColor: 'red' }}>
        <CustomText
          style={{ textAlign: 'right', color: 'white' }}
          label={'Ver :' + version}
        />
      </View> */}
      <View style={{
        paddingLeft: 4, paddingTop: 4, height: 20, backgroundColor: 'white', justifyContent: 'space-between',
        flexDirection: 'row', paddingRight: 5
      }}>
        <View style={{ flexDirection: 'column', paddingLeft: 8 }}>
          <Text style={{ textAlign: 'left', fontSize: 11, fontFamily: 'TitilliumWeb-Bold', }}>
            {SL_Hi}
          </Text>
          <Text style={{ textAlign: 'left', fontSize: 12, fontFamily: 'TitilliumWeb-Bold', }}>
            {state.auth.user?.Name}
          </Text>
        </View>

        <View style={{ flexDirection: 'column', paddingRight: 8 }}>
          <Text style={{ textAlign: 'right', fontSize: 11, fontFamily: 'TitilliumWeb-Bold', }}>
            {SL_LastSyncOn}
          </Text>
          <Text style={{ textAlign: 'left', fontSize: 12, fontFamily: 'TitilliumWeb-Bold', }}>
            {LastSyncDate != null ? LastSyncDate : ""}
          </Text>
        </View>


      </View>
      <Text></Text>
      {label == '' ? null : (
        <View
          style={{
            height: 45,
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: '#464646',
              fontFamily: 'TitilliumWeb-Bold',
              textAlign: 'center',
            }}
          >
            {label}
          </Text>
        </View>
      )}
    </View>
  )
}

export { CustomHeader }

const styles = StyleSheet.create({
  flexbox: {},
  labelStyles: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#d8d8d8',
  },
  inputStyles: {
    height: 30,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  errorStyles: {
    color: 'red',
    fontSize: 10,
  },
})
