import React, { useEffect } from 'react'
import { View, FlatList, TouchableWithoutFeedback } from 'react-native'
import { LangDD } from '../../common'
import { Overlay, ListItem } from 'react-native-elements'


const LanguageDD = ({ input, onSelected, data }) => {
  const [visible, setVisible] = React.useState(false)
  const [source, setSource] = React.useState([])

  useEffect(() => {
    setSource(data)
  }, [data])

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const LangItem = ({ item }) => {
    return (
      <>
        <ListItem
          title={item.MAL_Language}
          bottomDivider
          onPress={() => {
            onSelected({ SltLanguage: item.MAL_Language })
            toggleOverlay()
          }}
        />
      </>
    )
  }

  return (
    <View style={{ marginBottom: 8, height: 55, marginLeft: 8, marginRight: 9 }}>
      <LangDD
        input={input}
        containerStyle={{ elevation: 1, height: 60,width:'100' }}
        onPress={toggleOverlay}
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
        <View style={{ height: '95%' }}>
          <TouchableWithoutFeedback onPress={toggleOverlay}>
            <Entypo
              style={{ alignSelf: 'flex-end', margin: 4 }}
              name='circle-with-cross'
              size={24}
              color='#a9a9a9'
            />
          </TouchableWithoutFeedback>

          <FlatList
            data={source}
            renderItem={({ item }) => <LangItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Overlay>
    </View>
  )
}

export default LanguageDD
