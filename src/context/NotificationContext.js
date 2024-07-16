import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
import * as RootNavigation from '../route/RootNavigation';
const ERROR = 'error';
const LOADING = 'loading';
const SAVE_NOTIFCATION_SUCCESS = 'SAVE_NOTIFCATION_SUCCESS';
const NotificationReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload, error: ''};
    case ERROR:
      return {...state, error: action.payload, loading: false};
    case SAVE_NOTIFCATION_SUCCESS:
      return {
        ...state,
        GetNotification: {
          ...state.GetNotification,
          G_Notification: action.payload,
        },
      };

    default:
      return state;
  }
};
const FetchNotification = dispatch =>  async fkUserID => {
  console.log(fkUserID, 'EmployeeID');
  
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(
      `Attendance/GetNotifications?FKUserID=${fkUserID}`,
    )

    dispatch({type: LOADING, payload: false});
    if (res.data.data) {
      dispatch({type: SAVE_NOTIFCATION_SUCCESS, payload: res.data.data});
      dispatch({type: LOADING, payload: false});
    } else {
      dispatch({type: SAVE_NOTIFCATION_SUCCESS, payload: res.data.data});
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
  NotificationReducer,
  {
    FetchNotification,
  },
  {
    error: '',
    success: '',
    savedVehicle: false,
    GetNotification:{
      G_Notification: [],
    },
    loading: false,
  },
);
