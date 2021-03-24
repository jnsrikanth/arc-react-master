import { INITIAL_AUTH_DATA_TYPE, SAVE_AUTH_DATA_TYPE, SET_AUTH_ERROR, SET_PICKE_AVAILABLE, UNAUTHORIZED_TYPE, } from "../actions/AuthActions";



const initialState = {
    isLoading: true,
    authData: undefined,
    token: undefined,
    error: undefined,
    isPickleAvailable: undefined
}

export function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case INITIAL_AUTH_DATA_TYPE: {
            return {
                ...state,
                isLoading: false,
                token: action.data.token,
                authData: action.data.user,
                isPickleAvailable: action.data.user.isPickleAvailable
            }
        }
        case SAVE_AUTH_DATA_TYPE:
            return Object.assign({}, state, {
                isLoading: false,
                token: action.data.token,
                authData: action.data.user,
                isPickleAvailable: action.data.user.isPickleAvailable
            })
        case SET_AUTH_ERROR:
            return Object.assign({}, state, { error: action.data })
        case SET_PICKE_AVAILABLE:
            return Object.assign({}, state, { isPickleAvailable: action.data })
        case UNAUTHORIZED_TYPE:
            return {
                ...state,
                isLoading: false,
                token: undefined,
                authData: undefined
            }
        default:
            return state;
    }
}