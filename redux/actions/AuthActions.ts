import { setLoadingAction, setErrorAction } from "./GlobalActions";
import { getAuthorizationHeaders, LOCAL_STORAGE_PREFIX, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER, LOGIN_API, LOGOUT_API, MEETINGS_API, REGISTER_API, RESET_PASSWORD_API, USERS_API, USER_VIDEOS_API } from "../../api/constants";
import { doPost } from "../../api/api_template";
import Router from 'next/router'
import { FACE_REG_ROUTE, EXPERINCE_OPTION, LOGIN_ROUTE, BASE_ROUTE } from "../../utils/route_const";
import Axios from "axios";
import { MEETING_TYPE } from "../../utils/app_const";
import { createAlert } from "./PendingConfirmationActions";

export const SAVE_AUTH_DATA_TYPE = "SAVE_AUTH_DATA";
export const saveAuthDataAction = (data) => {
    return {
        type: SAVE_AUTH_DATA_TYPE,
        data
    }
}

export const INITIATE_AUTH_DATA_TYPE = 'INITIATE_AUTH_DATA'
export const initiateAuthData = () => (dispatch) => {
    const intialToken = localStorage.getItem(LOCAL_STORAGE_TOKEN) || undefined
    const user = localStorage.getItem(LOCAL_STORAGE_USER) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER) || '') : undefined
    if(intialToken && user) {
      dispatch(intialAuthData({ token: intialToken, user }))
      dispatch(getUserProfile())
      if([BASE_ROUTE, LOGIN_ROUTE].includes(Router.pathname)) {
          Router.push(EXPERINCE_OPTION)
      }
    } else {
        dispatch(setUnauthorized())
    }
}

export const INITIAL_AUTH_DATA_TYPE = 'INITIAL_AUTH_DATA'
export const intialAuthData = (data) => {
    return {
        type: INITIAL_AUTH_DATA_TYPE,
        data
    }
}

export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const setAuthError = (data) => {
    return {
        type: SET_AUTH_ERROR,
        data
    }
}

export const UNAUTHORIZED_TYPE = 'UNAUTHORIZED'
export const unauthorized = (data) => {
    return {
        type: UNAUTHORIZED_TYPE,
        data
    }
}

export const SET_PICKE_AVAILABLE = "SET_PICKEL_AVAILABLE"
export const setPickelAvailable = (data) => {
    return {
        type: SET_PICKE_AVAILABLE,
        data
    }
}

export const signIn = (email: string, userCode: string) => async dispatch => {
    try {
        dispatch(setLoadingAction(true))
        const response = await Axios.request({
            url: LOGIN_API,
            method: 'POST',
            data: {
                email,
                userCode
            }
        })
        const { token, user } = response.data
        dispatch(saveAuthDataAction({ token, user }))
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-token`, token)
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-user`, JSON.stringify(user))
        if(user.isPickleAvailable || user.isUserImagesAvailable) {
            Router.push(EXPERINCE_OPTION)
        } else {
            Router.push(FACE_REG_ROUTE)
        }
        
    } catch (ex) {
        dispatch(setAuthError('Invalid login attempt. Please provide valid credentials.'))
    } finally {
        dispatch(setLoadingAction(false))
    }
}

export const getUserProfile = () => async (dispatch, getState) => {
    try {
        const response = await Axios.request({
            url: `${USERS_API}/user-profile`,
            headers: getAuthorizationHeaders(getState())
        })
        const { auth: { token } } = getState()

        const { data: user } = response.data
        localStorage.setItem(`${LOCAL_STORAGE_USER}`, JSON.stringify(user))
        dispatch(intialAuthData({ token, user }))
    } catch (ex) {
        if(ex.response && ex.response.status === 401) {
            dispatch(setUnauthorized())
        }
    } finally {
        dispatch(setLoadingAction(false))
    }
}

export const setUnauthorized = () => (dispatch) => {
    localStorage.removeItem(`${LOCAL_STORAGE_TOKEN}`)
    localStorage.removeItem(`${LOCAL_STORAGE_USER}`)
    dispatch(unauthorized({}))
}

export const logout = () => async (dispatch, getState) => {
    try {
        await Axios.request({
            url: LOGOUT_API,
            method: 'POST',
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(setUnauthorized())
    } catch(ex) {
        console.log(ex)
        dispatch(createAlert('Unable to logout'))
    }
    
}


export const verifySignInWithId = (uniqueId) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true))
        return doPost(LOGIN_API, undefined, { uniqueId })
            .then(data => { 
                dispatch(saveAuthDataAction(data)); 
                Router.push(EXPERINCE_OPTION) })
            .catch(err => dispatch(setAuthError("User not exists.")))
            .finally(() => dispatch(setLoadingAction(false)))
    }
}


export const createUserWithId = (uniqueId, name) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true))
        return doPost(REGISTER_API, undefined, { uniqueId, name })
            .then(data => { dispatch(saveAuthDataAction(data)); Router.push(FACE_REG_ROUTE) })
            .catch(err => dispatch(setAuthError("User already exists.")))
            .finally(() => dispatch(setLoadingAction(false)))
    }
}

export const registerUserImages = (images, onSuccess) => async (dispatch, getState) => {
    try {
        dispatch(setLoadingAction(true))
        await Axios.request({
            url: `${USER_VIDEOS_API}/images`,
            method: 'POST',
            data: {
                images
            },
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(getUserProfile())
        onSuccess()
    } catch (ex) {
        dispatch(setErrorAction(ex))
    } finally {
        dispatch(setLoadingAction(false))
    }
}


export const uploadUserVideo = (video) => async (dispatch, getState) => {
    try {
        const data = new FormData()
        data.append('meetingType', MEETING_TYPE.INDIVIDUAL)
        data.append('meetingSource', 'webcam')
        data.append('video', video)
        dispatch(setLoadingAction(true))
        await Axios.request({
            url: MEETINGS_API,
            method: 'POST',
            data,
            headers: getAuthorizationHeaders(getState())
        })
    } catch (ex) {
        dispatch(setErrorAction(ex))
    } finally {
        dispatch(setLoadingAction(false))
    }
}

export const resetPasswordSetPassword = (token, password, repeatPassword) => async (dispatch, getState) => {
  try {
    dispatch(setLoadingAction(true))
    const response = await Axios.request({
      url: `${RESET_PASSWORD_API}/${token}/set-password`,
      method: 'put',
      data: {
        password,
        repeatPassword
      }
    })
    console.log(response)
    dispatch(createAlert('You password set successfully.'))
    Router.replace(LOGIN_ROUTE)
  } catch (ex) {
    dispatch(setErrorAction(ex))
  } finally {
    dispatch(setLoadingAction(false))
  }
}
