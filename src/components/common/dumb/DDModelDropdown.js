import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform, View } from 'react-native'
import { Dropdown } from '../Dropdown'
import { Overlay, ListItem } from 'react-native-elements'

import { Searchbar } from 'react-native-paper'

const DDModelDropdown = ({ label, input, data, onSelected, disabled ,inputstyle,isVisible }) => {
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
        const desc = item.VARIANTNAME.toLowerCase()
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
      title={item.VARIANTNAME}
      bottomDivider
      onPress={() => {
        onSelected(
          item.MODELID,
          item.VARIANTNAME,
          item.VARIANTCODE,
          item.VARIANTID,
          item.DNP,
          item.TAXES,
          item.Insurance,
          item.EddalCont
        )
        toggleOverlay()
      }}
    />
  )

  return (
    <SafeAreaView style={styles.flexbox}>
      <Dropdown label={label} input={input} onPress={toggleOverlay} disabled={disabled} inputContainerStyle={inputstyle} />
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

export default DDModelDropdown

const styles = StyleSheet.create({
  flexbox: {
    height: 50,
    padding: 2,
    margin: 2,
  },
})
