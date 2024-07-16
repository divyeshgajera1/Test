import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
import * as RootNavigation from '../route/RootNavigation';
const INITIAL_FORM = {
  HelpText:''
};
const ERROR = 'error';
const LOADING = 'loading';
const GET_ABOUT='GET_ABOUT'
const HELP_SUPPORT = 'HELP_SUPPORT';
const SAVE_HELP_SUPPORT='SAVE_HELP_SUPPORT'
const AboutReducer = (state, action) => {
    switch (action.type) {
      case LOADING:
        return {...state, loading: action.payload, error: ''};
      case ERROR:
        return {...state, error: action.payload, loading: false};
        case GET_ABOUT: {
          return {
            ...state,
            GetAbout: {
              ...state.GetAbout,
              AboutUsDetail: action.payload,
            },
          };
        }
        case HELP_SUPPORT:
          return {
            ...state,
            form: {...state.form, [action.payload.prop]: action.payload.value},
          };
          case SAVE_HELP_SUPPORT:
            return {
              ...state,
              form: INITIAL_FORM,
              loading: false,
              savedVehicle: action.payload,
            };
      default:
        return state;
    }
  };
  const Help_SuppUdpate =
  dispatch =>
  async ({prop, value}) => {
    dispatch({
      type: HELP_SUPPORT,
      payload: {prop, value},
    });
  };
  const FetchAboutDetail = dispatch => async () => {
    dispatch({type: LOADING, payload: true});
    try {
      const res = await apiManager.get(`Common/getabout`);
      if (res.data.data) {
        dispatch({type: GET_ABOUT, payload: res.data.data});
        dispatch({type: LOADING, payload: false});
      } else {
        dispatch({type: GET_ABOUT, payload: res.data.data});
        dispatch({type: LOADING, payload: false});
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: ERROR,
        payload: 'Something went wrong.Please try again later.',
      });
    }
  };
  const SaveHelp =
  dispatch =>
  async ({
    userid,
    HelpText,
    callback
  }) => {
    userid,
    HelpText,
    callback
    dispatch({type: LOADING, payload: false});
    await apiManager
      .post(requests.SAVE_HELP, {
        fkUserID: userid,
        suggestions: HelpText,
        callback: callback,
      })
      .then(res => {
        console.log('data', res.data.data);
        dispatch({type: LOADING, payload: true});
        if (res.data.isSuccess == true) {
          alert(res.data.message);
          dispatch({type: SAVE_HELP_SUPPORT, payload: true});
          dispatch({type: LOADING, payload: true});
          RootNavigation.navigate('Home')
          root
        } else {
          dispatch({type: SAVE_HELP_SUPPORT, payload: false});
          dispatch({type: LOADING, payload: true});
        }
        dispatch({type: LOADING, payload: false});
      })

      .catch(e => console.log(e.message));
  };
  export const {Provider, Context} = createDataContext(
    AboutReducer,
    {
      FetchAboutDetail,
      Help_SuppUdpate,
      SaveHelp
    },
    {
      error: '',
      loading: false,
      success: '',
      form: INITIAL_FORM,
      GetAbout: {
        AboutUsDetail:[],
      },
    },
  
  );
  