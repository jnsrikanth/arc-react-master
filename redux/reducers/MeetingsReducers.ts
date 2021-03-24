import { MEETINGS_LOAD_ERROR_TYPE, MEETINGS_LOAD_SUCCESS_TYPE, MEETINGS_SET_SELECTED_ACTIVITY_TYPE, MEETINGS_SET_SELECTED_MEETING_TYPE } from "../actions/MeetingsActions"

const initialState = {
    error: undefined,
    meetings: [],
    filter: {},
    selectedMeeting: undefined,
    selectedActivity: undefined
}
export const MeetingsReducer = (state = initialState, action ) => {
    switch(action.type) {
        case MEETINGS_LOAD_SUCCESS_TYPE:
            return {
                ...state,
                meetings: action.data.meetings,
                filter: action.data.filter
            }
        case MEETINGS_LOAD_ERROR_TYPE:
            return {
                ...state,
                error: action.data
            }
        case MEETINGS_SET_SELECTED_MEETING_TYPE:
            return {
                ...state,
                selectedMeeting: action.data
            }
        case MEETINGS_SET_SELECTED_ACTIVITY_TYPE:
            return {
                ...state,
                selectedActivity: action.data
            }
        default:
            return state
    }
}