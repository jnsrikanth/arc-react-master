import React from "react";
import { connect } from "react-redux";

import io from 'socket.io-client';
import { ANALYTICS_ROUTE, DASH_BOARD_ROUTE, TRADERS_ROUTE } from "../../utils/route_const";
import Router from 'next/router'
import { Loading as LoaderDots } from 'react-loading-dot'
import { SOCKET_IO_URL } from "../../api/constants";
import { USER_TYPE } from "../../utils/app_const";

const VIDEO_EMIT_SUCCESS_KEY: string = "-VIDEO_EMIT_SUCCESS_KEY"
const VIDEO_EMIT_ERROR_KEY: string = "-VIDEO_EMIT_FAILURE_KEY"
const VIDEO_EMIT_PROGESS_KEY: string = "-VIDEO_EMIT_PROGRESS_KEY"

class VideoProgress extends React.Component<any>{

    state = {
        progressMsg: [""]
    }

    constructor(props) {
        super(props)
        const { authData } = props
        const socket = io(SOCKET_IO_URL);
        if (authData) {
            console.log('listening for', authData.id + VIDEO_EMIT_SUCCESS_KEY)
            socket.on(authData.id + VIDEO_EMIT_SUCCESS_KEY, this.onSuccess)
            socket.on(authData.id + VIDEO_EMIT_ERROR_KEY, this.onError)
            socket.on(authData.id + VIDEO_EMIT_PROGESS_KEY, this.onMessage)
        }
    }

    componentDidMount() {
    }

    onSuccess = () => {
        Router.push([USER_TYPE.SUPER_ADMIN, USER_TYPE.COMPLIANCE_MANAGER].includes(this.props.authData.userType) ? ANALYTICS_ROUTE : TRADERS_ROUTE)
    }

    onError = (err) => {
        alert(err)
    }

    onMessage = (msg: any) => {
        const { progressMsg } = this.state
        progressMsg.push(msg + "")
        this.setState({ progressMsg })
    }

    render() {
        const { progressMsg } = this.state
        console.log(progressMsg)
        return <div className='d-flex flex-column w-100 mt-5 pt-4'>
            <h1 style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                Please wait while the video is processed.
            </h1>
            <div style={{ display: 'flex' }}>
                <LoaderDots background="#ef4a81" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'fixed', bottom: '70px', left: '0', right: '0' }}>
                <p style={{ fontSize: 14 }} className="text-muted mb-1">Don't want to wait?</p>
                <a onClick={() => {
                    Router.push(DASH_BOARD_ROUTE)
                }} className="btn btn-primary btn-rounded">Continue To Dashboard</a>
            </div>
        </div>
    }
}


export default connect(state => ({
    authData: state.auth.authData
}))(VideoProgress)