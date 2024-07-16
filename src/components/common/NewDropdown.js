import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Platform, View } from 'react-native'
import { Dropdown } from './Dropdown'
import { Overlay, ListItem } from 'react-native-elements'

import { Button, Searchbar } from 'react-native-paper'

const NewDropdown = ({
  label,
  input,
  data,
  onSelected,
  inputContainerStyle,
  disabled,
  isVisible,
  loading,
  children
}) => {
  const [visible, setVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [source, setSource] = useState([])

  useEffect(() => {
    setSource(data)
  }, [data])

  useEffect(() => {
    if (isVisible === true) {
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
      <ListItem.Content>
        <ListItem.Title>{item.Description}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )

  const staticOptions = React.Children.toArray(children).map((child) => ({
    ID: child.props.id,
    Description: child.props.value,
  }));
  return (
    <SafeAreaView style={styles.flexbox}>
      <Dropdown
        label={label}
        input={input}
        onPress={toggleOverlay}
        disabled={disabled}
        inputContainerStyle={inputContainerStyle}
        loading={loading}
      />
      <Overlay
        overlayStyle={{
          flex: 1,
          width: '80%',
          margin: 30,
        }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={{ height: '98%' }}>
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
            data={source?.length > 0 ? source : staticOptions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedId}
          />
          <Button
            onPress={() => {
              console.log('Clear')
              onSelected('0', "---Select---")
              toggleOverlay()
            }}
            value='Clear'
          >
            Clear
          </Button>
        </View>
      </Overlay>
    </SafeAreaView>
  )
}

const NewDropdownOption = () => null; // Placeholder component for static options

NewDropdown.Option = NewDropdownOption;
export { NewDropdown }

const styles = StyleSheet.create({
  flexbox: {
    height: 60,
    padding: 2,
    margin: 2,
  },
})
