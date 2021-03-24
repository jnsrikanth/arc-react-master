export const REQUEST_CONFIRMATION = 'REQUEST_CONFIRMATION'
export const createConfirmAction = ({ message, onConfirmDispatchAction }: {
  message: string | React.ReactNode,
  onConfirmDispatchAction: Function,
  alertOnly?: boolean
}) => {
  return {
      type: REQUEST_CONFIRMATION,
      data: {
        onConfirmDispatchAction,
        message,
      }
  };
};

export const createAlert = (message) => {
  return {
    type: REQUEST_CONFIRMATION,
    data: {
      onConfirmDispatchAction: () => {},
      message,
      isAlert: true
    }
};
}

export const CANCEL_CONFIRMATION = 'CANCEL_CONFIRMATION'
export const cancelConfirmation = () => {
  return {
      type: CANCEL_CONFIRMATION,
  };
};

export const confirmPendingAction = () => {
  return (dispatch, getState) => {
      if (getState().pendingConfirmation) {
          const onConfirmDispatchAction = getState().pendingConfirmation.onConfirmDispatchAction;
          dispatch(onConfirmDispatchAction);
      }
      dispatch(cancelConfirmation());
  };
};