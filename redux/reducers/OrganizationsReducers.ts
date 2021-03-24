import { ORGANIZATIONS_PAGE_LOAD_SUCCESS_TYPE, ORGANIZATION_ADD_STATUS_TYPE } from "../actions/OrganizationsActions"

const initialState = {
    organizations: [],
    error: undefined,
    organizationAddStatus: undefined,
    totalCount: 0,
    tableState: {
        pageSize: 10,
        pageIndex: 0,
        pageCount: 0,
        filters: [],
        globalFilter: '',
        sortBy: []
    }
}
export const OrganizationsReducer = (state = initialState, action ) => {
    switch(action.type) {
        case ORGANIZATIONS_PAGE_LOAD_SUCCESS_TYPE:
            return {
                ...state,
                organizations: action.data.organizations,
                totalCount: action.data.totalCount,
                tableState: action.data.tableState,
            }
        case ORGANIZATION_ADD_STATUS_TYPE:
            return {
                ...state,
                organizationAddStatus: action.data
            }
        default:
            return state
    }
}