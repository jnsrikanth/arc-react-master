import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setErrorAction } from "../../redux/actions/GlobalActions";

const ErrorComponent = (props: any) => {
    useEffect(() => {
        if (props.error) {
            console.log(props.error)
            // NotificationManager.error(props.error ? props.error.message || props.error || "Something went wrong try again.": "Something went wrong try again.")
            // alert(props.error ? props.error.message || props.error || "Something went wrong try again." : "Something went wrong try again.")
            props.dispatch(setErrorAction(undefined))
        }
    }, [props.error])

    return <>
    </>
}

export default connect((state) => ({
    error: state.global.error
}))(ErrorComponent)