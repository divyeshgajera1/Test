import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
const INITIAL_FORM = {};
const ERROR = 'error';
const LOADING = 'loading';
const GET_SERVICEDATA = 'GET_SERVICEDATA';
const TASK_COMPLETED = 'TASK_COMPLETED';
const ServiceReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload, error: ''};
    case ERROR:
      return {...state, error: action.payload, loading: false};
    case GET_SERVICEDATA: {
      return {
        ...state,
        getServices: {
          ...state.getServices,
          GetServiceDetails: action.payload,
        },
      };
    }
    case TASK_COMPLETED: {
      return {
        ...state,
        getServices: {
          ...state.getServices,
          TaskCompleted: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
const FetchServiceDetail = dispatch => async () => {
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(`ServiceMaster/getservices`);
    if (res.data.data) {
      dispatch({type: GET_SERVICEDATA, payload: res.data.data});
      dispatch({type: LOADING, payload: false});
    } else {
      dispatch({type: GET_SERVICEDATA, payload: res.data.data});
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
const FetchTaskCompletion = dispatch => async userid => {
  console.log(userid, 'userid');
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(
      `Attendance/TaskCompletionByID?userID=${userid}`,
    );

    dispatch({type: LOADING, payload: false});
    if (res.data.data) {
      dispatch({type: TASK_COMPLETED, payload: res.data.data});
      dispatch({type: LOADING, payload: false});
    } else {
      dispatch({type: TASK_COMPLETED, payload: res.data.data});
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
  ServiceReducer,
  {
    FetchServiceDetail,
    FetchTaskCompletion,
  },
  {
    error: '',
    loading: false,
    success: '',
    form: INITIAL_FORM,
    getServices: {
      GetServiceDetails: [],
      TaskCompleted: [],
    },
  },
);
