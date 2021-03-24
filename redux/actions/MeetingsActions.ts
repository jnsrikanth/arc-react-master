import { customParamsSerializer, getAuthorizationHeaders, MEETINGS_API, ACTIVITIES_API } from "../../api/constants";
import Axios from "axios";
import moment from "moment";
import { ACTIVITY_ALERT_COLOR, ACTIVITY_IGNORE_COLOR, ACTIVITY_IMPORTANCE_MAP, ACTIVITY_ISSUE_COLOR, ESCALATION_TYPE, IMPORTANCE_COLOR_MAP, IMPORTANCE_PRIORITY_MAP } from "../../utils/app_const";
import { createAlert } from "./PendingConfirmationActions";

export const MEETINGS_LOAD_SUCCESS_TYPE = "MEETINGS_LOAD_SUCCESS";
export const loadMeetingsSuccess = (data) => {
    return {
        type: MEETINGS_LOAD_SUCCESS_TYPE,
        data
    }
}

export const MEETINGS_LOAD_ERROR_TYPE = "MEETINGS_LOAD_ERROR";
export const loadMeetingsError = (data) => {
    return {
        type: MEETINGS_LOAD_ERROR_TYPE,
        data
    }
}

export const MEETINGS_SET_SELECTED_MEETING_TYPE = 'MEETINGS_SET_SELECTED_MEETING'
export const setSelectedMeeting = (data) => {
    return {
        type: MEETINGS_SET_SELECTED_MEETING_TYPE,
        data
    }
}

export const MEETINGS_SET_SELECTED_ACTIVITY_TYPE = 'MEETINGS_SET_SELECTED_ACTIVITY'
export const setSelectedActivity = (data) => {
    return {
        type: MEETINGS_SET_SELECTED_ACTIVITY_TYPE,
        data
    }
}

export const loadMeetings = (filter) => async (dispatch, getState) => {
    try {
        const {
            startDate,
            endDate,
            organizationId,
            search
        } = filter
        const response = await Axios.request({
            url: MEETINGS_API,
            params: {
                organizationId,
                ...(startDate && endDate ? {
                    startTime: moment(startDate).startOf('day').toISOString(),
                    endTime: moment(endDate).endOf('day').toISOString()
                } : null),
                ...(search ? {
                    search
                } : null)
            },
            paramsSerializer: customParamsSerializer,
            headers: getAuthorizationHeaders(getState())
        })
        dispatch(loadMeetingsSuccess({
            meetings: response.data.data,
            filter
        }))
    } catch (ex) {
        console.error(ex)
        dispatch(createAlert('Unable to load meetings'))
    }
}

export const loadSelectedMeeting = (meetingId: number) => async (dispatch, getState) => {
    try {
        const response = await Axios.request({
            url: `${MEETINGS_API}/${meetingId}`,
            headers: getAuthorizationHeaders(getState())
        })
        const issues = response.data.data.activities.filter(activity => [ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT].includes(activity.lastEscalationType)).map(activity => {
            return {
                ...activity,
                color: ACTIVITY_ISSUE_COLOR
            }
        })
        const alerts = response.data.data.activities.filter(activity => [ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT].includes(activity.lastEscalationType)).map(activity => {
            return {
                ...activity,
                color: ACTIVITY_ALERT_COLOR
            }
        })
        const events = response.data.data.activities.filter(activity => ![ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT,ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT].includes(activity.lastEscalationType)).map(activity => {
            return {
                ...activity,
                color: [ESCALATION_TYPE.COMPLIANCE_ANALYST_IGNORE, ESCALATION_TYPE.COMPLIANCE_MANAGER_IGNORE].includes(activity.lastEscalationType) ? ACTIVITY_IGNORE_COLOR : IMPORTANCE_COLOR_MAP[ACTIVITY_IMPORTANCE_MAP[activity.activityType]],
                priorityLevel: IMPORTANCE_PRIORITY_MAP[ACTIVITY_IMPORTANCE_MAP[activity.activityType]]
            }
        })
        events.sort((a, b) => a.priorityLevel - b.priorityLevel)
        response.data.data.activities = [
            ...issues,
            ...alerts,
            ...events
        ]
        console.log(response.data.data.activities)

        
        dispatch(setSelectedMeeting(response.data.data))
    } catch (ex) {
        console.error(ex)
    }
}

export const postMeetingActivityEscaltion = (activityId, escalationType, comment) => async (dispatch, getState) => {
    try {
        await Axios.request({
            url: `${ACTIVITIES_API}/${activityId}/escalation`,
            method: 'POST',
            data: {
                escalationType,
                comment,
            },
            headers: getAuthorizationHeaders(getState())
        })
        const meeting = getState().meetings.selectedMeeting
        dispatch(loadSelectedMeeting(meeting.id))
    } catch (ex) {
        console.error(ex)
        dispatch(createAlert('Unable to add comment'))
    }
}

export const postMeetingComment = (meetingId, comment) => async (dispatch, getState) => {
    try {
        await Axios.request({
            url: `${MEETINGS_API}/${meetingId}/comments`,
            method: 'POST',
            data: {
                comment,
            },
            headers: getAuthorizationHeaders(getState())
        })
        const meeting = getState().meetings.selectedMeeting
        dispatch(loadSelectedMeeting(meeting.id))
    } catch (ex) {
        console.error(ex)
        dispatch(createAlert('Unable to add comment'))
    }
}