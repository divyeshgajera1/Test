import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform, View, Image } from 'react-native'
import { Dropdown } from './Dropdown'
import { Overlay, ListItem } from 'react-native-elements'

import { Searchbar } from 'react-native-paper'

const FinancierDropdown = ({
  label,
  input,
  data,
  onSelected,
  inputContainerStyle,
  disabled,
  isVisible
}) => {
  const [visible, setVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [source, setSource] = useState([])

  useEffect(() => {
    setSource(data)
  }, [data])

  useEffect(() => {
    if (isVisible == true) {
      setVisible(true);
    }
  }, [isVisible])
  const onChangeSearch = (query) => {
    setSearchQuery(query)
    const value = query.toLowerCase()
    const filterData = data
      .filter((item) => {
        const desc = item.Description.toLowerCase()
        return desc.includes(value)
      })
      .map((item) => item)

    setSource(filterData)
  }

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const renderItem = ({ item }) => (
    <ListItem
      
      bottomDivider
      onPress={() => {
        onSelected(item.ID, item.Description)
        toggleOverlay()
      }}
    >
      <ListItem.Content style={{ flexDirection: 'row', justifyContent:'flex-start' }}>
        <Image source={require('./../../../assets/DSEApp/phone.png')} style={styles.imageStyle} /><View style={{width:'2%'}}></View>
        <ListItem.Title>{item.Description}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )

  return (
    <SafeAreaView style={styles.flexbox}>
      <Dropdown
        label={label}
        input={input}
        onPress={toggleOverlay}
        disabled={disabled}
        inputContainerStyle={inputContainerStyle}
      />
      <Overlay
        overlayStyle={{
          flex: 1,
          width: '85%',
          margin: 30,
        }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={{ height: '95%' }}>
          <Searchbar
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({ highlighted }) => (
                <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
              ))
            }
            data={source}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedId}
          />
        </View>
      </Overlay>
    </SafeAreaView>
  )
}

export { FinancierDropdown }

const styles = StyleSheet.create({
  flexbox: {
    height: 60,
    padding: 2,
    margin: 2,
  },
  imageStyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
},
})
