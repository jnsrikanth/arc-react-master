import { HYDRATE } from 'next-redux-wrapper';
import { SET_LOADING, SET_ERROR, SET_SELECTED_DATE_RANGE, SET_SELECTED_TRADER, SET_TOAST_ERROR } from "../actions/GlobalActions";
import diff from 'diff';
import { getEventDateFromStartTimeRev } from '../actions/EventActions';
import moment from "moment";


const initialState = {
    loading: false,
    error: false,
    page: undefined,
    selectedDates: {
        startDate: moment("2020-01-01", "YYYY-MM-DD").format('YYYY-MMM-DD'),
        endDate: getEventDateFromStartTimeRev(new Date()).format('YYYY-MMM-DD')
    },
    toastError: '',
    selectedTrader: undefined
}

export function GlobalReducer(state = initialState, action) {
    switch (action.type) {
        case HYDRATE:
            const stateDiff = diff(state, action.payload) as any;
            const wasBumpedOnClient = stateDiff?.page?.[0]?.endsWith('X');
            return {
                ...state,
                ...action.payload,
                page: wasBumpedOnClient ? state.page : action.payload.page,
            };
        case SET_LOADING:
            return Object.assign({}, state, { loading: action.data })
        case SET_ERROR:
            return Object.assign({}, state, { error: action.data })
        case SET_SELECTED_DATE_RANGE:
            return Object.assign({}, state, { selectedDates: action.data })
        case SET_SELECTED_TRADER:
            return Object.assign({}, state, { selectedTrader: action.data })
        case SET_TOAST_ERROR:
            return {
                ...state,
                toastError: action.data
            }
        default:
            return state;
    }
}