import { CANCEL_CONFIRMATION, REQUEST_CONFIRMATION } from "../actions/PendingConfirmationActions";

export const pendingConfirmationReducer = (state = null, action) => {
  switch (action.type) {
    case REQUEST_CONFIRMATION:
      const {onConfirmDispatchAction, message, isAlert} = action.data;
      return {
        onConfirmDispatchAction,
        message,
        isAlert
      };
    case CANCEL_CONFIRMATION:
      return null
    default:
      return state
  }
}