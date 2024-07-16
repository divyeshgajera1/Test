import createDataContext from './createDataContext'
import apiManager from '../api/apiManager'
import { requests, category, categoryId } from '../api'
import labels from '../config/labels'
import {AsyncStorage} from 'react-native';


const ERROR = 'error'
const LOADING = 'loading'
const LANG_SUCCESS = 'success'
const LANG_LABEL_SUCCESS = 'lang_label_success'
const LANG_LABEL_SYNC = 'LANG_LABEL_SYNC'
const LANG_CHANGE = 'change_lang'
const LANG_UPDATE_LABEL = 'lang_update_label'
const SET_APP_LANGUAGE = 'app_language'

const langReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload }
    case ERROR:
      return { ...state, error: action.payload, loading: false }
    case SET_APP_LANGUAGE:
        return {
          ...state,
          appLanguage: action.payload.Language,
          appLanguageId: action.payload.LanguageId,
        }
    case  LANG_LABEL_SYNC:
    return {
      ...state,
      loading: false,    
    }
    case LANG_SUCCESS:
      return {
        ...state,
        Languages: action.payload,
        loading: false,
        lang_fetched:true
      }
    case LANG_LABEL_SUCCESS:
      return {
        ...state,
        LanguageLabel: action.payload,
        loading: false,
      }
    case LANG_CHANGE:
      return {
        ...state,
        FilterLangLabel: action.payload,
        loading: false,
      }
    case LANG_UPDATE_LABEL:
      return {
        ...state,
        Labels: { ...state.Labels, [action.payload.prop]: action.payload.value },
        loading: false,
      }
    default:
      return state
  }
}

const FetchLanguages = (dispatch) => async ({ UID }) => {
  dispatch({ type: LOADING, payload: true })
  await apiManager
    .post(requests.GET_APIDATA, {
      cat: category.DATA,
      catID: categoryId.LANG_MST,
      UID: UID,
    })
    .then((res) => {
      setLanguage(res.data[0].MAL_Language,res.data[0].MAL_Language)
      dispatch({ type: LANG_SUCCESS, payload: res.data })
    })
    .catch((e) => {
      console.error(e)
    })
}
const SyncLanguagesLabel = (dispatch) => async ({ UID }) => {
  dispatch({ type: LOADING, payload: true })
  
  await apiManager
    .post(requests.GET_APIDATA, {
      cat: category.DATA,
      catID: categoryId.LANG,
      UID,
    })
    .then((res) => {
      console.log(res.data.filter(function(el){return el.MAL_LableID=="CB_Hdr"}))
      SaveLanguagesLabel(dispatch,res.data)
      dispatch({ type: LANG_LABEL_SYNC, payload: true })
    })
    .catch((e) => {
      console.error(e)
    })
}
const SaveLanguagesLabel = async (dispatch, data) => {
  await AsyncStorage.setItem('LanguagesLabel', JSON.stringify(data))
    .then(() => {      
      
      console.log('Language data saved successfully')      
    })
    .catch(() => {
      console.log('There was an error saving the data')
    })
}
const FetchLanguagesLabel = (dispatch) => async ({ UID }) => {
  dispatch({ type: LOADING, payload: true })
  const LanguagesLabel = await AsyncStorage.getItem('LanguagesLabel')
  if(LanguagesLabel)
  {    
    dispatch({ type: LANG_LABEL_SUCCESS, payload: JSON.parse(LanguagesLabel) })
  }  
}

const ChangeLanguage = (dispatch) => async ({ LanguageLabel, SltLanguage }) => {  
    const FilterData = LanguageLabel.filter((item) => item.MAL_Language == SltLanguage).map(
      (item) => item
    )
    dispatch({ type: LANG_CHANGE, payload: FilterData })
  
  
}


const UpdateLabels = (dispatch) => async ({ FilterLangLabel, LABEL, TAG }) => {
  
  FilterLangLabel.filter((item) => item.MAL_LableID == TAG).map((item) => {    
    
    dispatch({
      type: LANG_UPDATE_LABEL,
      payload: { prop: LABEL, value: item.MAL_LabelText },
    })
  })
}
const setLanguage = (dispatch) => async (Language, LanguageId) => {
  await AsyncStorage.setItem('APP_LANG', `${Language}`)
  await AsyncStorage.setItem('APP_LANGID', `${LanguageId}`)
  dispatch({ type: SET_APP_LANGUAGE, payload: { Language, LanguageId } })
}
const getAppLanguage = (dispatch) => async () => {
  const Language = await AsyncStorage.getItem('APP_LANG')
  const LanguageId = await AsyncStorage.getItem('APP_LANGID')

  dispatch({ type: SET_APP_LANGUAGE, payload: { Language, LanguageId } })
}

export const { Provider, Context } = createDataContext(
  langReducer,
  {
    FetchLanguages,
    FetchLanguagesLabel,
    ChangeLanguage,
    UpdateLabels,
    setLanguage,
    getAppLanguage,
    SyncLanguagesLabel
  },
  {
    errorMessage: null,
    loading: false,
    Languages: [],
    LanguageLabel: [],
    FilterLangLabel: [],
    TEST: null,
    Labels: labels,
    appLanguage: 'English',
    appLanguageId: '1',
    lang_fetched:false
  }
)
