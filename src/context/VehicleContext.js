import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
import * as RootNavigation from '../route/RootNavigation';
const INITIAL_FORM = {
  category: 'Select Vehicle Category',
  categoryId: 0,
  model: 'Select Model',
  modelId: 0,
  color: 'Select Color',
  colorId: 0,
  vehicleNo: '',
};
const ERROR = 'error';
const LOADING = 'loading';
const VEHICLE_UPDATE = 'VEHICLE_UPDATE';
const SAVE_VEHICLE_DETAIL_SUCCESS = 'SAVE_VEHICLE_DETAIL_SUCCESS';
const UPDATE_VEHICLE_DETAIL_SUCCESS = 'UPDATE_VEHICLE_DETAIL_SUCCESS';
const GET_VEHICLEDATA = 'GET_VEHICLEDATA';
const RESET_DATA_LIST='RESET_DATA_LIST'
const VehicleReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload, error: ''};
    case ERROR:
      return {...state, error: action.payload, loading: false};
    case VEHICLE_UPDATE:
      return {
        ...state,
        form: {...state.form, [action.payload.prop]: action.payload.value},
      };
    case SAVE_VEHICLE_DETAIL_SUCCESS:
      return {
        ...state,
        form: INITIAL_FORM,
        loading: false,
        savedVehicle: action.payload,
      };
    case UPDATE_VEHICLE_DETAIL_SUCCESS:
      return {
        ...state,
        form: INITIAL_FORM,
        loading: false,
        updateVehicle: action.payload,
      };
    case GET_VEHICLEDATA: {
      return {
        ...state,
        getVehicle: {
          ...state.getVehicle,
          VehicleGetData: action.payload,
        },
      };
    }
    case RESET_DATA_LIST:
      return {
        ...state,
        form: INITIAL_FORM,
      };
    default:
      return state;
  }
};
const resetForm = dispatch => async () => {
  dispatch({type: RESET_DATA_LIST});
};
const VehicleUpate =
  dispatch =>
  async ({prop, value}) => {
    dispatch({
      type: VEHICLE_UPDATE,
      payload: {prop, value},
    });
  };
const SaveVehicleDetails =
  dispatch =>
  async ({
    id,
    Type,
    FileName,
    ContentType,
    Filebase64,
    category,
    model,
    color,
    vehicleNo,
  }) => {
    id,
      Type,
      FileName,
      ContentType,
      Filebase64,
      category,
      model,
      color,
      vehicleNo;
    dispatch({type: LOADING, payload: true});
    await apiManager
      .post(requests.ADD_VEHICLEDETAIL, {
        fkUserID: id,
        type: Type,
        fileName: FileName,
        contentType: ContentType,
        filebase64: Filebase64,
        make: category,
        model: model,
        color: color,
        vehicleNo: vehicleNo,
      })
      .then(res => {
        console.log('data', res.data);
        // dispatch({type: LOADING, payload: true});
        if (res.data.message) {
          alert(res.data.message);
          dispatch({type: SAVE_VEHICLE_DETAIL_SUCCESS, payload: true});
          console.log(res.data.data,'save vehicle Data ')
          dispatch({type: LOADING, payload: false});
        } else {
          dispatch({type: SAVE_VEHICLE_DETAIL_SUCCESS, payload: false});
          dispatch({type: LOADING, payload: false});
        }
        dispatch({type: LOADING, payload: false});
      })

      .catch(e => console.log(e.message));
  };
const UpdateVehicleDetail =
  dispatch =>
  async ({
    id,
    fkUserID,
    Type,
    FileName,
    ContentType,
    Filebase64,
    make,
    model,
    color,
    vehicleNo,
  }) => {
      console.log({
        id,
    fkUserID,
    Type,
     FileName,
    ContentType,
    Filebase64,
    make,
    model,
    color,
    vehicleNo,
    },'Vehicle Update');
    dispatch({type: LOADING, payload: false});
    await apiManager
      .post(requests.UPDATE_VEHICLE, {
        id:id,
        fkUserID: fkUserID,
        type: Type,
        fileName: FileName,
        contentType: ContentType,
        filebase64: Filebase64,
        make: make,
        model: model,
        color: color,
        vehicleNo: vehicleNo,
      })
      .then(res => {
        console.log('data', res);
        dispatch({type: LOADING, payload: true});
        if (res.data.message) {
          alert(res.data.message);
          dispatch({type: UPDATE_VEHICLE_DETAIL_SUCCESS, payload: true});
           RootNavigation.navigate('Home')
        } else {
          dispatch({type: UPDATE_VEHICLE_DETAIL_SUCCESS, payload: false});
        }
        dispatch({type: LOADING, payload: false});
      })

      .catch(e => console.log(e.message));
  };
const FetchVehicleData = dispatch => async userid => {;
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(`Vehicle/vehicledetail/${userid}`);
    if (res.data.data) {
      dispatch({type: GET_VEHICLEDATA, payload: res.data.data});
      dispatch({type: LOADING, payload: false});
    } else {
      dispatch({type: GET_VEHICLEDATA, payload:res.data.data});
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
  VehicleReducer,
  {
    VehicleUpate,
    SaveVehicleDetails,
    FetchVehicleData,
    resetForm,
    UpdateVehicleDetail,
  },
  {
    error: '',
    success: '',
    savedVehicle: false,
    updateVehicle: false,
    loading: false,
    form: INITIAL_FORM,
    getVehicle: {
      VehicleGetData: {},
    },
  },
);
