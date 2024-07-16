import createDataContext from './createDataContext';
import apiManager from '../api/apiManager';
import {requests} from '../api';
import * as RootNavigation from '../route/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const INITIAL_FORM = {
  name: '',
  email: '',
  phoneNo: '',
};
const ERROR = 'error';
const LOADING = 'loading';
const SUCCESS = 'success';
const Registration = 'Registration';
const SIGNOUT = 'signout';
const OTP_SUCCESS = 'otp_success';
const VERIFY_OTP_SUCCESS = 'verify_otp_success';
const SIGNIN_SUCCESS = 'signin_success';
const PROFILEDATA = 'PROFILEDATA';
const PROFILE_UPDATE = 'PROFILE_UPDATE';
const authReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, auth: {...state.auth, loading: action.payload}};
    case ERROR:
      return {
        ...state,
        loginSuccess: false,
        otpSuccess: false,
        passwordSuccess: false,
        auth: {...state.auth, errorMessage: action.payload, loading: false},
      };
    case SUCCESS:
      return {
        ...state,
        loggedIn: true,
        auth: {
          ...state.auth,
          user: action.payload,
          loading: false,
          loggedIn: true,
          errorMessage: '',
        },
      };

    case OTP_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        auth: {
          ...state.auth,
          user: action.payload,
          loading: false,
          loggedIn: false,
          errorMessage: '',
        },
      };
    case SIGNOUT:
      return {
        ...state,
        loggedIn: false,
        auth: {
          user: {ID: 0, MobileNo: '', Name: ''},
          loggedIn: false,
          errorMessage: null,
          loading: false,
        },
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpSuccess: action.payload,
        error: '',
        loading: false,
      };
    case PROFILEDATA:
      return {
        ...state,
        GetProfile: {
          ...state.GetProfile,
          FetchProfile: action.payload,
        },
      };
    case PROFILE_UPDATE:
      return {
        ...state,
        form: {...state.form, [action.payload.prop]: action.payload.value},
      };
    default:
      return state;
  }
};
const ProfileUpdate =
  dispatch =>
  async ({prop, value}) => {
    dispatch({
      type: PROFILE_UPDATE,
      payload: {prop, value},
    });
  };
const saveUserData = async (dispatch, data) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(data));
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
const verifyOTP = dispatch => async (otp, enterOTP, MobileNo, userDetail) => {
  dispatch({type: VERIFY_OTP_SUCCESS, payload: true});
  if (otp === enterOTP) {
    dispatch({type: LOADING, payload: false});
    console.log(userDetail, 'qqqqqqqqqqqqqqqqqqqqqqqq');
    if (userDetail) {
      if (userDetail && 'name' in userDetail && userDetail.name?.length > 0) {
        dispatch({type: SUCCESS, payload: userDetail});
        saveUserData(dispatch, userDetail);
        RootNavigation.navigate('Home');
      } else {
        RootNavigation.navigate('Registration', {mobileNo: MobileNo});
      }
    }
  } else {
    alert('Invalid OTP');
    dispatch({type: ERROR, payload: 'INVALID OTP.'});
  }
};
const getUserData = (dispatch, resp) => async () => {
  const user = await AsyncStorage.getItem('user');
  console.log(user, 'getuser');
  if (user) {
    dispatch({type: SUCCESS, payload: JSON.parse(user)});
  }
};

// const login = dispatch => async mobileNo => {
//   console.log({
//     mobileNo,
//   });
//   dispatch({type: LOADING, payload: true});
//   await apiManager
//     .post(requests.GET_LOGINDATAWITHMOBILE + `?mobileNo=${mobileNo}`)
//     .then(res => {
//       console.log(res.data, 'login');
//       if (res.data.data.mobileNo == '' || res.data == null) {
//         alert('Invalid Mobile Number.');
//         dispatch({type: ERROR, payload: 'Invalid Mobile Number .'});
//       }
//       dispatch({type: OTP_SUCCESS, payload: res.data.data});
//       alert(res.data?.data.otp);
//     })
//     .catch(e => {
//       console.error(e);
//       console.log(e.message);
//       console.log(e);
//       dispatch({type: LOADING, payload: true});

//       dispatch({
//         type: ERROR,
//         payload: 'Something went wrong.Please try again later.',
//       });
//     });
// };
const login = dispatch => async ({UserName, Password}) => {
  console.log({
    UserName, Password
  })
  dispatch({ type: LOADING, payload: true })
  await apiManager
    .post(requests.GET_LOGINDATA, {
      email: UserName,
      password: Password,
    })
    .then((res) => {
      console.log(res.data.data)
      if (res.data.data == null || res.data.data == '' || res.data.data == 'Invalid') {
        alert('Invalid Username or Password.')
        dispatch({ type: ERROR, payload: 'Invalid Username or Password.' })
      }
        else{
          dispatch({ type: LOADING, payload: false });
          dispatch({ type: SUCCESS, payload: res.data.data });
          alert(res.data.message);
          saveUserData(dispatch, res.data.data);
        }
      
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: ERROR,
        payload: 'Something went wrong.Please try again later.',
      });
    });
};
const newRegistration =
  dispatch =>
  async ({name, Email, mobile, Password, pincode, State, colony, flatNo}) => {
    console.log({
      name,
      Email,
      Password,
      mobile,
      pincode,
      State,
      colony,
      flatNo,
    });
    dispatch({type: LOADING, payload: true});
    await apiManager
      .post(requests.GET_REGISTER, {
        name: name,
        email: Email,
        Password: Password,
        mobileNo: mobile,
        pinCode: pincode,
        state: State,
        society: colony,
        houseNo: flatNo,
      })
      .then(res => {
        console.log('regi', res.data.data);
        dispatch({type: LOADING, payload: false});
        if (res.data.message == 'User registered successfully') {
          dispatch({type: SUCCESS, payload: res.data.data});
          dispatch({type: LOADING, payload: true});
          alert(res.data.message);
          RootNavigation.navigate('Home');
          saveUserData(dispatch, res.data.data);
        } else {
          dispatch({type: LOADING, payload: false});
          alert(res.data.message);
        }
      })
      .catch(e => {
        console.error(e);
        dispatch({
          type: ERROR,
          payload: 'Something went wrong.Please try again later.',
        });
      });
  };
const SaveProfile =
  dispatch =>
  async ({
    id,
    Name,
    Email,
    mobileNo,
    Type,
    FileName,
    ContentType,
    Filebase64,
    Date,
  }) => {
    console.log({
      id,
      Name,
      Email,
      mobileNo,
      Type,
      // FileName,
      // ContentType,
      //Filebase64,
      // Date,
    });
    dispatch({type: LOADING, payload: true});
    await apiManager
      .post(requests.UPDATEPROFILE, {
        id: id,
        name: Name,
        email: Email,
        mobileNo: mobileNo,
        type: Type,
        fileName: FileName,
        contentType: ContentType,
        fileBase64: Filebase64,
        date: Date,
      })
      .then(res => {
        console.log(res.data, 'update profile');
        dispatch({type: LOADING, payload: true});
        if (res.data.IsSuccess == true) {
          dispatch({type: LOADING, payload: false});
          dispatch({type: SUCCESS, payload: JSON.parse(res.data.data)});
          saveUserData(dispatch, res.data.data);

          // RootNavigation.navigate('Home');
        } else {
          dispatch({type: LOADING, payload: false});
          saveUserData(dispatch, res.data.data);
          alert(res.data.message);
        }
      })
      .catch(e => {
        console.error(e);
        dispatch({type: LOADING, payload: false});
        dispatch({
          type: ERROR,
          payload: 'Something went wrong.Please try again later.',
        });
      });
  };
const FetchProfileData = dispatch => async userid => {
  console.log('iiddd', userid);
  dispatch({type: LOADING, payload: true});
  try {
    const res = await apiManager.get(`User/userdetail/${userid}`);
    console.log(res.data, 'getProfile1 ');
    if (res.data.data) {
      dispatch({type: PROFILEDATA, payload: res.data.data});
      console.log(res.data, 'ProfileData2 ');
      saveUserData(dispatch, res.data.data);
    } else {
      dispatch({type: PROFILEDATA, payload: res.data.data});
      saveUserData(dispatch, res.data.data);
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: ERROR,
      payload: 'Something went wrong.Please try again later.',
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('user');

  RootNavigation.navigate('Login');
  dispatch({type: SIGNOUT});
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    login,
    signout,
    ProfileUpdate,
    newRegistration,
    SaveProfile,
    getUserData,
    verifyOTP,
    FetchProfileData,
  },
  {
    mobileno: '',
    otpSuccess: null,
    loginSuccess: false,
    passwordSuccess: false,
    loggedIn: false,
    auth: {
      user: null,
      userType: '',
      loggedIn: false,
      errorMessage: null,
      loading: false,
    },
    form: INITIAL_FORM,
    GetProfile: {
      FetchProfile: [],
    },
    appversion: '0',
  },
);
