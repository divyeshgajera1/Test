import React, { useMemo, useEffect, useState,useContext } from 'react'
import { StyleSheet, TextInput, View, Text, FlatList } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import { Context as LanguageContext } from './../../context/LanguageContext'
import { Context as AuthContext } from './../../context/AuthContext'
import labelId from './../../config/labelsId'
const NewRadioButton = ({ style, label, data, value, onPress }) => {
    const [source, setSource] = useState([])
    const { state: { auth } } = useContext(AuthContext);
    const { ID, UserType } = auth.user
    const {
        state: { Languages, LanguageLabel, appLanguage, FilterLangLabel, Labels, lang_fetched },
        FetchLanguages,
        FetchLanguagesLabel,
        ChangeLanguage,
        UpdateLabels,
        getAppLanguage,
        setLanguage
      } = useContext(LanguageContext)
    
      const {
        CMN_YES,
        CMN_No
      } = Labels

      useEffect(() => {
        FetchLanguages({UID:ID})
        FetchLanguagesLabel({UID:ID})
        getAppLanguage()
      }, [ID])
      
      
      useEffect(() => {
        ChangeLanguage({ LanguageLabel, SltLanguage: appLanguage })
      }, [appLanguage, lang_fetched, LanguageLabel])
      useEffect(() => {
        for (var k in labelId) {
          UpdateLabels({ FilterLangLabel, LABEL: k, TAG: k })
        }
      
      
      }, [lang_fetched, FilterLangLabel, appLanguage])
    
        useEffect(() => {
          FetchLanguages({ UID: ID })
      }, [ID])
    useEffect(() => {
        if (data != undefined) {
            setSource(data)
        }
    }, [data])
    const radioButtons = useMemo(() => ([
        {
            id: 1,
            label: CMN_YES,
            value: '1',
            borderColor: '#700000',
            color: '#700000',
            labelStyle: styles.radioButtonStyle,
        },
        {
            id: 2,
            label: CMN_No,
            value: '2',
            borderColor: '#700000',
            color: '#700000',
            labelStyle: styles.radioButtonStyle
        }
    ]), []);
    return (
        <View styles={styles.container}>
            {label == '' ? null : (
                <>
                    <Text style={styles.label}>{label}</Text>
                </>
            )}{
                source.length > 0 ? (
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={source}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <View style={styles.viewStyle}>
                                <RadioGroup
                                    radioButtons={[{ id: item.ID, label: item.Description, value: item.ID, 'borderColor': '#700000', 'color': '#700000', 'labelStyle': styles.radioButtonStyle }]}
                                    onPress={onPress}
                                    selectedId={value}
                                    layout='row'
                                />
                            </View>
                        )}
                    />
                ) : (
                    <View style={styles.viewStyle}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={onPress}
                            selectedId={value}
                            layout='row'
                        />
                    </View>
                )
            }


        </View>
    )
}

export { NewRadioButton }

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
    radioButtonStyle: {
        fontSize: 13,
        color: '#000000',
        letterSpacing: 0.8,
        fontWeight: 'bold',
        textShadowColor: '#d8d8d8',
        textShadowRadius: 0.1,
        textDecorationColor: 'red',
    },
    viewStyle: {
        paddingLeft: 10
    }
})
