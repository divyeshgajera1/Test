import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
const INITIAL_FORM = {
  FromDate: 'DD/MM/YY',
  ToDate: 'DD/MM/YY',
  monday_YN: 'M',
  tuesday_YN: 'T',
  wednesday_YN: 'W',
  thursday_YN: 'T',
  friday_YN: 'F',
  saturday_YN: 'S',
  sunday_YN: 'S',
};
const ERROR = 'error';
const LOADING = 'loading';
const GET_SUBSCRIPTION = 'GET_SUBSCRIPTION';
const TIME_SLOT = 'TIME_SLOT';
const FETCHCOST = 'FETCHCOST';
const SUBSCRIBPTIONUPDATE = 'SUBSCRIBPTIONUPDATE';
const SAVE_SUBSCRIPTION_DETAIL_SUCCESS = 'SAVE_SUBSCRIPTION_DETAIL_SUCCESS';
const USER_SUBSCRIPTION = 'USER_SUBSCRIPTION';
const RESET_DATA_LIST = 'reset_data_list';
const SubscriberReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload, error: ''};
    case ERROR:
      return {...state, error: action.payload, loading: false};
    case GET_SUBSCRIPTION: {
      return {
        ...state,
        GetSubscriptionType: {
          ...state.GetSubscriptionType,
          GetSubscription: action.payload,
        },
      };
    }
    case RESET_DATA_LIST:
      return {
        ...state,
        form: INITIAL_FORM,
      };
    case TIME_SLOT: {
      return {
        ...state,
        GetSubscriptionType: {
          ...state.GetSubscriptionType,
          TimeSlot: action.payload,
        },
      };
    }

    case FETCHCOST:
      return {
        ...state,
        form: INITIAL_FORM,
        loading: false,
        Fetch_Cost: action.payload,
      };
    case USER_SUBSCRIPTION:
      return {
        ...state,
        GetSubscriptionType: {
          ...state.GetSubscriptionType,
          GetUserSubscrption: action.payload,
        },
      };
    case SUBSCRIBPTIONUPDATE:
      return {
        ...state,
        form: {...state.form, [action.payload.prop]: action.payload.value},
      };
    case SAVE_SUBSCRIPTION_DETAIL_SUCCESS:
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
const resetForm = dispatch => async () => {
  dispatch({type: RESET_DATA_LIST});
};
const SubscriptionUpdate =
  dispatch =>
  async ({prop, value}) => {
    dispatch({
      type: SUBSCRIBPTIONUPDATE,
      payload: {prop, value},
    });
  };
const FetchSubscriptionType = dispatch => async () => {
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(`Common/getsubscriptiontype`);
    if (res.data.data) {
      dispatch({type: GET_SUBSCRIPTION, payload: res.data.data});
      dispatch({type: LOADING, payload: false});
    } else {
      dispatch({type: GET_SUBSCRIPTION, payload: res.data.data});
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
const FetchTimeSlot = dispatch => async () => {
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(`Common/gettimeslot`);
    if (res.data.data) {
      dispatch({type: TIME_SLOT, payload: res.data.data});
      dispatch({type: LOADING, payload: false});
    } else {
      dispatch({type: TIME_SLOT, payload: res.data.data});
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
const CalculateCost = dispatch => async () => {
  dispatch => async () => {
    console.log('hfhdh');
    dispatch({type: LOADING, payload: false});
    await apiManager
      .post(requests.CALCULATE_COST)
      .then(res => {
        console.log('data', res.data);
        dispatch({type: LOADING, payload: true});
        if (res.data.message) {
          alert(res.data.message);
          dispatch({type: FETCHCOST, payload: true});
          // dispatch({type: LOADING, payload: true});
        } else {
          dispatch({type: FETCHCOST, payload: false});
          // dispatch({type: LOADING, payload: true});
        }
        dispatch({type: LOADING, payload: false});
      })

      .catch(e => console.log(e.message));
  };
};
const SaveSubscription = dispatch => async subscriptionData => {
  console.log('hfhdh', subscriptionData);
  dispatch({type: LOADING, payload: true});
  await apiManager
    .post(requests.SAVE_SUBSCRIBPTION, subscriptionData)
    .then(res => {
      console.log('data', res.data);
      if (res.data.message) {
        alert(res.data.message);
        dispatch({type: SAVE_SUBSCRIPTION_DETAIL_SUCCESS, payload: true});
        dispatch({type: LOADING, payload: false});
      } else {
        dispatch({type: SAVE_SUBSCRIPTION_DETAIL_SUCCESS, payload: false});
        dispatch({type: LOADING, payload: false});
      }
      dispatch({type: LOADING, payload: false});
    })

    .catch(e => console.log(e.message));
};
const FetchUserSubscription = dispatch => async userid => {
  console.log('iiddd', userid);
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(
      `Common/usersubscriptions?userId=${userid}`,
    );
    console.log(res.data.data);
    if (res.data.data) {
      dispatch({type: USER_SUBSCRIPTION, payload: res.data.data});
      // console.log(res.data.data,'UserSubs ')
    } else {
      dispatch({type: USER_SUBSCRIPTION, payload: res.data.data});
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
  SubscriberReducer,
  {
    FetchSubscriptionType,
    FetchTimeSlot,
    SaveSubscription,
    SubscriptionUpdate,
    CalculateCost,
    FetchUserSubscription,
    resetForm,
  },
  {
    error: '',
    loading: false,
    success: '',
    form: INITIAL_FORM,
    GetSubscriptionType: {
      GetSubscription: [],
      TimeSlot: [],
      GetUserSubscrption: [],
    },
  },
);
