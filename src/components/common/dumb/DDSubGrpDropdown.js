import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform, View } from 'react-native'
import { Dropdown } from '../Dropdown'
import { Overlay, ListItem } from 'react-native-elements'

import { Searchbar } from 'react-native-paper'

const DDSubGrpDropdown = ({ label, input, data, onSelected, disabled,inputstyle }) => {
  const [visible, setVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [source, setSource] = useState([])

  useEffect(() => {
    setSource(data)
  }, [data])

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
      title={item.MODEL}
      bottomDivider
      onPress={() => {
        onSelected(item.MODELID, item.MODEL)
        toggleOverlay()
      }}
    />
  )

  return (
    <SafeAreaView style={styles.flexbox}>
      <Dropdown label={label} input={input} onPress={toggleOverlay} disabled={disabled} inputContainerStyle={inputstyle}  />
      <Overlay
        overlayStyle={{
          flex: 1,
          width: '80%',
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

export default DDSubGrpDropdown

const styles = StyleSheet.create({
  flexbox: {
    height: 50,
    padding: 2,
    margin: 2,
  },
})
