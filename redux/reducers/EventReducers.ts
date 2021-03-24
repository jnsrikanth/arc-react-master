import { SET_SELECTED_EVENT, SAVE_EVENT_BY_USER_ID } from "../actions/EventActions";


const initialState = {
    selectedEvent: undefined,
    selectedUserEvents: undefined
}

export const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_EVENT:
            return Object.assign({}, state, { selectedEvent: {...action.data} })
        case SAVE_EVENT_BY_USER_ID:
            return Object.assign({}, state, { selectedUserEvents: action.data })
        default:
            return state;
    }
}