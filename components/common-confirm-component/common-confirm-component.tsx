import React from "react"
import {useSelector, useDispatch} from 'react-redux';
import { Button, Modal } from "react-bootstrap"
import { cancelConfirmation, confirmPendingAction } from "../../redux/actions/PendingConfirmationActions";

export const CommonConfirmComponent = (props) => {
  const dispatch = useDispatch()
  const pendingConfirmation = useSelector(state => state.pendingConfirmation);
  const show = !!pendingConfirmation
  const onCancelConfirmation = () => dispatch(cancelConfirmation())
  const onConfirmPendingAction = () => dispatch(confirmPendingAction());
  console.log(pendingConfirmation)
  return (
    show
    ? <Modal show onHide={() => {
      onCancelConfirmation()
    }} size='lg' className="arc-model" {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-dialog-centered"
      centered>
      <Modal.Body>
        {
          pendingConfirmation.isAlert
          ? pendingConfirmation.message
          : <p>
            {
            pendingConfirmation.message
            }
          </p>
        }
      </Modal.Body>
      <Modal.Footer>
        {
          pendingConfirmation.isAlert
          ? <Button variant="primary" onClick={onCancelConfirmation} className="btn-warning btn-rounded">
            OK
          </Button>
          : <>
            <Button variant="primary" onClick={() => onConfirmPendingAction()} className="btn-warning btn-rounded">
              Yes
            </Button>
            <Button variant="primary" onClick={onCancelConfirmation} className="btn-warning btn-rounded">
              No
            </Button>
          </>
        }
      </Modal.Footer>
    </Modal>
    : null
  )
}