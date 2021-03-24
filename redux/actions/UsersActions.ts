import Axios from 'axios'
import moment from 'moment'
import { customParamsSerializer, getAuthorizationHeaders, RESET_PASSWORD_API, USERS_API } from '../../api/constants'
import { setLoadingAction } from './GlobalActions'
import { createAlert } from './PendingConfirmationActions'

export const USERS_LOAD_SUCCESS_TYPE = 'USERS_LOAD_SUCCESS'
export const usersLoadSuccess = (data) => ({
    type: USERS_LOAD_SUCCESS_TYPE,
    data
})

export const loadUsers = () => async (dispatch, getState) => {
    try {
        const response = await Axios.request({
            url: `${USERS_API}`,
            params: {
                limit: 1000,
                offset: 0
            },
            paramsSerializer: customParamsSerializer,
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(usersLoadSuccess({
            users: response.data.data,
            organizations: response.data.metaData.organizations
        }))
    } catch (ex) {
      dispatch(createAlert('Unable to load users'))
    }
}

export const USERS_PAGE_LOAD_SUCCESS_TYPE = 'USERS_PAGE_LOAD_SUCCESS'
export const usersPageLoadSuccess = (data) => ({
    type: USERS_PAGE_LOAD_SUCCESS_TYPE,
    data
})

export const loadUsersPage = ({ pageSize, pageIndex, filters, sortBy, globalFilter }) => async (dispatch, getState) => {
    try {
        const params ={}
        for(const filter of filters) {
            if(filter.value) {
                params[filter.id] = filter.value
            }
        }
        params['search'] = globalFilter
        if(sortBy && sortBy.length) {
          params['sort'] = sortBy[0].id
          params['order'] = sortBy[0].desc ? 0 : 1
        }
        const response = await Axios.request({
            url: `${USERS_API}`,
            params: {
                limit: pageSize,
                offset: pageSize * pageIndex,
                ...params
            },
            paramsSerializer: customParamsSerializer,
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(usersPageLoadSuccess({
            users: response.data.data,
            organizations: response.data.metaData.organizations,
            totalCount: response.data.metaData.count,
            tableState: {
                pageSize,
                pageIndex,
                filters,
                sortBy,
                globalFilter,
                pageCount: Math.ceil(response.data.metaData.count / +pageSize)
            }
        }))
    } catch (ex) {
      dispatch(createAlert('Unable to load users'))
    }
}

export const downloadUsers = () => async (dispatch, getState) => {
  dispatch(setLoadingAction(true))
  try {
    const { filters, sortBy, globalFilter } = getState().users.tableState
    const params ={}
    for(const filter of filters) {
        if(filter.value) {
            params[filter.id] = filter.value
        }
    }
    params['search'] = globalFilter
    if(sortBy && sortBy.length) {
      params['sort'] = sortBy[0].id
      params['order'] = sortBy[0].desc ? 0 : 1
    }
    const response = await Axios.request({
      url: `${USERS_API}`,
      params: {
        download: true,
        ...params
      },
      paramsSerializer: customParamsSerializer,
      headers: getAuthorizationHeaders(getState())
    })
    const blob = new window.Blob([response.data], {
      type: response.headers['content-type']
    })
    const windowUrl = window.URL || window.webkitURL
    const downloadUrl = windowUrl.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = downloadUrl
    anchor.download = `users-${moment().format(
      'YYYY_MM_DD_hh_mm_ss'
    )}.csv`
    document.body.appendChild(anchor)
    anchor.click()
    windowUrl.revokeObjectURL(downloadUrl)
  } catch (ex) {
    console.error(ex)
  } finally {
    dispatch(setLoadingAction(false))
  }
}

export const refreshUsersPage = () => (dispatch, getState) => {
    dispatch(loadUsersPage({
        ...getState().users.tableState
    }))
}

export enum USER_ADD_STATUS {
    INTIAL,
    REQUEST,
    SUCCESS,
    FAILED
}
export const USER_ADD_STATUS_TYPE = 'USER_ADD_STATUS'
export const userAddStatus = (data) => ({
    type: USER_ADD_STATUS_TYPE,
    data
})

export const addUser = ({
    name,
    email,
    userType,
    organizationId,
    location
}) => async (dispatch, getState) => {
    dispatch(userAddStatus(USER_ADD_STATUS.REQUEST))
    try {
        await Axios.request({
            url: `${USERS_API}`,
            method: 'POST',
            data: {
                name,
                email,
                userType,
                organizationId,
                location,
                sendInvitation: true,
            },
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(refreshUsersPage())
        dispatch(userAddStatus(USER_ADD_STATUS.SUCCESS))
    } catch (ex) {
        dispatch(userAddStatus(USER_ADD_STATUS.FAILED))
        dispatch(createAlert('Unable to add users'))
    }
}

export const updateUser = ({
    id,
    name,
    email,
    userType,
    location,
    organizationId,
    status
}) => async (dispatch, getState) => {
    try {
        dispatch(userAddStatus(USER_ADD_STATUS.REQUEST))
        await Axios.request({
            url: `${USERS_API}/${id}`,
            method: 'PUT',
            data: {
                name,
                email,
                userType,
                location,
                organizationId,
                status
            },
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(refreshUsersPage())
        dispatch(userAddStatus(USER_ADD_STATUS.SUCCESS))
    } catch (ex) {
        console.log(ex)
        dispatch(createAlert('Unable to update the user'))
    }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        await Axios.request({
            url: `${USERS_API}/${userId}`,
            method: 'DELETE',
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(refreshUsersPage())
    } catch (ex) {
      dispatch(createAlert('Unable to delete the user'))
    }
}

export const resetUserPassword = (userId: number) => async (dispatch, getState) => {
  try {
    await Axios.request({
      url: `${RESET_PASSWORD_API}/send-email`,
      method: 'POST',
      headers: getAuthorizationHeaders(getState()),
      data: {
        userId
      }
    })
    dispatch(createAlert('User password reset email sent.'))
  } catch (ex) {
    dispatch(createAlert('Unable to reset user password'))
  }
}