import Axios from 'axios'
import moment from 'moment'
import { customParamsSerializer, getAuthorizationHeaders, USER_LOGS_API } from '../../api/constants'
import { createAlert } from './PendingConfirmationActions'

export const USER_LOGS_LOAD_SUCCESS_TYPE = 'USER_LOGS_LOAD_SUCCESS'
export const userLogsLoadSuccess = (data) => ({
    type: USER_LOGS_LOAD_SUCCESS_TYPE,
    data
})
export const loadUserLogs = ({ pageSize, pageIndex, filters, sortBy, globalFilter }) => async (dispatch, getState) => {
    try {
        const params = {
            limit: pageSize,
            offset: pageSize * pageIndex
        }
        console.log(sortBy)
        for(const filter of filters) {
            if(filter.id === 'startDate' && filter.value) {
                params['startDate'] = moment(filter.value).startOf('day').toISOString()
            } else if(filter.id === 'endDate' && filter.value) {
                params['endDate'] = moment(filter.value).endOf('day').toISOString()
            } else {
                params[filter.id] = filter.value
            }
            console.log(params)
        }
        if(sortBy && sortBy.length) {
          params['sort'] = sortBy[0].id
          params['order'] = sortBy[0].desc ? 0 : 1
        }
        if(globalFilter) {
          params['search'] = globalFilter
        }
        const response = await Axios.request({
          url: `${USER_LOGS_API}`,
          method: 'GET',
          params,
          paramsSerializer: customParamsSerializer,
          headers: getAuthorizationHeaders(getState())
        })
        dispatch(userLogsLoadSuccess({
          userLogs: response.data.data,
          totalCount: response.data.metaData.count,
          tableState: {
            pageSize,
            pageIndex,
            filters,
            sortBy,
            pageCount: Math.ceil(response.data.metaData.count / +pageSize)
          }
        }))
    } catch (ex) {
      console.log(ex)
      dispatch(createAlert('Unable to load user logs'))
    }
}