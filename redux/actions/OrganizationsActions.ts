import Axios from 'axios'
import moment from 'moment'
import { customParamsSerializer, getAuthorizationHeaders, ORGANIZATIONS_API } from '../../api/constants'
import { setLoadingAction } from './GlobalActions'
import { createAlert } from './PendingConfirmationActions'
import { refreshUsersPage } from './UsersActions'

export const ORGANIZATIONS_PAGE_LOAD_SUCCESS_TYPE = 'ORGANIZATIONS_PAGE_LOAD_SUCCESS'
export const organizationsPageLoadSuccess = (data) => ({
    type: ORGANIZATIONS_PAGE_LOAD_SUCCESS_TYPE,
    data
})

export const loadOrganizationsPage = ({ pageSize, pageIndex, filters, sortBy, globalFilter }) => async (dispatch, getState) => {
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
            url: `${ORGANIZATIONS_API}`,
            params: {
                limit: pageSize,
                offset: pageSize * pageIndex,
                ...params
            },
            paramsSerializer: customParamsSerializer,
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(organizationsPageLoadSuccess({
            organizations: response.data.data,
            totalCount: response.data.metaData.count,
            tableState: {
                pageSize,
                pageIndex,
                filters,
                sortBy,
                globalFilter,
                pageCount: Math.ceil(response.data.metaData.count / +pageSize)
            },
        }))
    } catch (ex) {
      dispatch(createAlert('Unable to load organizations'))
    }
}

export const downloadOrganizations = () => async (dispatch, getState) => {
  dispatch(setLoadingAction(true))
  try {
    const { filters, sortBy, globalFilter } = getState().organizations.tableState
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
      url: `${ORGANIZATIONS_API}`,
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
    anchor.download = `organisations-${moment().format(
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

export const refreshOrganizationsPage = () => (dispatch, getState) => {
    dispatch(loadOrganizationsPage({
        ...getState().organizations.tableState
    }))
}

export enum ORGANIZATION_ADD_STATUS {
    INTIAL,
    REQUEST,
    SUCCESS,
    FAILED
}
export const ORGANIZATION_ADD_STATUS_TYPE = 'ORGANIZATION_ADD_STATUS'
export const setOrganizationAddStatus = (data) => ({
    type: ORGANIZATION_ADD_STATUS_TYPE,
    data
})

export const addOrganization = ({
    name,
    email,
    expiryDate,
    demoIds,
    clearIssues,
}) => async (dispatch, getState) => {
    dispatch(setOrganizationAddStatus(ORGANIZATION_ADD_STATUS.REQUEST))
    try {
        await Axios.request({
            url: `${ORGANIZATIONS_API}`,
            method: 'POST',
            data: {
                name,
                email,
                expiryDate,
                demoIds,
                clearIssues,
            },
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(refreshOrganizationsPage())
        dispatch(setOrganizationAddStatus(ORGANIZATION_ADD_STATUS.SUCCESS))
    } catch (ex) {
        dispatch(setOrganizationAddStatus(ORGANIZATION_ADD_STATUS.FAILED))
        dispatch(createAlert('Unable to add organization'))
    }
}

export const updateOrganization = ({
    id,
    name,
    email,
    expiryDate,
    status,
    demoIds,
    clearIssues,
}) => async (dispatch, getState) => {
    try {
        dispatch(setOrganizationAddStatus(ORGANIZATION_ADD_STATUS.REQUEST))
        await Axios.request({
            url: `${ORGANIZATIONS_API}/${id}`,
            method: 'PUT',
            data: {
                name,
                email,
                expiryDate,
                status,
                demoIds,
                clearIssues,
            },
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(refreshOrganizationsPage())
        dispatch(setOrganizationAddStatus(ORGANIZATION_ADD_STATUS.SUCCESS))
        dispatch(refreshUsersPage())
    } catch (ex) {
        console.log(ex)
        dispatch(createAlert('Unable to update organization'))
    }
}

export const deleteOrganization = (organizationId) => async (dispatch, getState) => {
    try {
        await Axios.request({
            url: `${ORGANIZATIONS_API}/${organizationId}`,
            method: 'DELETE',
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(refreshOrganizationsPage())
    } catch (ex) {
      dispatch(createAlert('Unable to delete the organization'))
    }
}