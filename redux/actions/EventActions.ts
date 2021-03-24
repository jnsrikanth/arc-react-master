import { Events, DateEvents, EVENT_MODE } from "../../components/time_stat_table/interface/time_stat_table_prop_type"
import { setLoadingAction, setErrorAction } from "./GlobalActions"
import { doPost } from "../../api/api_template"
import { GET_EVENT_BY_USER_ID, REPORT_EVENT, IGNORE_EVENT, BASE_API } from "../../api/constants"
import moment from "moment";

export const SET_SELECTED_EVENT = "SET_SELECTED_EVENT"
export const setSelectedEvent = (data?: Events) => {
    return {
        type: SET_SELECTED_EVENT,
        data
    }
}

export const SAVE_EVENT_BY_USER_ID = "SAVE_EVENT_BY_USER_ID"
export const saveEventsByUserId = (userId: string, data: Array<DateEvents>) => {
    return {
        type: SAVE_EVENT_BY_USER_ID,
        data,
        userId
    }
}



const getMinuteAndSec = (date: Date, duration) => {
    return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + "," + (duration < 60 ? ('0' + duration).slice(-2) + "s" : ('0' + (duration / 60)).slice(-2) + "m" + ('0' + (duration % 60)).slice(-2) + "s")
}

const getEventMode = (activityTypeId: string, status: string) => {
    switch (status) {
        case "REPORTED":
            return EVENT_MODE.secondary
        case "IGNORED":
            return EVENT_MODE.primary
        default:
            if (activityTypeId == "Mobile")
                return EVENT_MODE.alert
            else
                return EVENT_MODE.warning
    }
}

export const getSimilarEvents = (events: Array<DateEvents>, selectedEvent: Events): Array<Events> => {
    var similarEv: Array<Events> = []
    var eve = events.filter(e => selectedEvent.activityDate + "" == e.date + "")
    if (eve.length == 0)
        return similarEv
    var ev = eve[0].events
    similarEv = ev.filter(e => e.eventName == selectedEvent.eventName || (e.startTime && selectedEvent.startTime && e.endTime && selectedEvent.endTime && e.startTime >= selectedEvent.startTime && e.endTime <= selectedEvent.endTime))
    return similarEv
}

export const getEventDateFromStartTime = (startTime) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(new Date(startTime))
    return `${day}-${month}-${year}`
}

export const getEventDateFromStartTimeRev = (startTime) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(new Date(startTime))
    return moment(`${year}-${month}-${day}`,'YYYY-MMM-DD')
}


export const getEvents = (events: any): Array<DateEvents> => {
    const groupedEvents =  events.reduce((_groupedEvents, dateEvent) => {
        const { videoStartTime } = dateEvent.UserVideo
        const videoEvents = _groupedEvents[videoStartTime] ? _groupedEvents[videoStartTime] : []
        videoEvents.push({
            eventName: dateEvent.activityTypeId,
            eventMode: getEventMode(dateEvent.activityTypeId, dateEvent.status),
            eventTime: getMinuteAndSec(moment(videoStartTime).add(dateEvent.seekInTime, 'seconds').toDate(), dateEvent.activityDuration),
            personId: dateEvent.userId + "",
            videoId: dateEvent.videoId + "",
            activityId: dateEvent.id + "",
            startTime: new Date(dateEvent.startTime),
            endTime: new Date(new Date(dateEvent.startTime).getTime() + dateEvent.activityDuration + 1000),
            activityDate: new Date(dateEvent.activityDate),
            videoStartTime: videoStartTime,
            seekInTime: dateEvent.seekInTime,
            videoUrlPath: BASE_API + 'static/' + dateEvent.videoId + "-proccessed." + dateEvent.UserVideo.videoProccessedPath.split('.').pop()
        })
        _groupedEvents[videoStartTime] = videoEvents
        return _groupedEvents
    }, {})
    return Object.keys(groupedEvents).map(videoStartTime => ({
        date: videoStartTime,
        events: groupedEvents[videoStartTime]
    })).sort((a, b) => moment(b.date).diff(moment(a.date)))
}


export const getEventByUserId = (uniqueId) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true))
        return doPost(GET_EVENT_BY_USER_ID, undefined, { userId: uniqueId })
            .then((data: any) => {
                var events: Array<DateEvents> = getEvents(data.activities)

                dispatch(saveEventsByUserId(uniqueId, events))
            })
            .catch(err => dispatch(setErrorAction(err)))
            .finally(() => dispatch(setLoadingAction(false)))
    }
}


export const reportEvent = (activityId, message, onSuccess) => {
    return function (dispatch, getState) {
        var authState = getState().auth
        const { uniqueId } = authState.authData
        console.log(uniqueId)
        dispatch(setLoadingAction(true))
        return doPost(REPORT_EVENT, undefined, { activityId, message })
            .then((data: any) => {
                dispatch(getEventByUserId(uniqueId))//static as john
                onSuccess()
            })
            .catch(err => dispatch(setErrorAction(err)))
            .finally(() => dispatch(setLoadingAction(false)))
    }
}

export const ignoreEvent = (activityId) => {
    return function (dispatch, getState) {
        var authState = getState().auth
        const { uniqueId } = authState.authData
        console.log(uniqueId)
        dispatch(setLoadingAction(true))
        return doPost(IGNORE_EVENT, undefined, { activityId })
            .then((data: any) => {
                dispatch(getEventByUserId(uniqueId))
            })
            .catch(err => dispatch(setErrorAction(err)))
            .finally(() => dispatch(setLoadingAction(false)))
    }
}