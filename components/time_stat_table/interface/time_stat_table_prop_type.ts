

export enum EVENT_MODE {
    "alert",
    "primary",
    "warning",
    "secondary"
}

export interface Events {
    eventName: string
    eventMode: EVENT_MODE
    eventTime: string
    personId?: string,
    videoId?: string
    activityId?: string,
    startTime?: number,
    endTime?: number,
    activityDate?: Date,
    videoStatTime?: Date,
    videoStartTime?: Date
    seekInTime?: number,
    counter?: any,
    videoUrlPath?: string
}

export interface DateEvents {
    date: string,
    events: Array<Events>
}

export interface TimeStatTablePropType {
    dateEventList: Array<DateEvents>
    dispatch: any,
    selectedEvent: Events,
    selectedTrader: any
}