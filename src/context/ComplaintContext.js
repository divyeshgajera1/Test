import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
import * as RootNavigation from '../route/RootNavigation';
const INITIAL_FORM = {
  complaintText: '',
};
const ERROR = 'error';
const LOADING = 'loading';
const COMPLAINT_UPDATE = '  COMPLAINT_UPDATE';
const SAVE_VEHICLE_DETAIL_SUCCESS = 'SAVE_VEHICLE_DETAIL_SUCCESS';
const ADD_COMPLAINT_DETAIL_SUCCESS = 'ADD-COMPLAINT_DETAIL_SUCCESS';
const ComplaintReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload, error: ''};
    case ERROR:
      return {...state, error: action.payload, loading: false};
    case COMPLAINT_UPDATE:
      return {
        ...state,
        form: {...state.form, [action.payload.prop]: action.payload.value},
      };
    case ADD_COMPLAINT_DETAIL_SUCCESS:
      return {
        ...state,
        form: INITIAL_FORM,
        loading: false,
        updateVehicle: action.payload,
      };

    default:
      return state;
  }
};
const CompaintUpdate =
  dispatch =>
  async ({prop, value}) => {
    dispatch({
      type: COMPLAINT_UPDATE,
      payload: {prop, value},
    });
  };
const AddComplaint =
  dispatch =>
  async ({id, complaintText, Type, FileName, ContentType, Filebase64}) => {
    console.log(
      {
        id, complaintText, Type, FileName, ContentType, Filebase64
      },
    );
    dispatch({type: LOADING, payload: false});
    await apiManager
      .post(requests.ADD_COMPLAINT, {
        fkUserID:id,
        comments:complaintText,
        type: Type,
        fileName: FileName,
        contentType: ContentType,
        filebase64: Filebase64,
      })
      .then(res => {
        console.log('data', res);
        dispatch({type: LOADING, payload: true});
        if (res.data.message) {
          alert(res.data.message);
          dispatch({type: LOADING, payload: true});
          dispatch({type: ADD_COMPLAINT_DETAIL_SUCCESS, payload: true});
        } else {
          dispatch({type: LOADING, payload: true});
          dispatch({type: ADD_COMPLAINT_DETAIL_SUCCESS, payload: false});
        }
        dispatch({type: LOADING, payload: false});
      })

      .catch(e => console.log(e.message));
  };
export const {Provider, Context} = createDataContext(
  ComplaintReducer,
  {
    AddComplaint,
    CompaintUpdate,
  },
  {
    error: '',
    success: '',
    savedVehicle: false,
    updateVehicle: false,
    loading: false,
    form: INITIAL_FORM,
  },
);
