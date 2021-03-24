import { USERS_LOAD_SUCCESS_TYPE, USERS_PAGE_LOAD_SUCCESS_TYPE, USER_ADD_STATUS_TYPE } from "../actions/UsersActions"

const initialState = {
    users: [],
    organizations: [],
    error: undefined,
    userAddStatus: undefined,
    totalCount: 0,
    tableState: {
        pageSize: 10,
        pageIndex: 0,
        pageCount: 0,
        filters: [],
        sortBy: [],
        globalFilter: ''
    }
}
export const UsersReducer = (state = initialState, action ) => {
    switch(action.type) {
        case USERS_LOAD_SUCCESS_TYPE:
            return {
                ...state,
                users: action.data.users,
                organizations: action.data.organizations
            }
        case USERS_PAGE_LOAD_SUCCESS_TYPE:
            return {
                ...state,
                users: action.data.users,
                totalCount: action.data.totalCount,
                tableState: action.data.tableState,
                organizations: action.data.organizations
            }
        case USER_ADD_STATUS_TYPE:
            return {
                ...state,
                userAddStatus: action.data
            }
        default:
            return state
    }
}