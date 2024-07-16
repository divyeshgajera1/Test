import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
const INITIAL_FORM = {};
const ERROR = 'error';
const LOADING = 'loading';
const FETCH_MAKE='FETCH_MAKE'
const FETCH_MODEL='FETCH_MODEL'
const CommonReducer = (state, action) => {
    switch (action.type) {
      case LOADING:
        return {...state, loading: action.payload, error: ''};
      case ERROR:
        return {...state, error: action.payload, loading: false};
        case FETCH_MAKE: {
          return {
            ...state,
            FetchDetail: {
              ...state.FetchDetail,
              MakeList: action.payload,
            },
          };
        }
        case FETCH_MODEL: {
            return {
              ...state,
              FetchDetail: {
                ...state.FetchDetail,
                ModelList: action.payload,
              },
            };
          }
      default:
        return state;
    }
  };
  const FetchMake= dispatch => async () => {
    dispatch({type: LOADING, payload: true});
    try {
      const res = await apiManager.get(`/Common/getmake`);
      if (res.data.data) {
        dispatch({type: FETCH_MAKE, payload: res.data.data});
        dispatch({type: LOADING, payload: false});
      } else {
        dispatch({type: FETCH_MAKE, payload: res.data.data});
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
  const FetchModel= dispatch => async () => {
    dispatch({type: LOADING, payload: true});
    try {
      const res = await apiManager.get(`/Common/getmodel`);
      if (res.data.data) {
        dispatch({type: FETCH_MODEL, payload: res.data.data})
        dispatch({type: LOADING, payload: false});;
      } else {
        dispatch({type: FETCH_MODEL, payload: res.data.data});
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
  export const {Provider, Context} = createDataContext(
    CommonReducer,
    {
        FetchMake,
        FetchModel
    },
    {
      error: '',
      loading: false,
      success: '',
      form: INITIAL_FORM,
      FetchDetail: {
        MakeList:[],
        ModelList:[]
      },
    },
  
  );
  