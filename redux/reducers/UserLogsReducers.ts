import { USER_LOGS_LOAD_SUCCESS_TYPE } from "../actions/UserLogsActions"

const initialState = {
    userLogs: [],
    totalCount: 0,
    tableState: {
        pageSize: 15,
        pageIndex: 0,
        pageCount: 0,
        filters: [],
        sortBy: []
    }
}
export const UserLogsReducer = (state = initialState, action ) => {
    switch(action.type) {
        case USER_LOGS_LOAD_SUCCESS_TYPE:
            return {
                ...state,
                userLogs: action.data.userLogs,
                totalCount: action.data.totalCount,
                tableState: action.data.tableState,
            }
        default:
            return state
    }
}