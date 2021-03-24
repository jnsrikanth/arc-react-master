import React from "react";
import { connect } from "react-redux";
import Avatar, { ConfigProvider } from 'react-avatar';
import { loadSelectedMeeting } from "../../redux/actions/MeetingsActions";
import moment from "moment";
import { ARC_DATE_TIME_FORMAT, AVAILABLE_DEMOS, MEETING_TYPE } from "../../utils/app_const";


const TradersWrapper = (props) => {
    const { meeting, selectedMeeting, dispatch } = props
    const nameDescription = meeting.meetingType === MEETING_TYPE.GROUP && meeting.users.length > 1 ? `with ${meeting.users.filter(user => user.id !== meeting.host.id).map(user => user.name).join(', ')}` : ''
    const { id: demoId, hasImage } = AVAILABLE_DEMOS.find(demo => demo.id === meeting.name) || {}
    return <a
        href="#"
        onClick={() => { dispatch(loadSelectedMeeting(meeting.id)) }}
        className={`list-group-item d-flex align-items-center link-1 pb-2 pt-2 ${selectedMeeting && selectedMeeting.id == meeting.id ? 'active-tr' : ''}`}>
        <div className="pr-1">
            <div className="avatar avatar-md r-rd">
                {
                    demoId && hasImage ? <img src={`/assets/media/image/${demoId}.png`} className="rounded-circle" alt="image" /> : 
                        <ConfigProvider initials={(name, _) => meeting.host.name.slice(0,1)}>
                            <Avatar name={meeting.host.name} size="41" color='#f9a825' round />
                        </ConfigProvider>
                }
            </div>
        </div>
        <div>
            <h6 className="mb-1">{meeting.host.name} <span className="small text-muted">{nameDescription}</span></h6>
            {/*<span className="small text-muted">Login: <span className="text-danger">{loginTime}</span>, Last active: <span className="text-danger">{lastLoginTime}</span></span>*/}
            <span className="small text-muted">{moment(meeting.videoStartTime).format(ARC_DATE_TIME_FORMAT)}</span>
        </div>
        {/*<div className="text-right ml-auto" >
            <span className="small text-muted" style={{ position: 'absolute', top: 2, right: 5 }}></span>
    </div>*/}
    </a>
};


export const Traders = connect(state => ({
    selectedMeeting: state.meetings.selectedMeeting
}))(TradersWrapper)