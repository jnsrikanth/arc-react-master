import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { setSelectedActivity } from '../../redux/actions/MeetingsActions';
import { ESCALATION_TYPE, getMeetingSourceIconUrl, MEETING_TYPE, USER_TYPE } from '../../utils/app_const';

export const RenderActivityBadge = (props) => {
    const { onSelectEvent, meeting, activity, isSelected } = props
    const activityTimeString =  moment(meeting.videoStartTime)
        .add(activity.seekinTime, 'seconds').format('HH:mm:ss')
    // const activityDurationString = moment.utc(activity.activityDuration * 1000).format('mm[m]:ss[s]')
    return <span style={{ color: 'white', backgroundColor: activity.color }} onClick={onSelectEvent} className={`btn btn-rounded ${isSelected ? 'selected' : ""}`}>{activity.activityType}: {activityTimeString}
    {
        [ESCALATION_TYPE.COMPLIANCE_ANALYST_IGNORE, ESCALATION_TYPE.COMPLIANCE_MANAGER_IGNORE].includes(activity.lastEscalationType)
        ? <span className="tick-tr"><i className="demo-icon icon-done_24px"></i></span>
        : null
    }</span>
}

export const RenderEscalationComment = (props) => {
    const { escalation } = props
    let escationTypeText = 'Report'
    switch(escalation.escalationType) {
        case ESCALATION_TYPE.COMPLIANCE_ANALYST_IGNORE:
        case ESCALATION_TYPE.COMPLIANCE_MANAGER_IGNORE:
            escationTypeText = 'Ignore'
            break
        case ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT:
            escationTypeText = 'Report'
            break
        case ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT:
            escationTypeText = 'Issue'
            break
    }
    return <div className='ml-5'>
        {escationTypeText}: {escalation.comment}
    </div>
}

const TimeStatTableWrapper = (props) => {
    const { dispatch, selectedMeeting, selectedActivity, alertsOnly, authData } = props
    console.log('alertsOnly', alertsOnly)
    const participantsString = selectedMeeting.meetingType === MEETING_TYPE.GROUP && selectedMeeting.users.length > 1 ? `${selectedMeeting.users.filter(user => user.id !== selectedMeeting.host.id).map(user => user.name).join(', ')}` : 'None'

    const showingActivities = selectedMeeting.activities
    .filter(activity => !alertsOnly || authData.userType === USER_TYPE.COMPLIANCE_ANALYST || [ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT, ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT].includes(activity.lastEscalationType))


    return <div className="bg-dark-tbl" id="style-3">
        <div className="row br-1">
            <div></div>
            <div className="col-3 pr-0 text-center br-2">
                <div className="d-flex">
                    <div className="pr-2 pl-1">
                        <div className="avatar avatar-md" style={{borderRadius:'0px', border:'0px solid #000'}}>
                            <img src={getMeetingSourceIconUrl(selectedMeeting.meetingSource)} className="" alt="image" />
                        </div>
                    </div>
                    <div style={{ marginTop: '-5px' }} className="text-left ">
                        <span className="small text-muted">Attendees</span>
                        
                        <h6 className="mb-1 text-left">{participantsString}</h6>
                       {/*<div className="m-0 small text-muted text-left">{selectedTrader.region} {selectedTrader.fxCode}</div>*/}
                    </div>
                </div>
                {/*<span className="date text-muted">{dtEvent.date}</span> <span></span>*/}
            </div>
            <div></div>
            <div className="col-9">
                {
                    showingActivities.map(activity => <RenderActivityBadge key={activity.id} meeting={selectedMeeting} activity={activity} isSelected={selectedActivity && selectedActivity.id === activity.id || false} onSelectEvent={() => {
                            dispatch(setSelectedActivity({
                              ...activity
                            }))
                        }} />)
                }
            </div>
        </div>
        {
            selectedActivity && selectedActivity.activityEscalations.length ? selectedActivity.activityEscalations.filter(escalation => [ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT, ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT].includes(escalation.escalationType) && !!escalation.comment).map(escalation => <RenderEscalationComment escalation={escalation} />) : null
        }
        {
          !selectedActivity && selectedMeeting.meetingComments.map(meetingComment => (
            <div className='ml-5'>
                General Comment: {meetingComment.comment}
            </div>
          ))
        }
    </div>

};

export const TimeStatTable = connect(state => ({
    authData: state.auth.authData,
    selectedMeeting: state.meetings.selectedMeeting,
    selectedActivity: state.meetings.selectedActivity
}))(TimeStatTableWrapper)